//@TODO: Move this to dotenv
const BASE_PATH = '/api';

/**
 * Wrapper over fetch to enforce sensible defaults for interacting
 * with the API.
 * @param uri - The URI to be requested 
 * @param body - The body of the request
 * @returns 
 */
export function post<T>(uri: string, body: {}): Promise<T> {
  return fetch(`${BASE_PATH}/${uri}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'default',
    body: JSON.stringify(body)
  })
    .then(response => {
      if (!response.ok) {
        // Any error logging should go here, e.g. Sentry, Datadog, etc.
        throw new Error(response.statusText)
      }
      return response.json()
    })
}
