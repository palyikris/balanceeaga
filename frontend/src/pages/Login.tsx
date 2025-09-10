import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      supabase.auth.signInWithOtp({ email });
      setStatus("sent");
    } catch (err: unknown) {
      console.log("err", err);
      if (err instanceof Error) {
        setError(err.message ?? "Hiba történt");
      } else {
        setError("Hiba történt");
      }
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-md w-full h-[100vh] flex items-center justify-center">
      <div className="rounded-2xl p-8 border border-offwhite/15 bg-graphite/60 shadow-[0_0_40px_rgba(0,179,179,.12)]">
        <h1 className="text-2xl font-bold mb-2">Belépés</h1>
        <p className="text-sm text-offwhite/70 mb-6">
          Add meg az e-mail címedet, és mi küldünk egy egyszeri kódot.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-graphite/70 border border-offwhite/15 focus:border-electric outline-none"
          />
          <button
            disabled={status === "loading"}
            className="w-full py-3 font-extrabold rounded-lg bg-gradient-to-r from-electric to-limeneon text-graphite border border-offwhite/70 hover:opacity-95 cursor-pointer btn-neo"
          >
            {status === "loading" ? "Küldés..." : "Kód kérése"}
          </button>
        </form>

        {status === "sent" && (
          <div className="mt-4 text-sm">
            <span className="text-electric">Kód elküldve! :)</span>
            <br />
            <a
              className="underline"
              href={`/otp?email=${encodeURIComponent(email)}`}
            >
              Ugrás a kód megadásához →
            </a>
          </div>
        )}
        {error && <p className="mt-4 text-sm text-red-400">⚠️ {error}</p>}
      </div>
    </div>
  );
}
