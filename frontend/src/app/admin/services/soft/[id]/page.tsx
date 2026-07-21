"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import EditServiceContent from "@/components/admin/EditServiceContent";

export default function EditSoftServicePage() {
  return (
    <RequireAdminAuth>
      <EditServiceContent type="SOFT" label="Soft Service" />
    </RequireAdminAuth>
  );
}
