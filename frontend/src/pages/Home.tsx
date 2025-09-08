import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  return (
    <div className="mx-auto max-w-3xl mt-16">
      <div className="rounded-2xl p-8 border border-offwhite/15 bg-graphite/60">
        <h1 className="text-2xl font-bold mb-2">Üdv a BalanceeAga-ban</h1>
        <p className="text-offwhite/70">
          {email ? (
            <>
              Be vagy jelentkezve mint <b>{email}</b>.
            </>
          ) : (
            <>Nem vagy bejelentkezve.</>
          )}
        </p>
      </div>
    </div>
  );
}
