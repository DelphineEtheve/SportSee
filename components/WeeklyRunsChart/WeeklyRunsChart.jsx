'use client'

import { Pie, PieChart, ResponsiveContainer } from 'recharts'

export default function WeeklyRunsChart({ completedRuns, goal }) {
  const remainingRuns = Math.max(0, goal - completedRuns)

  const data = [
    { name: 'Réalisées', value: completedRuns, fill: '#1018ef' },
    { name: 'Restantes', value: remainingRuns, fill: '#b4b8ff' },
  ]

  return (
    <section>
      <h2>Courses hebdomadaires</h2>
      <p>{completedRuns} sur un objectif de {goal}</p>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            innerRadius="50%" 
            outerRadius="80%" />
        </PieChart>
      </ResponsiveContainer>
    </section>
  )
}