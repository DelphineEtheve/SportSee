'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function WeeklyDistanceChart({ data }) {
    const totalDistance = data.reduce((total, week) => {
        return total + week.distance
    }, 0)

    const averageDistance = totalDistance / data.length
 
    return (
    <section>

      
        <h2>{averageDistance.toFixed(2)} km</h2>
        <p>Total des kilomètres 4 dernières semaines</p>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis unit=" km" />
          <Bar 
            dataKey="distance" 
            fill="#b4b8ff" 
            barSize={16} 
            radius={8} 
        />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}