import { supabase } from "@/lib/supabase";
import type { Applink } from "@/pages/Home";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const links: Applink[] = [
    {
      name: "Otthon",
      href: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FF3CAC"
          className="size-6"
          style={{
            width: "1.5em",
            height: "1.5em",
            verticalAlign: "-0.125em",
          }}
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
      ),
      description: "",
    },
    {
      name: "Import",
      href: "/import",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FF3CAC"
          className="size-6"
          style={{
            width: "1.5em",
            height: "1.5em",
            verticalAlign: "-0.125em",
          }}
        >
          <path
            fillRule="evenodd"
            d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      description: "",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      description: "Nézd meg a pénzügyeidet egy helyen.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FF3CAC"
          className="size-6"
          style={{
            width: "1.5em",
            height: "1.5em",
            verticalAlign: "-0.125em",
          }}
        >
          <path
            fillRule="evenodd"
            d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Tranzakciók",
      href: "/transactions",
      description: "Kezeld a tranzakcióidat és költségvetésedet.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FF3CAC"
          className="size-6"
          style={{
            width: "1.5em",
            height: "1.5em",
            verticalAlign: "-0.125em",
          }}
        >
          <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="px-6 py-4 flex items-center justify-between absolute top-0 left-0 w-full z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-tealblue rounded-lg px-2 py-1">
          <div
            className="h-8 w-8 overflow-hidden rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="/logo.png"
              className="h-12 w-12 object-cover"
              style={{ transform: "scale(1.5)" }}
              alt="logo"
            />
          </div>
        </div>
        <span className="font-extrabold text-lg">
          <span className="text-electric">Balancee</span>
          <span className="text-limeneon">Aga</span>
        </span>
      </div>
      {user && (
        <nav className="text-sm px-6 flex items-center gap-8">
          {links.map((link, i) => {
            return (
              <Link
                to={link.href}
                className="underline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".5em",
                }}
                key={i}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
          <button
            className="flex items-center w-full py-3 font-extrabold rounded-lg text-limeneon border border-limeneon cursor-pointer btn-neo-green px-6 ml-10 gap-2"
            onClick={async () => {
              await supabase.auth.signOut();
              console.log("User signed out");
              navigate("/login", { replace: true });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-6"
              fill="#A3FF12"
              style={{
                width: "1.5em",
                height: "1.5em",
                color: "#A3FF12",
              }}
            >
              <path
                fillRule="evenodd"
                d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
            Log out
          </button>
        </nav>
      )}
    </header>
  );
}