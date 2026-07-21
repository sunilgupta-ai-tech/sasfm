"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import EditServiceContent from "@/components/admin/EditServiceContent";

export default function EditHardServicePage() {
  return (
    <RequireAdminAuth>
      <EditServiceContent type="HARD" label="Hard Service" />
    </RequireAdminAuth>
  );
}
