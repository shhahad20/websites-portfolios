export const API_URL = import.meta.env.VITE_BACKEND_URL as string;

export interface ApiGetOptions extends Omit<RequestInit, 'method' | 'body'> {
  headers?: HeadersInit;
}
export interface ApiPostOptions<D = unknown> extends Omit<RequestInit, 'method' | 'body'> {
  headers?: HeadersInit;
  body?: D;
}

export async function apiGet<T>(
  endpoint: string,
  options: ApiGetOptions = {}
): Promise<T> {
  const { headers = {}, ...rest } = options

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',     // keep cookies/auth
    headers: {
      'Content-Type': 'application/json',
      ...headers,               // merge in any custom headers
    },
    ...rest,                    // other fetch options if needed
  })
  if (!res.ok) {
    // you can also parse JSON error payload here if your API returns structured errors
    throw new Error(await res.text())
  }

  return res.json()
}

export async function apiPost<T, D = unknown>(
  endpoint: string,
  data: D,
  options: ApiGetOptions = {}
): Promise<T> {
    const { headers = {}, ...rest } = options

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
        headers: {
      'Content-Type': 'application/json',
      ...headers,               // merge in any custom headers
    },
    ...rest, 
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}