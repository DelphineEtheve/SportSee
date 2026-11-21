import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sportsee_token')?.value

  if (!token) {
    redirect('/connexion')
  }

  const response = await fetch('http://localhost:8000/api/user-info', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (response.status === 401 || response.status === 403) {
    redirect('/connexion')
  }

  if (!response.ok) {
    throw new Error('Impossible de vérifier la session SportSee.')
  }

  return <h1>Mon tableau de bord</h1>
}