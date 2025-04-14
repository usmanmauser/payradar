"use client"

import { Line, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

export function ResultsChart({ results, currency }) {
  if (!results || !results.yearlyData || results.yearlyData.length === 0) {
    return <div>No data available</div>
  }

  const chartData = results.yearlyData.map((item) => ({
    year: `Year ${item.year}`,
    principal: item.principal,
    interest: item.balance - item.principal,
    balance: item.balance,
  }))

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => formatCurrency(value, currency.code, 0)} width={80} />
              <Tooltip formatter={(value) => formatCurrency(value, currency.code)} labelFormatter={(label) => label} />
              <Legend />
              <Bar dataKey="principal" stackId="a" fill="#8884d8" name="Principal" />
              <Bar dataKey="interest" stackId="a" fill="#82ca9d" name="Interest" />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#ff7300"
                name="Total Balance"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
