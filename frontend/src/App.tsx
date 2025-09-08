import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
export default function App() {
  return (
    <div className="min-h-full text-offwhite">
      <Header></Header>
      <main className="px-6">
        <Outlet />
      </main>
    </div>
  );
}
