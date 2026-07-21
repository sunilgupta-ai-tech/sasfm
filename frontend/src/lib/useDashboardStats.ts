"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";

export type DashboardStats = {
  portfolioCount: number;
  blogCount: number;
  softServiceCount: number;
  hardServiceCount: number;
  newEnquiries: number;
  totalEnquiries: number;
};

export function useDashboardStats() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    api
      .get<DashboardStats>("/api/admin/dashboard/stats", token)
      .then((res) => {
        if (!cancelled) setStats(res);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return { stats, loading };
}
