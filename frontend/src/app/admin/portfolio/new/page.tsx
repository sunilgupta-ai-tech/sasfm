"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import PortfolioForm, {
  emptyPortfolioValues,
} from "@/components/admin/PortfolioForm";

export default function NewPortfolioProjectPage() {
  return (
    <RequireAdminAuth>
      <AdminShell fullWidth>
        <h1 className="text-2xl font-semibold text-ink">New Project</h1>
        <div className="mt-8">
          <PortfolioForm mode="create" initialValues={emptyPortfolioValues} />
        </div>
      </AdminShell>
    </RequireAdminAuth>
  );
}
