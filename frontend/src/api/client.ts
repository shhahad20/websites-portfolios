export const API_URL = import.meta.env.VITE_BACKEND_URL as string;

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost<T, D = unknown>(endpoint: string, data: D): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

