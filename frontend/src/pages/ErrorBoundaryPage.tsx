import ErrorPage from "@/components/Error";

export default function ErrorBoundaryPage() {
  return (
    <ErrorPage
      code={500}
      title="Something went sideways"
      message="We tripped over a loose wire. You can try again or head back home."
      requestId={crypto.randomUUID()}
      details={`Timestamp: ${new Date().toISOString()}\nRoute: /analytics\nUser: dev-user`}
      onRetry={() => window.location.reload()}
      homeHref="/"
      supportHref="mailto:support@balanceeaga.app?subject=Error%20report"
    />
  );
}
