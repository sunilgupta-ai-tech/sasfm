"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import EditTeamContent from "@/components/admin/EditTeamContent";

export default function EditTeamMemberPage() {
  return (
    <RequireAdminAuth>
      <EditTeamContent />
    </RequireAdminAuth>
  );
}
