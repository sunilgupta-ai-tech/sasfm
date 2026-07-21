"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/admin-auth";

export default function RequireAdminAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/admin/login");
    }
  }, [loading, token, router]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate">
        Loading…
      </div>
    );
  }

  if (!token) return null;

  return <>{children}</>;
}
