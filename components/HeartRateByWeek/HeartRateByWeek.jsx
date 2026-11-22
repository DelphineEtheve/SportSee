'use client'

import { useContext } from 'react'
import { ActivityPeriodContext } from '@/context/ActivityPeriodContext'
import HeartRateChart from '@/components/HeartRateChart/HeartRateChart'

const periodDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
})

export default function HeartRateByWeek({ weeks, sessions }) {
  const { weekOffset,setWeekOffset } = useContext(ActivityPeriodContext)
  const weekIndex = weeks.length - 1 + weekOffset
  const week = weeks[weekIndex]

  if (!week) {
    return <p>Cette semaine est hors de la période du mock.</p>
  }

  const heartRateData = sessions
    .filter((session) => session.date >= week.start && session.date <= week.end)
    .map((session) => ({
      date: session.date,
      heartMinRate: session.heartRate.min,
      heartMaxRate: session.heartRate.max,
      heartAverageRate: session.heartRate.average,
    }))

  return (
  <>
    <div>
      <button
        type="button"
        aria-label="Semaine précédente"
        disabled={weekIndex === 0}
        onClick={() => setWeekOffset((offset) => offset - 1)}
      >
        ‹
      </button>

      <span>
        {periodDateFormatter.format(new Date(week.start))}
        {' – '}
        {periodDateFormatter.format(new Date(week.end))}
      </span>

      <button
        type="button"
        aria-label="Semaine suivante"
        disabled={weekIndex === weeks.length - 1}
        onClick={() => setWeekOffset((offset) => offset + 1)}
      >
        ›
      </button>
    </div>

   {heartRateData.length > 0 ? (
      <HeartRateChart data={heartRateData} />
    ) : (
      <p>Aucune séance pour cette semaine.</p>
    )}
  </>
)
}