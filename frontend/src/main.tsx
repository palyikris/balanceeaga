import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Import from "./pages/Import";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyImports from "./pages/MyImports";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "otp", element: <Otp /> },
      { path: "import", element: <Import /> },
      { path: "my-imports", element: <MyImports /> },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        expand={false}
        richColors
        theme="dark"
        toastOptions={{
          duration: 2500,
          style: {
            backgroundColor: "#1C1C1C",
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
