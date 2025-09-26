import { cn } from "@/lib/utils";
import { notify } from "@/toast";
import React from "react";
import { Highlighter } from './ui/highlighter';

type ErrorPageProps = {
  code?: string | number; // e.g., 500, "ERR_IMPORT_FAILED"
  title?: string; // e.g., "Something went wrong"
  message?: string; // user-friendly message
  requestId?: string; // trace/support id
  details?: string; // raw details / stack trace / JSON
  onRetry?: () => void; // retry handler (optional)
  homeHref?: string; // fallback to "/"
  supportHref?: string; // e.g., "mailto:support@balanceeaga.app"
  className?: string;
};

export default function ErrorPage({
  code = "500",
  title = "Uh-oh!",
  message = "Our circuits got tangled. Let’s get you back on track.",
  requestId,
  details,
  onRetry,
  homeHref = "/",
  supportHref = "mailto:support@balanceeaga.app",
  className,
}: ErrorPageProps) {
  const [open, setOpen] = React.useState(false);
  const copy = React.useCallback(async () => {
    try {
      const text = [
        `Code: ${code}`,
        `Title: ${title}`,
        `Message: ${message}`,
        requestId ? `Request-ID: ${requestId}` : null,
        details ? `Details:\n${details}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      await navigator.clipboard.writeText(text);
      notify.success("Copied error details to clipboard");
    } catch {
      notify.error("Failed to copy to clipboard");
    }
  }, [code, title, message, requestId, details]);

  return (
    <main
      className={cn(
        "relative min-h-[100svh] overflow-hidden text-offwhite",
        "flex items-center justify-center p-6",
        className
      )}
      aria-describedby="error-message"
      role="alert"
    >
      {/* --- Background: animated neon waves + subtle grain --- */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-80",
          // big blended blobs using our accent colors
          "[background:radial-gradient(60rem_40rem_at_0%_100%,theme(colors.electric)_0%,transparent_60%),",
          "radial-gradient(50rem_30rem_at_120%_-10%,theme(colors.limeneon)_0%,transparent_55%),",
          "radial-gradient(35rem_25rem_at_100%_60%,theme(colors.teal)_0%,transparent_60%)]",
          // soft masking to keep center readable
          "[mask-image:radial-gradient(80rem_50rem_at_50%_50%,#000_45%,transparent_85%)]"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 mix-blend-overlay",
          // animated sheen
          "before:absolute before:inset-0 before:[background:conic-gradient(from_0deg,transparent_0_340deg,theme(colors.offwhite)/8_360deg)]",
          "before:animate-[spin_18s_linear_infinite]"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-20",
          // film grain
          "[background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 opacity=%220.15%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]"
        )}
      />

      {/* --- Card --- */}
      <section
        className={cn(
          "relative z-10 w-full max-w-2xl",
          "rounded-2xl border border-offwhite/20 bg-coolgray/40 backdrop-blur-xl",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_40px_-10px_rgba(0,0,0,0.6)]"
        )}
      >
        {/* top ribbon */}
        {/* <div
          className={cn(
            "h-1.5 w-full rounded-t-2xl",
            "bg-gradient-to-r from-electric via-teal to-limeneon"
          )}
        /> */}
        <div className="flex items-center justify-center px-6 pt-4 w-full">
          <span
            className={cn(
              "inline-flex items-center rounded-md px-4 py-2 text-8xl font-bold mt-4",
              "bg-offwhite/10 text-electric/80"
            )}
          >
            {String(code)}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            {/* Icon */}
            {/* <div
              className={cn(
                "shrink-0 rounded-xl p-3",
                "bg-gradient-to-tr",
                "border border-limeneon"
              )}
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#A3FF12"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div> */}

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {title}
                </h1>

                {requestId && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold",
                      "bg-graphite/60 text-offwhite/70 border border-offwhite/10"
                    )}
                    title="Request ID"
                  >
                    #{requestId}
                  </span>
                )}
              </div>

              <p
                id="error-message"
                className="mt-3 text-offwhite/80 leading-relaxed border-l-2 border-limeneon/50 pl-4"
                style={{
                  margin: "2rem 0"
                }}
              >
                {message}
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className={cn(
                      "group relative inline-flex items-center justify-center",
                      "rounded-lg px-4 py-2.5 font-extrabold text-electric",
                      "border border-electric cursor-pointer btn-neo",
                      "transition-transform duration-200 hover:opacity-95 active:scale-[0.98]"
                    )}
                  >
                    Try again
                  </button>
                )}

                <a
                  href={homeHref}
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-semibold",
                    "bg-offwhite/10 text-offwhite border border-offwhite/20",
                    "hover:bg-offwhite/15 transition-colors"
                  )}
                >
                  Go home
                </a>

                <a
                  href={supportHref}
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-semibold",
                    "text-offwhite/90 border border-offwhite/20",
                    "bg-gradient-to-r from-graphite/60 to-coolgray/60 hover:to-coolgray/70 transition-colors"
                  )}
                >
                  Report issue
                </a>

                <button
                  onClick={copy}
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-semibold cursor-pointer",
                    "text-offwhite/90 border border-offwhite/20",
                    "bg-graphite/50 hover:bg-graphite/60 transition-colors"
                  )}
                >
                  Copy details
                </button>
              </div>

              {/* Collapsible technical details */}
              {(details || requestId) && (
                <div className="mt-6">
                  <Highlighter action="underline" color="#00B3B3">
                    <button
                      className={cn(
                        "text-sm font-semibold underline-offset-4 hover:decoration-limeneon/70 cursor-pointer"
                      )}
                      onClick={() => setOpen((v) => !v)}
                      aria-expanded={open}
                      aria-controls="error-details"
                    >
                      {open
                        ? "Hide technical details"
                        : "Show technical details"}
                    </button>
                  </Highlighter>
                  <div
                    id="error-details"
                    className={cn(
                      "transition-all overflow-hidden",
                      open ? "mt-3 max-h-[28rem]" : "max-h-0"
                    )}
                  >
                    <pre
                      className={cn(
                        "mt-3 whitespace-pre-wrap break-words rounded-lg p-4 text-sm",
                        "bg-black/40 border border-offwhite/15 text-offwhite/90"
                      )}
                    >
                      {`Request-ID: ${requestId ?? "—"}\n\n${
                        details ?? "No additional details available."
                      }`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
