import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function App() {
  return (
    <div className="min-h-full text-offwhite">
      <Header></Header>
      <main className="px-6">
        <Outlet />
        <div
          className="w-full h-[100vh] absolute -z-1 top-0 left-0 bg-app"
          id="dot-pattern"
        >
          <DotPattern className="w-full h-[100vh] opacity-20"></DotPattern>
        </div>
      </main>
    </div>
  );
}
