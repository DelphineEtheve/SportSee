export function useLogin() {
  async function login({ username, password }) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error(`Connexion refusée (HTTP ${response.status})`)
    }

    return response.json()
  }

  return { login }
}