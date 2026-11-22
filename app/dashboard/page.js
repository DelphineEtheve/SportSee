import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from './page.module.css'
import { PreviousWeekButton, WeekOffsetDisplay } from '@/components/ActivityPeriodTest/ActivityPeriodTest'
import HeartRateChart from '@/components/HeartRateChart/HeartRateChart'
import mockSportsee from "../data/mockSportsee.json";
import WeeklyRunsChart from '@/components/WeeklyRunsChart/WeeklyRunsChart'
import WeeklyDistanceChart from '@/components/WeeklyDistanceChart/WeeklyDistanceChart'



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
  const sessionS4 =userActivity.filter((session) => {
    return session.date >= "2024-12-30" && session.date <= "2025-01-05";
  }).reduce((total, session) => {
    return total + session.distance;
  }, 0);

  // Données pour tester le graphique des distances parcourues
  const weeks = [
  { week: 'S1', start: '2024-12-09', end: '2024-12-15' },
  { week: 'S2', start: '2024-12-16', end: '2024-12-22' },
  { week: 'S3', start: '2024-12-23', end: '2024-12-29' },
  { week: 'S4', start: '2024-12-30', end: '2025-01-05' },
]


  const weeklyDistanceData = weeks.map(({ week, start, end }) => {
    const sessions = userActivity.filter(
      (session) => session.date >= start && session.date <= end,
    )
    const distance = sessions.reduce(
      (total, session) => total + session.distance,
    0,
    )
    return { week, distance }
  })

  const totalDistance = userActivity.reduce((total, session) => {
    return total + session.distance;
  }, 0);

  // Données pour le graphique de la fréquence cardiaque
  const averageHeartRate = userActivity[0].heartRate.average; 
  

  // Données pour le graphique des courses hebdomadaires
  const weeklyGoal = 6;
  
  const selectedWeek = weeks[weeks.length - 1]

  const weeklySessions = userActivity.filter(
    (session) =>
      session.date >= selectedWeek.start && session.date <= selectedWeek.end,
  )

  const heartRateData = weeklySessions.map((session) => ({
    date: session.date,
    heartAverageRate: session.heartRate.average,
    heartMaxRate: session.heartRate.max,
    heartMinRate: session.heartRate.min,
  }));


  const completedRuns = weeklySessions.length

  // Données pour les cartes de durée et de distance
  const weeklyDuration = weeklySessions.reduce(
  (total, session) => total + session.duration,
  0,
)

const weeklyDistance = weeklySessions.reduce(
  (total, session) => total + session.distance,
  0,
)
  return (
    <div>
      <h1>Mon tableau de bord</h1>
      
      <PreviousWeekButton />
      <WeekOffsetDisplay />
      <div className={styles.performanceCharts}>
       <div className={styles.weeklyCard}> 
          <WeeklyDistanceChart 
            data={weeklyDistanceData} 
          />
        </div>
        <div className={styles.weeklyCard}>
          <HeartRateChart 
            data={heartRateData} 
          />
        </div>
      </div>
      

      <div className={styles.weeklyRunsContainer}>
        <div className={styles.weeklyCard}>
          <WeeklyRunsChart 
            completedRuns={completedRuns} 
            goal={weeklyGoal} 
          />      
        </div>
      

        <div className={styles.weeklyStats}>
          <div className={styles.weeklyCard}> 
            <h3>Durée de l'activité </h3>
            <p>{weeklyDuration} minutes</p>
          </div>
          <div className={styles.weeklyCard}>
            <h3>Distance</h3>
            <p>{weeklyDistance} km</p>
          </div>
        </div>
      </div>
    </div>


)}