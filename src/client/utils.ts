//@TODO: Move this to dotenv
const BASE_PATH = '/api';

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
        throw new Error(response.statusText)
      }
      return response.json()
    })
}
