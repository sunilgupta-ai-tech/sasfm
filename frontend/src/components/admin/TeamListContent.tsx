"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Users,
  Download,
  RotateCcw,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Badge from "@/components/admin/ui/Badge";
import { Button } from "@/components/admin/ui/Button";
import { useAdminAuth } from "@/lib/admin-auth";
import { api, apiImageUrl } from "@/lib/api";
import { revalidatePublicPaths } from "@/lib/actions/revalidate";

type TeamMember = {
  id: string;
  name: string;
  title: string;
  region: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
};

type SortKey = "name" | "region" | "sortOrder" | "status" | "createdAt";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function SortHeader({
  label,
  sortKeyValue,
  activeKey,
  activeDir,
  onSort,
}: {
  label: string;
  sortKeyValue: SortKey;
  activeKey: SortKey;
  activeDir: "asc" | "desc";
  onSort: (key: SortKey) => void;
}) {
  const active = activeKey === sortKeyValue;
  return (
    <button
      type="button"
      onClick={() => onSort(sortKeyValue)}
      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate hover:text-ink transition-colors"
    >
      {label}
      {active ? (
        activeDir === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" strokeWidth={2} />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 text-slate/40" strokeWidth={1.5} />
      )}
    </button>
  );
}

export default function TeamListContent() {
  const { token } = useAdminAuth();
  const [members, setMembers] = useState<TeamMember[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("sortOrder");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function fetchMembers() {
    if (!token) return;
    api
      .get<{ members: TeamMember[] }>("/api/admin/team", token)
      .then((res) => setMembers(res.members))
      .catch((err) => setError(err.message));
  }

  useEffect(fetchMembers, [token]);

  function handleReload() {
    setMembers(null);
    setError(null);
    fetchMembers();
  }

  const filtered = useMemo(() => {
    if (!members) return null;
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q)
    );
  }, [members, query]);

  const sorted = useMemo(() => {
    if (!filtered) return null;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "status":
          return (Number(a.published) - Number(b.published)) * dir;
        case "sortOrder":
          return (a.sortOrder - b.sortOrder) * dir;
        case "createdAt":
          return (
            (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir
          );
        default:
          return a[sortKey].localeCompare(b[sortKey]) * dir;
      }
    });
  }, [filtered, sortKey, sortDir]);

  const total = sorted?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    if (!sorted) return null;
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  function handleReset() {
    setQuery("");
    setPageSize(10);
    setPage(1);
    setSortKey("sortOrder");
    setSortDir("asc");
  }

  function handleExport() {
    if (!sorted || sorted.length === 0) return;
    const header = ["No", "Name", "Title", "Region", "Order", "Status", "Created Date"];
    const rows = sorted.map((m, i) => [
      String(i + 1),
      m.name,
      m.title,
      m.region,
      String(m.sortOrder),
      m.published ? "Published" : "Draft",
      formatDate(m.createdAt),
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "team-members.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete(id: string) {
    if (!token) return;
    if (!confirm("Delete this team member? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/admin/team/${id}`, token);
      setMembers((prev) => prev?.filter((m) => m.id !== id) ?? null);
      await revalidatePublicPaths(["/", "/about/our-expert-team"]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminShell fullWidth>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Our Expert Team</h1>
          {members && (
            <p className="mt-1 text-sm text-slate">
              {members.length} member{members.length === 1 ? "" : "s"} total
            </p>
          )}
        </div>
        <Link href="/admin/team/new">
          <Button>
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add New
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-lg border border-line bg-paper shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap px-5 py-4 border-b border-line">
          <label className="flex items-center gap-2 text-sm text-slate shrink-0">
            Show
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-md border border-line bg-paper px-2.5 py-1.5 text-sm text-ink outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            entries
          </label>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="secondary" size="sm" type="button" onClick={handleExport}>
              <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
              Export
            </Button>
            <Button variant="secondary" size="sm" type="button" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Reset
            </Button>
            <Button variant="secondary" size="sm" type="button" onClick={handleReload}>
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Reload
            </Button>
          </div>

          <div className="relative w-full sm:w-64 shrink-0 ml-auto">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/50"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search…"
              className="w-full rounded-md border border-line bg-paper pl-10 pr-3.5 py-2 text-sm text-ink placeholder:text-slate/50 outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </div>
        </div>

        {members === null && <p className="p-8 text-sm text-slate text-center">Loading…</p>}

        {members?.length === 0 && (
          <div className="p-12 text-center">
            <Users className="h-8 w-8 text-slate/30 mx-auto" strokeWidth={1.5} />
            <p className="mt-3 text-sm text-slate">No team members yet.</p>
            <Link href="/admin/team/new" className="inline-block mt-4">
              <Button size="sm">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                Add your first one
              </Button>
            </Link>
          </div>
        )}

        {paged?.length === 0 && members && members.length > 0 && (
          <p className="p-8 text-sm text-slate text-center">
            No members match &ldquo;{query}&rdquo;.
          </p>
        )}

        {paged && paged.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-paper-dim/40">
                  <th className="px-5 py-3 text-left w-12 text-xs font-semibold uppercase tracking-wide text-slate">
                    No
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Member"
                      sortKeyValue="name"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Region"
                      sortKeyValue="region"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Order"
                      sortKeyValue="sortOrder"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Status"
                      sortKeyValue="status"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Created Date"
                      sortKeyValue="createdAt"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {paged.map((member, i) => (
                  <tr key={member.id} className="hover:bg-paper-dim/50 transition-colors">
                    <td className="px-5 py-4 text-slate">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 min-w-[220px] max-w-md">
                        <div className="relative h-9 w-9 shrink-0 rounded-full bg-paper-dim border border-line overflow-hidden">
                          {member.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={apiImageUrl(member.imageUrl)}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate/40 text-[10px] font-semibold">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/team/${member.id}`}
                            className="font-medium text-ink hover:text-teal transition-colors block truncate"
                          >
                            {member.name}
                          </Link>
                          <p className="text-xs text-slate mt-0.5 truncate">{member.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate">{member.region}</td>
                    <td className="px-5 py-4 text-slate">{member.sortOrder}</td>
                    <td className="px-5 py-4">
                      <Badge variant={member.published ? "published" : "draft"}>
                        {member.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-slate whitespace-nowrap">
                      {formatDate(member.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/team/${member.id}`}
                          className="p-2 rounded-md border border-steel/30 text-steel hover:bg-steel/10 transition-colors"
                          aria-label={`Edit ${member.name}`}
                        >
                          <Pencil className="h-4 w-4" strokeWidth={1.5} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(member.id)}
                          disabled={deletingId === member.id}
                          className="p-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          aria-label={`Delete ${member.name}`}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {total > 0 && (
          <div className="flex items-center justify-between gap-4 flex-wrap px-5 py-4 border-t border-line">
            <p className="text-sm text-slate">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, total)} of {total} entries
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-slate hover:bg-paper-dim disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`h-8 w-8 rounded-md text-sm transition-colors ${
                    n === currentPage
                      ? "bg-ink text-paper font-semibold"
                      : "text-slate hover:bg-paper-dim"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-slate hover:bg-paper-dim disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
