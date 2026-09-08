"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";
import { revalidatePublicPaths } from "@/lib/actions/revalidate";
import FormCard from "@/components/admin/ui/FormCard";

const RichTextEditor = dynamic(
  () => import("@/components/admin/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[10rem] rounded-md border border-line bg-paper-dim animate-pulse" />
    ),
  }
);

export type ServiceFormValues = {
  title: string;
  description: string;
  details: string;
  sortOrder: number;
  published: boolean;
};

export const emptyServiceValues: ServiceFormValues = {
  title: "",
  description: "",
  details: "",
  sortOrder: 0,
  published: true,
};

export default function ServiceForm({
  mode,
  type,
  serviceId,
  initialValues,
}: {
  mode: "create" | "edit";
  type: "SOFT" | "HARD";
  serviceId?: string;
  initialValues: ServiceFormValues;
}) {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [values, setValues] = useState<ServiceFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const listHref = type === "SOFT" ? "/admin/services/soft" : "/admin/services/hard";

  function set<K extends keyof ServiceFormValues>(key: K, value: ServiceFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSaving(true);

    try {
      if (mode === "create") {
        await api.post("/api/admin/services", { ...values, type }, token);
      } else {
        await api.put(`/api/admin/services/${serviceId}`, values, token);
      }
      await revalidatePublicPaths([
        "/",
        type === "SOFT" ? "/services/soft-services" : "/services/hard-services",
      ]);
      router.push(listHref);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <FormCard
            title="Service Info"
            description="Core details shown on the services page."
          >
            <label className="block">
              <span className="text-sm text-ink">Title</span>
              <input
                type="text"
                required
                value={values.title}
                onChange={(e) => set("title", e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-ink">Short Description</span>
              <textarea
                required
                rows={2}
                value={values.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Shown on the service card / homepage grid"
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none resize-y"
              />
            </label>

            <div className="block">
              <span className="text-sm text-ink">Expanded Details</span>
              <div className="mt-1.5">
                <RichTextEditor
                  value={values.details}
                  onChange={(html) => set("details", html)}
                  placeholder='Shown when the visitor clicks "Explore Service"'
                />
              </div>
            </div>
          </FormCard>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          <FormCard title="Display Order" description="Lower numbers show first.">
            <input
              type="number"
              value={values.sortOrder}
              onChange={(e) => set("sortOrder", parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </FormCard>

          <FormCard title="Service Status">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-ink">
                {values.published ? "Published" : "Draft"}
              </span>
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={values.published}
                  onChange={(e) => set("published", e.target.checked)}
                  className="peer sr-only"
                />
                <span className="h-6 w-11 rounded-full bg-line peer-checked:bg-teal transition-colors" />
                <span className="absolute left-0.5 h-5 w-5 rounded-full bg-paper shadow-sm transition-transform peer-checked:translate-x-5" />
              </span>
            </label>
            <p className="mt-2 text-xs text-slate/70">
              Published services are visible on the live site.
            </p>
          </FormCard>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-paper font-semibold text-sm px-7 py-3 hover:bg-teal transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : mode === "create" ? "Create Service" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
