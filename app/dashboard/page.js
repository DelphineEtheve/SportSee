import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PreviousWeekButton, WeekOffsetDisplay } from '@/components/ActivityPeriodTest/ActivityPeriodTest'
import HeartRateChart from '@/components/HeartRateChart/HeartRateChart'
import mockSportsee from "../data/mockSportsee.json";

export default async function DashboardPage() {
 
 // Gestion de la session utilisateur avec le cookie 'sportsee_token'
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

  // Récupération des données de l'utilisateur depuis le fichier mockSportsee.json
  const {userActivity} = mockSportsee;
  const averageHeartRate = userActivity[0].heartRate.average; 
  const heartRateData = userActivity.map((session) => ({
    date: session.date,
    heartAverageRate: session.heartRate.average,
    heartMaxRate: session.heartRate.max,
    heartMinRate: session.heartRate.min,
  }));


  return (
    <div>
      <h1>Mon tableau de bord</h1>
      <PreviousWeekButton />
      <WeekOffsetDisplay />
      <HeartRateChart data={heartRateData} />
    </div>
  )

}