'use client'

import { Line, Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function HeartRateChart({ data }) {

  const totalHeartRate = data.reduce((total, session) => {
    return total + session.heartAverageRate
  }, 0)

  const averageHeartRate = totalHeartRate / data.length 

  const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

  function formatDayLabel(date) {
    const dayIndex = new Date(date).getUTCDay()
    return dayLabels[dayIndex]
  }
  
  return (
    <section>
      
      <h2>{averageHeartRate.toFixed(0)} bpm</h2>
      <p>Fréquence cardiaque moyenne 4 dernières semaines</p> 

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDayLabel} />
          <YAxis unit=" bpm" />
          <Bar 
            dataKey="heartMinRate" 
            fill="#ffbdb2"
            barSize={16}
            radius={8} 
          />
          <Bar 
            dataKey="heartMaxRate" 
            fill="#ff2d0a" 
            barSize={16}
            radius={8}
          />
          <Line 
            dataKey="heartAverageRate" 
            stroke="#1735ff" 
            strokeWidth={2}
            dot 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  )
}