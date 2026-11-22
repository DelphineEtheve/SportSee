'use client'

import { useState } from 'react'
import WeeklyDistanceChart from '@/components/WeeklyDistanceChart/WeeklyDistanceChart'

const periodDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

export default function WeeklyDistanceByPeriod   ({ weeks, sessions }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const lastWeekIndex = weeks.length - 1 + weekOffset
  const visibleWeeks = weeks.slice(lastWeekIndex - 3, lastWeekIndex + 1)
    console.log({ weekOffset, lastWeekIndex, visibleWeeks })
 
  const weeklyDistanceData = visibleWeeks.map(({ start, end }, index) => {
  const weeklySessions = sessions.filter(
    (session) => session.date >= start && session.date <= end,
  )

  const distance = weeklySessions.reduce(
    (total, session) => total + session.distance,
    0,
  )

  return { week: `S${index + 1}`, distance }
})
    //if (!visibleWeeks.length) {
  //  return <p>Il n'y a pas de données pour cette période.</p>
  //}

    return (
  <>
    <div>
      <button
        type="button"
        aria-label="Semaine précédente"
        disabled={lastWeekIndex ===3}
        onClick={() => setWeekOffset((offset) => offset - 1)}
      >
        ‹
      </button>

      <span>
        {periodDateFormatter.format(new Date(visibleWeeks[0].start))}
        {' – '}
        {periodDateFormatter.format(new Date(visibleWeeks [3].end))}
      </span>

      <button
        type="button"
        aria-label="Semaine suivante"
        disabled={lastWeekIndex === weeks.length - 1}
        onClick={() => setWeekOffset((offset) => offset + 1)}
      >
        ›
      </button>
    </div>

    <WeeklyDistanceChart 
        data={weeklyDistanceData} 
    />
  </>
)
}