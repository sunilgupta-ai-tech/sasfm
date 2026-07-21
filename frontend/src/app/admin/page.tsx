"use client";

import Link from "next/link";
import { Building2, Newspaper, Wrench, HardHat, Inbox } from "lucide-react";
import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminAuth } from "@/lib/admin-auth";
import { useDashboardStats } from "@/lib/useDashboardStats";

const CARDS = [
  {
    key: "portfolioCount" as const,
    label: "Portfolio Projects",
    href: "/admin/portfolio",
    icon: Building2,
  },
  {
    key: "blogCount" as const,
    label: "Blog Posts",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    key: "softServiceCount" as const,
    label: "Soft Services",
    href: "/admin/services/soft",
    icon: Wrench,
  },
  {
    key: "hardServiceCount" as const,
    label: "Hard Services",
    href: "/admin/services/hard",
    icon: HardHat,
  },
  {
    key: "newEnquiries" as const,
    label: "New Enquiries",
    href: "/admin/enquiries",
    icon: Inbox,
    highlight: true,
  },
];

function DashboardContent() {
  const { user } = useAdminAuth();
  const { stats, loading } = useDashboardStats();

  return (
    <AdminShell>
      <h2 className="text-2xl font-semibold text-ink">
        Welcome{user ? `, ${user.name}` : ""}
      </h2>
      <p className="mt-2 text-slate">
        Manage the content that powers the SASFM website.
      </p>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-4">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const value = stats?.[card.key];
          return (
            <Link
              key={card.key}
              href={card.href}
              className={`group border p-5 transition-colors duration-300 ${
                card.highlight && value
                  ? "border-amber bg-amber/10 hover:bg-amber/20"
                  : "border-line bg-paper hover:bg-paper-dim"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${card.highlight && value ? "text-amber-dark" : "text-teal"}`}
                strokeWidth={1.5}
              />
              <p className="mt-4 text-3xl font-display font-semibold text-ink">
                {loading ? "—" : value ?? 0}
              </p>
              <p className="mt-1 text-xs text-slate">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <h3 className="mt-12 text-sm font-mono-label uppercase text-slate mb-4">
        Quick Actions
      </h3>
      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/admin/portfolio/new"
          className="group border border-line bg-paper p-6 hover:bg-ink transition-colors duration-300"
        >
          <Building2
            className="h-6 w-6 text-teal group-hover:text-amber transition-colors"
            strokeWidth={1.5}
          />
          <h4 className="mt-4 font-semibold text-ink group-hover:text-paper transition-colors duration-300">
            Add a Portfolio Project
          </h4>
          <p className="mt-1.5 text-sm text-slate group-hover:text-paper/70 transition-colors duration-300">
            Publish a new project to the live site.
          </p>
        </Link>

        <Link
          href="/admin/blog/new"
          className="group border border-line bg-paper p-6 hover:bg-ink transition-colors duration-300"
        >
          <Newspaper
            className="h-6 w-6 text-teal group-hover:text-amber transition-colors"
            strokeWidth={1.5}
          />
          <h4 className="mt-4 font-semibold text-ink group-hover:text-paper transition-colors duration-300">
            Write a Blog Post
          </h4>
          <p className="mt-1.5 text-sm text-slate group-hover:text-paper/70 transition-colors duration-300">
            Publish new insights and articles.
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}

export default function AdminDashboardPage() {
  return (
    <RequireAdminAuth>
      <DashboardContent />
    </RequireAdminAuth>
  );
}
