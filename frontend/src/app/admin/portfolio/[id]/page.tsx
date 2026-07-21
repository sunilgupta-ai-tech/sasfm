"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import PortfolioForm, {
  type PortfolioFormValues,
} from "@/components/admin/PortfolioForm";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";

function EditPortfolioContent() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAdminAuth();
  const [values, setValues] = useState<PortfolioFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api
      .get<{ project: PortfolioFormValues }>(`/api/admin/portfolio/${id}`, token)
      .then((res) =>
        setValues({
          ...res.project,
          metaTitle: res.project.metaTitle ?? "",
          metaDescription: res.project.metaDescription ?? "",
          ogImageUrl: res.project.ogImageUrl ?? "",
          canonicalPath: res.project.canonicalPath ?? "",
          focusKeyword: res.project.focusKeyword ?? "",
        })
      )
      .catch((err) => setError(err.message));
  }, [id, token]);

  return (
    <AdminShell fullWidth>
      <h1 className="text-2xl font-semibold text-ink">Edit Project</h1>
      <div className="mt-8">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!values && !error && <p className="text-sm text-slate">Loading…</p>}
        {values && (
          <PortfolioForm mode="edit" projectId={id} initialValues={values} />
        )}
      </div>
    </AdminShell>
  );
}

export default function EditPortfolioProjectPage() {
  return (
    <RequireAdminAuth>
      <EditPortfolioContent />
    </RequireAdminAuth>
  );
}
