"use client";

import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import RequireAdminAuth from "@/components/admin/RequireAdminAuth";
import AdminShell from "@/components/admin/AdminShell";
import { Button } from "@/components/admin/ui/Button";
import { useAdminAuth } from "@/lib/admin-auth";
import { api, API_URL, apiImageUrl } from "@/lib/api";

const inputClass =
  "mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors";

function ProfileContent() {
  const { user, token, refreshUser } = useAdminAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setProfileError(null);
    setProfileSuccess(false);
    setProfileSaving(true);
    try {
      await api.put("/api/auth/profile", { name, email }, token);
      await refreshUser();
      setProfileSuccess(true);
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setPasswordError(null);
    setPasswordSuccess(false);
    setPasswordSaving(true);
    try {
      await api.put("/api/auth/password", { currentPassword, newPassword }, token);
      setCurrentPassword("");
      setNewPassword("");
      setPasswordSuccess(true);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setPasswordSaving(false);
    }
  }

  async function handleAvatarFile(file: File) {
    if (!token) return;
    setAvatarUploading(true);
    setAvatarError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_URL}/api/admin/uploads/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      await api.put("/api/auth/profile", { avatarUrl: data.url }, token);
      await refreshUser();
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : "Avatar upload failed");
    } finally {
      setAvatarUploading(false);
    }
  }

  return (
    <AdminShell fullWidth>
      <div className="-mx-[15px] px-[30px]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold text-ink">Profile</h1>
          <p className="mt-1 text-sm text-slate">
            Update your account details and security settings.
          </p>

          <div className="mt-6 rounded-2xl border border-line bg-paper shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="h-28 bg-gradient-to-r from-ink to-teal" />

            <div className="px-8 pb-8">
              {/* Avatar + identity */}
              <div className="-mt-12 flex items-end gap-5">
                <div className="relative shrink-0">
                  <div className="h-24 w-24 rounded-full border-4 border-paper bg-paper-dim overflow-hidden flex items-center justify-center shadow-sm">
                    {user?.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={apiImageUrl(user.avatarUrl)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-slate text-2xl font-semibold">
                        {user?.name?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAvatarFile(file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={avatarUploading}
                    aria-label="Change photo"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-ink text-paper flex items-center justify-center border-2 border-paper hover:bg-teal transition-colors disabled:opacity-60"
                  >
                    <Camera className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="pb-1 min-w-0">
                  <p className="text-lg font-semibold text-ink truncate">{user?.name}</p>
                  <p className="text-sm text-slate truncate">{user?.email}</p>
                </div>
              </div>
              {avatarUploading && (
                <p className="mt-2 text-xs text-slate">Uploading…</p>
              )}
              {avatarError && <p className="mt-2 text-xs text-red-600">{avatarError}</p>}

              {/* Account details */}
              <div className="mt-8 border-t border-line pt-8">
                <h3 className="text-sm font-semibold text-ink">Account Details</h3>
                <form onSubmit={handleProfileSubmit} className="mt-4">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-sm text-ink">Name</span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-ink">Email</span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <Button type="submit" size="sm" disabled={profileSaving}>
                      {profileSaving ? "Saving…" : "Save Changes"}
                    </Button>
                    {profileError && <p className="text-sm text-red-600">{profileError}</p>}
                    {profileSuccess && (
                      <p className="text-sm text-teal">Profile updated successfully.</p>
                    )}
                  </div>
                </form>
              </div>

              {/* Change password */}
              <div className="mt-8 border-t border-line pt-8">
                <h3 className="text-sm font-semibold text-ink">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="mt-4">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-sm text-ink">Current Password</span>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={inputClass}
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-ink">New Password</span>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={inputClass}
                      />
                      <span className="text-xs text-slate/60">At least 8 characters</span>
                    </label>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <Button type="submit" size="sm" disabled={passwordSaving}>
                      {passwordSaving ? "Saving…" : "Change Password"}
                    </Button>
                    {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                    {passwordSuccess && (
                      <p className="text-sm text-teal">Password changed successfully.</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

export default function ProfilePage() {
  return (
    <RequireAdminAuth>
      <ProfileContent />
    </RequireAdminAuth>
  );
}
