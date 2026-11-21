import { cookies } from 'next/headers'

export async function POST(request) {
  const { username, password } = await request.json()

  let response
  try {
    response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  } catch {
    return Response.json(
      { message: 'Le backend SportSee est indisponible.' },
      { status: 502 },
    )
  }

  if (!response.ok) {
    return Response.json(
      { message: 'La connexion a échoué.' },
      { status: response.status },
    )
  }

  const { token, userId } = await response.json()
  const cookieStore = await cookies()

  cookieStore.set('sportsee_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return Response.json({ userId })
}