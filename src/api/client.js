const API_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * Error thrown when the API responds with a non-2xx status or an
 * application level `errorCode` payload.
 */
export class ApiError extends Error {
  constructor(message, { errorCode, errors } = {}) {
    super(message)
    this.name = 'ApiError'
    this.errorCode = errorCode
    this.errors = errors
  }
}

/**
 * Thin `fetch` wrapper that resolves to parsed JSON and rejects with an
 * {@link ApiError} for both transport and application errors.
 */
export async function apiRequest(path, { method = 'POST', body, headers, ...options } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok || data?.errorCode) {
    throw new ApiError(data?.errors ?? 'Beklenmeyen bir hata oluştu', data ?? {})
  }

  return data
}
