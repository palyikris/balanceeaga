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
import ErrorPage from "./components/Error";
import Transactions from "./pages/Transactions";

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
      { path: "transactions", element: <Transactions /> },
      {
        path: "*",
        element: (
          <ErrorPage
            code={404}
            title="Where did you wander off to?"
            message="We can't seem to find the page you're looking for. It might have disappeared or never existed."
            details={`Timestamp: ${new Date().toISOString()}\nRoute: /analytics\nUser: dev-user`}
            onRetry={() => window.location.reload()}
            homeHref="/"
            requestId={crypto.randomUUID()}
          />
        ),
      },
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
