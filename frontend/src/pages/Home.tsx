import { useEffect, useState, type ReactElement } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { BlurFade } from "./../components/magicui/blur-fade";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import AppLinks from "@/components/home/AppLinks";

export interface Applink {
  name: string;
  href: string;
  description: string;
  icon: ReactElement;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setEmail(user.email);
      } else {
        navigate("/login", { replace: true });
      }
      setLoading(false);
    });
  }, [navigate]);

  return (
    <div className="mx-auto max-w-6xl mt-16 max-h-[90vh]">
      <BlurFade delay={0.1} direction="left" inView className="pt-15">
        <div className="rounded-2xl p-8 border border-offwhite/15 bg-graphite/60">
          <TypingAnimation
            delay={0.12}
            className="text-2xl font-bold mb-2"
            as={"h1"}
          >
            Üdv a BalanceeAga-ban! :)
          </TypingAnimation>
          {loading ? (
            <Spinner color="#00B3B3"></Spinner>
          ) : (
            <p className="text-offwhite/70">
              {email ? (
                <>
                  Be vagy jelentkezve mint{" "}
                  <b className="text-limeneon">{email.split("@")[0]}</b>
                  <b className="text-tealblue">@</b>
                  <b className="text-electric">{email.split("@")[1]}</b>.
                </>
              ) : (
                <>Nem vagy bejelentkezve.</>
              )}
            </p>
          )}
        </div>
      </BlurFade>
      <AppLinks></AppLinks>
    </div>
  );
}
