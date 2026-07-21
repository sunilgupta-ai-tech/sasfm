"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import ServiceListContent from "@/components/admin/ServiceListContent";

export default function SoftServicesAdminPage() {
  return (
    <RequireAdminAuth>
      <ServiceListContent type="SOFT" label="Soft Services" />
    </RequireAdminAuth>
  );
}
