"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Trash2,
  Search,
  Mail,
  Download,
  RotateCcw,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import Badge from "@/components/admin/ui/Badge";
import { Button } from "@/components/admin/ui/Button";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt: string;
};

type SortKey = "name" | "email" | "subject" | "status" | "createdAt";

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

function EnquiriesContent() {
  const { token } = useAdminAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function fetchEnquiries() {
    if (!token) return;
    api
      .get<{ enquiries: Enquiry[] }>("/api/admin/enquiries", token)
      .then((res) => setEnquiries(res.enquiries))
      .catch((err) => setError(err.message));
  }

  useEffect(fetchEnquiries, [token]);

  function handleReload() {
    setEnquiries(null);
    setError(null);
    fetchEnquiries();
  }

  const filtered = useMemo(() => {
    if (!enquiries) return null;
    const q = query.trim().toLowerCase();
    if (!q) return enquiries;
    return enquiries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q)
    );
  }, [enquiries, query]);

  const sorted = useMemo(() => {
    if (!filtered) return null;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "status":
          return a.status.localeCompare(b.status) * dir;
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
    setSortKey("createdAt");
    setSortDir("desc");
  }

  function handleExport() {
    if (!sorted || sorted.length === 0) return;
    const header = ["No", "Name", "Email", "Phone", "Subject", "Message", "Status", "Received"];
    const rows = sorted.map((e, i) => [
      String(i + 1),
      e.name,
      e.email,
      e.phone ?? "",
      e.subject,
      e.message,
      e.status,
      formatDate(e.createdAt),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map(csvEscape).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete(id: string) {
    if (!token) return;
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/admin/enquiries/${id}`, token);
      setEnquiries((prev) => prev?.filter((e) => e.id !== id) ?? null);
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
          <h1 className="text-2xl font-semibold text-ink">All Enquiries</h1>
          {enquiries && (
            <p className="mt-1 text-sm text-slate">
              {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} total
            </p>
          )}
        </div>
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

        {enquiries === null && <p className="p-8 text-sm text-slate text-center">Loading…</p>}

        {enquiries?.length === 0 && (
          <div className="p-12 text-center">
            <Mail className="h-8 w-8 text-slate/30 mx-auto" strokeWidth={1.5} />
            <p className="mt-3 text-sm text-slate">No enquiries yet.</p>
          </div>
        )}

        {paged?.length === 0 && enquiries && enquiries.length > 0 && (
          <p className="p-8 text-sm text-slate text-center">
            No enquiries match &ldquo;{query}&rdquo;.
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
                      label="Name"
                      sortKeyValue="name"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Email"
                      sortKeyValue="email"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Subject"
                      sortKeyValue="subject"
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
                      label="Received"
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
                {paged.map((enquiry, i) => (
                  <tr key={enquiry.id} className="hover:bg-paper-dim/50 transition-colors">
                    <td className="px-5 py-4 text-slate">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <p className="font-medium text-ink truncate">{enquiry.name}</p>
                        {enquiry.phone && (
                          <p className="text-xs text-slate mt-0.5 truncate">{enquiry.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate">{enquiry.email}</td>
                    <td className="px-5 py-4 text-slate">{enquiry.subject}</td>
                    <td className="px-5 py-4">
                      <Badge variant={enquiry.status === "NEW" ? "new" : "read"}>
                        {enquiry.status === "NEW" ? "New" : "Read"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-slate whitespace-nowrap">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(enquiry.id)}
                          disabled={deletingId === enquiry.id}
                          className="p-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          aria-label={`Delete enquiry from ${enquiry.name}`}
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

export default function EnquiriesAdminPage() {
  return (
    <RequireAdminAuth>
      <EnquiriesContent />
    </RequireAdminAuth>
  );
}
