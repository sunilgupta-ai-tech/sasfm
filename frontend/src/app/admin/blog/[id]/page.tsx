"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import BlogForm, { type BlogFormValues } from "@/components/admin/BlogForm";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";

function EditBlogContent() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAdminAuth();
  const [values, setValues] = useState<BlogFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api
      .get<{ post: BlogFormValues & { date: string } }>(
        `/api/admin/blog/${id}`,
        token
      )
      .then((res) =>
        setValues({
          ...res.post,
          date: res.post.date.slice(0, 10),
          metaTitle: res.post.metaTitle ?? "",
          metaDescription: res.post.metaDescription ?? "",
          ogImageUrl: res.post.ogImageUrl ?? "",
          canonicalPath: res.post.canonicalPath ?? "",
          focusKeyword: res.post.focusKeyword ?? "",
        })
      )
      .catch((err) => setError(err.message));
  }, [id, token]);

  return (
    <AdminShell fullWidth>
      <h1 className="text-2xl font-semibold text-ink">Edit Post</h1>
      <div className="mt-8">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!values && !error && <p className="text-sm text-slate">Loading…</p>}
        {values && <BlogForm mode="edit" postId={id} initialValues={values} />}
      </div>
    </AdminShell>
  );
}

export default function EditBlogPostPage() {
  return (
    <RequireAdminAuth>
      <EditBlogContent />
    </RequireAdminAuth>
  );
}
