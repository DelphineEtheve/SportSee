'use client'

import { useContext } from 'react'
import { ActivityPeriodContext } from '@/context/ActivityPeriodContext'

export function PreviousWeekButton() {
  const { setWeekOffset } = useContext(ActivityPeriodContext)

  return (
    <button type="button" onClick={() => setWeekOffset((previous) => previous - 1)}>
      Semaine précédente
    </button>
  )
}

export function WeekOffsetDisplay() {
  const { weekOffset } = useContext(ActivityPeriodContext)

  return <p>Décalage de semaine : {weekOffset}</p>
}