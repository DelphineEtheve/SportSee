'use client'

import { Line, Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function HeartRateChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data}>
        <XAxis dataKey="date" />
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
  )
}