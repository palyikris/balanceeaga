import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function App() {

  return (
    <div className="min-h-full text-offwhite">
      <Header></Header>
      <main className="px-6 h-full relative min-h-screen">
        <Outlet />
        <div className="h-full w-full fixed top-0 left-0 -z-10">
          <DotPattern className="w-full opacity-20"></DotPattern>
        </div>
      </main>
    </div>
  );
}
