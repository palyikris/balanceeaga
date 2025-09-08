import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-full text-offwhite">
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            className="h-8 w-8 rounded-lg border border-offwhite/20"
            alt="logo"
          />
          <span className="font-extrabold text-lg">BalanceeAga</span>
        </div>
        <nav className="text-sm">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </header>
      <main className="px-6">
        <Outlet />
      </main>
    </div>
  );
}
