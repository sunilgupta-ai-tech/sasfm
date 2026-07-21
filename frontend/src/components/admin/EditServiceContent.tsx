"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ServiceForm, { type ServiceFormValues } from "@/components/admin/ServiceForm";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";

export default function EditServiceContent({
  type,
  label,
}: {
  type: "SOFT" | "HARD";
  label: string;
}) {
  const { id } = useParams<{ id: string }>();
  const { token } = useAdminAuth();
  const [values, setValues] = useState<ServiceFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api
      .get<{ service: ServiceFormValues }>(`/api/admin/services/${id}`, token)
      .then((res) => setValues(res.service))
      .catch((err) => setError(err.message));
  }, [id, token]);

  return (
    <AdminShell fullWidth>
      <h2 className="text-2xl font-semibold text-ink">Edit {label}</h2>
      <div className="mt-8">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!values && !error && <p className="text-sm text-slate">Loading…</p>}
        {values && (
          <ServiceForm mode="edit" type={type} serviceId={id} initialValues={values} />
        )}
      </div>
    </AdminShell>
  );
}
