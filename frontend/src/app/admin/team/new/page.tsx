"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import TeamForm, { emptyTeamValues } from "@/components/admin/TeamForm";

export default function NewTeamMemberPage() {
  return (
    <RequireAdminAuth>
      <AdminShell fullWidth>
        <h2 className="text-2xl font-semibold text-ink">New Team Member</h2>
        <div className="mt-8">
          <TeamForm mode="create" initialValues={emptyTeamValues} />
        </div>
      </AdminShell>
    </RequireAdminAuth>
  );
}
