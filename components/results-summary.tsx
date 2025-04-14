"use client"

import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, numberToWords } from "@/lib/utils"

export function ResultsSummary({
  results,
  initialInvestment,
  currency,
  years,
  months,
  interestRate,
  compoundFrequency,
  additionalOptionType,
}) {
  if (!results) return null

  const { finalBalance, totalInterest, totalDeposits, totalWithdrawals } = results

  const compoundFrequencyText =
    {
      daily: "daily",
      weekly: "weekly",
      biweekly: "bi-weekly",
      monthly: "monthly",
      quarterly: "quarterly",
      semiannually: "half-yearly",
      annually: "yearly",
    }[compoundFrequency] || "yearly"

  const timeText = `${years} year${years !== 1 ? "s" : ""}${months > 0 ? ` and ${months} month${months !== 1 ? "s" : ""}` : ""}`

  let additionalText = ""
  if (additionalOptionType === "deposits") {
    additionalText = ` with regular deposits`
  } else if (additionalOptionType === "withdrawals") {
    additionalText = ` with regular withdrawals`
  } else if (additionalOptionType === "both") {
    additionalText = ` with regular deposits and withdrawals`
  }

  return (
    <Card className="bg-primary/5">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold break-words">{formatCurrency(finalBalance, currency.code)}</h3>
            <p className="text-muted-foreground break-words">{numberToWords(finalBalance, currency.code)}</p>
          </div>

          <p className="break-words">
            An initial investment of {formatCurrency(initialInvestment, currency.code)} at {interestRate}% interest
            compounded {compoundFrequencyText} for {timeText}
            {additionalText} will grow to {formatCurrency(finalBalance, currency.code)}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-background p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Initial Investment</div>
              <div className="text-xl font-medium mt-1 break-words">
                {formatCurrency(initialInvestment, currency.code)}
              </div>
            </div>

            <div className="bg-background p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Total Interest Earned</div>
              <div className="text-xl font-medium mt-1 break-words">{formatCurrency(totalInterest, currency.code)}</div>
            </div>

            {additionalOptionType === "deposits" || additionalOptionType === "both" ? (
              <div className="bg-background p-4 rounded-md">
                <div className="text-sm text-muted-foreground">Total Deposits</div>
                <div className="text-xl font-medium mt-1 break-words">
                  {formatCurrency(totalDeposits, currency.code)}
                </div>
              </div>
            ) : null}

            {additionalOptionType === "withdrawals" || additionalOptionType === "both" ? (
              <div className="bg-background p-4 rounded-md">
                <div className="text-sm text-muted-foreground">Total Withdrawals</div>
                <div className="text-xl font-medium mt-1 break-words">
                  {formatCurrency(totalWithdrawals, currency.code)}
                </div>
              </div>
            ) : null}

            <div className="bg-background p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Final Balance</div>
              <div className="text-xl font-medium mt-1 break-words">{formatCurrency(finalBalance, currency.code)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
