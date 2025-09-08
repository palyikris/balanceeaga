import { supabase } from "@/lib/supabase";
import { Link, useNavigate } from "react-router-dom";


export default function Header() {

  const navigate = useNavigate();

  return (
    <header className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-tealblue rounded-lg px-2 py-1">
          <div className="h-8 w-8 overflow-hidden rounded-lg flex items-center justify-center">
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
      <nav className="text-sm px-6 flex items-center">
        <Link
          to="/"
          className="underline"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".5em",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FF3CAC"
            className="size-6"
            style={{
              width: "1.5em",
              height: "1.5em",
              verticalAlign: "-0.125em",
              color: "#A3FF12",
            }}
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          Home
        </Link>
        <button
          className="flex items-center w-full py-3 font-extrabold rounded-lg text-limeneon border border-limeneon cursor-pointer btn-neo-green px-6 ml-20 gap-2"
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
    </header>
  );
}