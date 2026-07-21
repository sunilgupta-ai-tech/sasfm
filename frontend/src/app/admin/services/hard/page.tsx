"use client";

import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import ServiceListContent from "@/components/admin/ServiceListContent";

export default function HardServicesAdminPage() {
  return (
    <RequireAdminAuth>
      <ServiceListContent type="HARD" label="Hard Services" />
    </RequireAdminAuth>
  );
}
