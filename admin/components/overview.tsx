"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "July",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    expenses: Math.floor(Math.random() * 5000) + 1000,
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview({stats}:any) {
  const dataArray = Object?.entries(stats);
  const ddata = []
  dataArray.map(([key, value]) => {
    let d =  {
    name: key,
    expenses:value.expenses,
    sales: value.sales,
    profit: value.profit,
    revenue: value.revenue,
  }
  ddata.push(d)
}) 
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={ddata}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Bar dataKey="expenses" fill="#FF0000" radius={[4, 4, 0, 0]} />
        <Bar dataKey="profit" fill="#82ca9d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="sales" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
