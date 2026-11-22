'use client'

import { createContext, useState } from 'react'

export const ActivityPeriodContext = createContext(null)

export default function ActivityPeriodProvider({ children }) {
  const [weekOffset, setWeekOffset] = useState(0)

  return (
    <ActivityPeriodContext.Provider value={{ weekOffset, setWeekOffset }}>
      {children}
    </ActivityPeriodContext.Provider>
  )
}