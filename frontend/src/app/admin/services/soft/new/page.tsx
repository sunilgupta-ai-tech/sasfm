"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import ServiceForm, { emptyServiceValues } from "@/components/admin/ServiceForm";

export default function NewSoftServicePage() {
  return (
    <RequireAdminAuth>
      <AdminShell fullWidth>
        <h2 className="text-2xl font-semibold text-ink">New Soft Service</h2>
        <div className="mt-8">
          <ServiceForm mode="create" type="SOFT" initialValues={emptyServiceValues} />
        </div>
      </AdminShell>
    </RequireAdminAuth>
  );
}
