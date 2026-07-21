"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";
import { revalidatePublicPaths } from "@/lib/actions/revalidate";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FormCard from "@/components/admin/ui/FormCard";

export type TeamFormValues = {
  name: string;
  title: string;
  region: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
};

export const emptyTeamValues: TeamFormValues = {
  name: "",
  title: "",
  region: "",
  imageUrl: "",
  sortOrder: 0,
  published: true,
};

export default function TeamForm({
  mode,
  memberId,
  initialValues,
}: {
  mode: "create" | "edit";
  memberId?: string;
  initialValues: TeamFormValues;
}) {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [values, setValues] = useState<TeamFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof TeamFormValues>(key: K, value: TeamFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSaving(true);

    try {
      if (mode === "create") {
        await api.post("/api/admin/team", values, token);
      } else {
        await api.put(`/api/admin/team/${memberId}`, values, token);
      }
      await revalidatePublicPaths(["/", "/about/our-expert-team"]);
      router.push("/admin/team");
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
            title="Member Info"
            description="Shown on the Our Expert Team page."
          >
            <label className="block">
              <span className="text-sm text-ink">Name</span>
              <input
                type="text"
                required
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-ink">Title</span>
              <input
                type="text"
                required
                value={values.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Director, Workplace Experience"
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-ink">Region</span>
              <input
                type="text"
                required
                value={values.region}
                onChange={(e) => set("region", e.target.value)}
                placeholder="e.g. EMEA, Americas, Global"
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <ImageUploadField
              label="Photo"
              value={values.imageUrl}
              onChange={(url) => set("imageUrl", url)}
              uploadPath="/api/admin/uploads/team"
            />
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

          <FormCard title="Status">
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
              Published members are visible on the live site.
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
          {saving ? "Saving…" : mode === "create" ? "Create Member" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
