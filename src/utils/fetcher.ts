export async function fetcher<T>(url: string, options?: { method: 'GET' | 'POST', body?: unknown }): Promise<T> {
  const fetchOptions: {method: string, headers: HeadersInit, body?: BodyInit} = {
    method: options?.method || 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  if (options?.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  return await fetch(url, fetchOptions).then((res) => res.json());
}
