"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Newspaper,
  Wrench,
  HardHat,
  Inbox,
  Users,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { useDashboardStats } from "@/lib/useDashboardStats";
import { apiImageUrl } from "@/lib/api";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Portfolio", href: "/admin/portfolio", icon: Building2 },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Soft Services", href: "/admin/services/soft", icon: Wrench },
  { label: "Hard Services", href: "/admin/services/hard", icon: HardHat },
  { label: "Our Expert Team", href: "/admin/team", icon: Users },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { stats } = useDashboardStats();

  return (
    <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        const badge = item.href === "/admin/enquiries" ? stats?.newEnquiries : undefined;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
              active
                ? "bg-paper/10 text-paper font-medium"
                : "text-paper/70 hover:bg-paper/5 hover:text-paper"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
            </span>
            {!!badge && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-amber text-ink text-[11px] font-semibold">
                {badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAdminAuth();

  return (
    <>
      <div className="px-6 py-6 border-b border-paper/10">
        <span className="font-display font-semibold text-lg text-paper">
          SASFM<span className="text-amber"> Admin</span>
        </span>
      </div>
      <SidebarNav onNavigate={onNavigate} />
      <div className="px-4 py-5 border-t border-paper/10">
        <Link
          href="/admin/profile"
          onClick={onNavigate}
          className="flex items-center gap-3 px-2 py-2 rounded hover:bg-paper/5 transition-colors"
        >
          <div className="h-9 w-9 shrink-0 rounded-full bg-paper/10 overflow-hidden flex items-center justify-center">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={apiImageUrl(user.avatarUrl)}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-paper/80 text-xs font-semibold">
                {user ? initials(user.name) : ""}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-paper truncate">{user?.name}</p>
            <p className="text-xs text-paper/50 truncate">{user?.email}</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="mt-3 flex items-center gap-2 text-sm text-paper/70 hover:text-amber transition-colors px-2"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Log out
        </button>
      </div>
    </>
  );
}

function pageTitleFromPath(pathname: string) {
  const item = NAV.find((n) => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)));
  if (item) return item.label;
  if (pathname.startsWith("/admin/profile")) return "Profile";
  return "Admin";
}

export default function AdminShell({
  children,
  fullWidth = false,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  return (
    <div className="min-h-screen flex bg-paper-dim">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-ink flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-ink/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="relative w-72 max-w-[80vw] bg-ink flex flex-col">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-4 text-paper/70 hover:text-paper"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-paper border-b border-line px-4 sm:px-8 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-ink"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <h1 className="text-lg font-semibold text-ink truncate">
              {pageTitleFromPath(pathname)}
            </h1>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2 text-sm text-ink"
            >
              <div className="h-8 w-8 rounded-full bg-paper-dim border border-line overflow-hidden flex items-center justify-center">
                {user?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={apiImageUrl(user.avatarUrl)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-5 w-5 text-slate" strokeWidth={1.5} />
                )}
              </div>
              <span className="hidden sm:inline">{user?.name}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                strokeWidth={1.5}
              />
            </button>

            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setUserMenuOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 top-full mt-2 w-44 bg-paper border border-line shadow-[0_16px_32px_-16px_rgba(16,25,46,0.3)] z-20 py-1">
                  <Link
                    href="/admin/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-paper-dim transition-colors"
                  >
                    <UserCircle className="h-4 w-4" strokeWidth={1.5} />
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-paper-dim transition-colors"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.5} />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div
            className={
              fullWidth
                ? "px-[15px] py-8"
                : "max-w-5xl mx-auto px-4 sm:px-8 py-8"
            }
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
