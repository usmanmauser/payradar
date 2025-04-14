interface CalculationParams {
  principal: number
  annualRate: number
  compoundFrequency: number
  totalMonths: number
  additionalOptionType: string
  depositAmount: number
  depositFrequency: string
  withdrawalAmount: number
  withdrawalFrequency: string
}

interface YearlyData {
  year: number
  startBalance: number
  balance: number
  principal: number
  interestEarned: number
  totalDeposits: number
  totalWithdrawals: number
}

interface CalculationResult {
  finalBalance: number
  totalInterest: number
  totalDeposits: number
  totalWithdrawals: number
  yearlyData: YearlyData[]
}

export function calculateCompoundInterest(params: CalculationParams): CalculationResult {
  const {
    principal,
    annualRate,
    compoundFrequency,
    totalMonths,
    additionalOptionType,
    depositAmount,
    depositFrequency,
    withdrawalAmount,
    withdrawalFrequency,
  } = params

  // Convert annual rate to decimal
  const rateDecimal = annualRate / 100

  // Calculate rate per period
  const ratePerPeriod = rateDecimal / compoundFrequency

  // Calculate total number of compounding periods
  const totalPeriods = (totalMonths / 12) * compoundFrequency

  // Initialize variables
  let balance = principal
  let totalInterest = 0
  let totalDeposits = 0
  let totalWithdrawals = 0

  // Calculate deposit and withdrawal frequencies in months
  const depositFrequencyMonths = getFrequencyInMonths(depositFrequency)
  const withdrawalFrequencyMonths = getFrequencyInMonths(withdrawalFrequency)

  // Calculate monthly compounding periods
  const periodsPerMonth = compoundFrequency / 12

  // Initialize yearly data array
  const yearlyData: YearlyData[] = []
  let currentYear = 1
  let yearStartBalance = principal
  let yearDeposits = 0
  let yearWithdrawals = 0
  let yearInterestEarned = 0
  let yearPrincipal = principal

  // Calculate compound interest for each period
  for (let month = 1; month <= totalMonths; month++) {
    // Start of a new year
    if ((month - 1) % 12 === 0 && month > 1) {
      yearlyData.push({
        year: currentYear,
        startBalance: yearStartBalance,
        balance,
        principal: yearPrincipal,
        interestEarned: yearInterestEarned,
        totalDeposits: yearDeposits,
        totalWithdrawals: yearWithdrawals,
      })

      currentYear++
      yearStartBalance = balance
      yearDeposits = 0
      yearWithdrawals = 0
      yearInterestEarned = 0
      yearPrincipal = balance
    }

    // Process deposits
    if (
      (additionalOptionType === "deposits" || additionalOptionType === "both") &&
      month % depositFrequencyMonths === 0
    ) {
      balance += depositAmount
      totalDeposits += depositAmount
      yearDeposits += depositAmount
      yearPrincipal += depositAmount
    }

    // Process withdrawals
    if (
      (additionalOptionType === "withdrawals" || additionalOptionType === "both") &&
      month % withdrawalFrequencyMonths === 0
    ) {
      balance -= withdrawalAmount
      totalWithdrawals += withdrawalAmount
      yearWithdrawals += withdrawalAmount

      // Ensure balance doesn't go negative
      if (balance < 0) {
        balance = 0
      }
    }

    // Calculate interest for this month
    for (let p = 0; p < periodsPerMonth; p++) {
      const interestEarned = balance * ratePerPeriod
      balance += interestEarned
      totalInterest += interestEarned
      yearInterestEarned += interestEarned
    }
  }

  // Add the final year's data
  yearlyData.push({
    year: currentYear,
    startBalance: yearStartBalance,
    balance,
    principal: yearPrincipal,
    interestEarned: yearInterestEarned,
    totalDeposits: yearDeposits,
    totalWithdrawals: yearWithdrawals,
  })

  return {
    finalBalance: balance,
    totalInterest,
    totalDeposits,
    totalWithdrawals,
    yearlyData,
  }
}

function getFrequencyInMonths(frequency: string): number {
  switch (frequency) {
    case "monthly":
      return 1
    case "quarterly":
      return 3
    case "semiannually":
      return 6
    case "annually":
      return 12
    default:
      return 1
  }
}
