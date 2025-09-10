import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Otp() {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const prefill = search.get("prefill") ?? "";
  const emailParam = search.get("email") ?? "";

  const [email, setEmail] = useState(emailParam);
  const [code, setCode] = useState(prefill);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefill && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [prefill]);

  const maskedEmail = useMemo(() => {
    if (!email) return "";
    const [u, d] = email.split("@");
    if (!d) return email;
    return `${u.slice(0, 2)}***@${d}`;
  }, [email]);

  async function onVerify(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      setStatus("ok");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Érvénytelen vagy lejárt kód";
      setError(message);
      setStatus("error");
    }
  }

  function copyCode() {
    if (navigator.clipboard && code) {
      navigator.clipboard.writeText(code);
    } else if (inputRef.current) {
      inputRef.current.select();
      document.execCommand?.("copy");
    }
  }

  return (
    <div className="mx-auto max-w-md w-full h-[100vh] flex items-center justify-center">
      <div className="rounded-2xl p-8 border border-offwhite/15 bg-graphite/60 shadow-[0_0_50px_rgba(163,255,18,.15)]">
        <h1 className="text-2xl font-bold mb-2">Kód megadása</h1>
        <p className="text-sm text-offwhite/70 mb-6">
          {maskedEmail ? (
            <>
              A(z) <b>{maskedEmail}</b> címre küldtünk egy kódot.
            </>
          ) : (
            "Írd be az e-mail címed és a kapott kódot."
          )}
        </p>

        <form onSubmit={onVerify} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-graphite/70 border border-offwhite/15 focus:border-limeneon outline-none"
          />

          <div className="flex gap-2">
            <input
              ref={inputRef}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="flex-1 px-4 py-3 rounded-lg bg-graphite/70 border border-offwhite/15 focus:border-limeneon outline-none tracking-[0.4em] text-lg text-limeneon font-extrabold text-center"
            />
            <button
              type="button"
              onClick={copyCode}
              className="px-4 rounded-lg border border-offwhite/30 bg-graphite/60 hover:bg-graphite/80"
              title="Kód másolása vágólapra"
            >
              Copy
            </button>
          </div>

          <button
            disabled={status === "loading"}
            className="w-full py-3 font-extrabold rounded-lg bg-gradient-to-r from-limeneon to-tealblue text-graphite border border-offwhite/70 hover:opacity-95 btn-neo-green"
          >
            {status === "loading" ? "Ellenőrzés..." : "Belépek"}
          </button>

          {status === "ok" && (
            <p className="text-sm text-limeneon mt-2">Sikeres belépés!</p>
          )}
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </form>

        <div className="mt-6 text-xs text-offwhite/60">
          Nem kaptál kódot? Lépj vissza a{" "}
          <a href="/login" className="underline">
            kéréshez
          </a>
          .
        </div>
      </div>
    </div>
  );
}
