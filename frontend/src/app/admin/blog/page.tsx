"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  ImageIcon,
  Newspaper,
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
import { api, apiImageUrl } from "@/lib/api";
import { revalidatePublicPaths } from "@/lib/actions/revalidate";

type Post = {
  id: string;
  title: string;
  slug: string;
  tag: string;
  readTime: string;
  date: string;
  imageUrl: string;
  published: boolean;
};

type SortKey = "title" | "readTime" | "status" | "date";

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

function BlogListContent() {
  const { token } = useAdminAuth();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function fetchPosts() {
    if (!token) return;
    api
      .get<{ posts: Post[] }>("/api/admin/blog", token)
      .then((res) => setPosts(res.posts))
      .catch((err) => setError(err.message));
  }

  useEffect(fetchPosts, [token]);

  function handleReload() {
    setPosts(null);
    setError(null);
    fetchPosts();
  }

  const filtered = useMemo(() => {
    if (!posts) return null;
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const sorted = useMemo(() => {
    if (!filtered) return null;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "status":
          return (Number(a.published) - Number(b.published)) * dir;
        case "date":
          return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
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
    setSortKey("date");
    setSortDir("desc");
  }

  function handleExport() {
    if (!sorted || sorted.length === 0) return;
    const header = ["No", "Title", "Slug", "Tag", "Read Time", "Status", "Published Date"];
    const rows = sorted.map((p, i) => [
      String(i + 1),
      p.title,
      p.slug,
      p.tag,
      p.readTime,
      p.published ? "Published" : "Draft",
      formatDate(p.date),
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-posts.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete(id: string) {
    if (!token) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const slug = posts?.find((p) => p.id === id)?.slug;
      await api.delete(`/api/admin/blog/${id}`, token);
      setPosts((prev) => prev?.filter((p) => p.id !== id) ?? null);
      await revalidatePublicPaths(["/", "/blog", ...(slug ? [`/blog/${slug}`] : [])]);
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
          <h1 className="text-2xl font-semibold text-ink">All Blog Posts</h1>
          {posts && (
            <p className="mt-1 text-sm text-slate">
              {posts.length} post{posts.length === 1 ? "" : "s"} total
            </p>
          )}
        </div>
        <Link href="/admin/blog/new">
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

        {posts === null && <p className="p-8 text-sm text-slate text-center">Loading…</p>}

        {posts?.length === 0 && (
          <div className="p-12 text-center">
            <Newspaper className="h-8 w-8 text-slate/30 mx-auto" strokeWidth={1.5} />
            <p className="mt-3 text-sm text-slate">No posts yet.</p>
            <Link href="/admin/blog/new" className="inline-block mt-4">
              <Button size="sm">
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                Publish your first post
              </Button>
            </Link>
          </div>
        )}

        {paged?.length === 0 && posts && posts.length > 0 && (
          <p className="p-8 text-sm text-slate text-center">
            No posts match &ldquo;{query}&rdquo;.
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
                      label="Post"
                      sortKeyValue="title"
                      activeKey={sortKey}
                      activeDir={sortDir}
                      onSort={toggleSort}
                    />
                  </th>
                  <th className="px-5 py-3 text-left">
                    <SortHeader
                      label="Read Time"
                      sortKeyValue="readTime"
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
                      label="Published Date"
                      sortKeyValue="date"
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
                {paged.map((post, i) => (
                  <tr key={post.id} className="hover:bg-paper-dim/50 transition-colors">
                    <td className="px-5 py-4 text-slate">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <div className="relative h-11 w-16 shrink-0 rounded-md bg-paper-dim border border-line overflow-hidden">
                          {post.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={apiImageUrl(post.imageUrl)}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate/30">
                              <ImageIcon className="h-4 w-4" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/blog/${post.id}`}
                            className="font-medium text-ink hover:text-teal transition-colors truncate block"
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-slate mt-0.5 truncate">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate whitespace-nowrap">{post.readTime}</td>
                    <td className="px-5 py-4">
                      <Badge variant={post.published ? "published" : "draft"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-slate whitespace-nowrap">
                      {formatDate(post.date)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md border border-teal/30 text-teal hover:bg-teal/10 transition-colors"
                          aria-label={`View ${post.title}`}
                        >
                          <Eye className="h-4 w-4" strokeWidth={1.5} />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="p-2 rounded-md border border-steel/30 text-steel hover:bg-steel/10 transition-colors"
                          aria-label={`Edit ${post.title}`}
                        >
                          <Pencil className="h-4 w-4" strokeWidth={1.5} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="p-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          aria-label={`Delete ${post.title}`}
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

export default function BlogAdminPage() {
  return (
    <RequireAdminAuth>
      <BlogListContent />
    </RequireAdminAuth>
  );
}
