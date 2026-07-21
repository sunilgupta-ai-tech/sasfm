"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import TeamListContent from "@/components/admin/TeamListContent";

export default function TeamAdminPage() {
  return (
    <RequireAdminAuth>
      <TeamListContent />
    </RequireAdminAuth>
  );
}
