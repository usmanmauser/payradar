"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

export function ResultsTable({ results, currency }) {
  if (!results || !results.yearlyData || results.yearlyData.length === 0) {
    return <div>No data available</div>
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Starting Balance</TableHead>
                <TableHead>Deposits</TableHead>
                <TableHead>Withdrawals</TableHead>
                <TableHead>Interest Earned</TableHead>
                <TableHead>Ending Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.yearlyData.map((yearData) => (
                <TableRow key={yearData.year}>
                  <TableCell>{yearData.year}</TableCell>
                  <TableCell>{formatCurrency(yearData.startBalance, currency.code)}</TableCell>
                  <TableCell>{formatCurrency(yearData.totalDeposits, currency.code)}</TableCell>
                  <TableCell>{formatCurrency(yearData.totalWithdrawals, currency.code)}</TableCell>
                  <TableCell>{formatCurrency(yearData.interestEarned, currency.code)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(yearData.balance, currency.code)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
