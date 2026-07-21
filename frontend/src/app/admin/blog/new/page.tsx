"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import BlogForm, { emptyBlogValues } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <RequireAdminAuth>
      <AdminShell fullWidth>
        <h1 className="text-2xl font-semibold text-ink">New Post</h1>
        <div className="mt-8">
          <BlogForm mode="create" initialValues={emptyBlogValues} />
        </div>
      </AdminShell>
    </RequireAdminAuth>
  );
}
