

export async function apiPost<T = unknown>(path: string, body: unknown): Promise<T> {
  const API_BASE = import.meta.env.VITE_API_BASE;
  console.log("API_BASE", API_BASE);
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok)
    throw new Error((await res.json()).detail ?? `HTTP ${res.status}`);
  return res.json();
}
