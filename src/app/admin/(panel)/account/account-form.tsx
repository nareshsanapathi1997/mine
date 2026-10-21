"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AccountForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setPending(true);
    try {
      const response = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, nextPassword }),
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.message || "Could not update the password.");
        return;
      }
      setCurrentPassword("");
      setNextPassword("");
      setMessage("Password updated.");
    } catch {
      setError("Could not update the password.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      <div>
        <Label htmlFor="current-pass">Current password</Label>
        <Input
          id="current-pass"
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          className="mt-1"
          required
        />
      </div>
      <div>
        <Label htmlFor="next-pass">New password</Label>
        <Input
          id="next-pass"
          type="password"
          value={nextPassword}
          onChange={(event) => setNextPassword(event.target.value)}
          className="mt-1"
          minLength={6}
          required
        />
      </div>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      {message ? <p className="text-sm font-medium text-success">{message}</p> : null}
      <Button type="submit" loading={pending}>
        Update password
      </Button>
    </form>
  );
}
