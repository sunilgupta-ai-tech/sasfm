"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import TeamForm, { type TeamFormValues } from "@/components/admin/TeamForm";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";

export default function EditTeamContent() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAdminAuth();
  const [values, setValues] = useState<TeamFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api
      .get<{ member: TeamFormValues }>(`/api/admin/team/${id}`, token)
      .then((res) => setValues(res.member))
      .catch((err) => setError(err.message));
  }, [id, token]);

  return (
    <AdminShell fullWidth>
      <h2 className="text-2xl font-semibold text-ink">Edit Team Member</h2>
      <div className="mt-8">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!values && !error && <p className="text-sm text-slate">Loading…</p>}
        {values && <TeamForm mode="edit" memberId={id} initialValues={values} />}
      </div>
    </AdminShell>
  );
}
