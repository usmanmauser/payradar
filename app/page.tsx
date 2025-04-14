import type { Metadata } from "next"
import CompoundInterestCalculator from "@/components/compound-interest-calculator"
import Link from "next/link"
import { CompoundInterestCalculatorStructuredData, FAQStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Advanced Compound Interest Calculator | PayRadar",
  description:
    "Calculate how your investments grow over time with our advanced compound interest calculator. Customize with deposits, withdrawals, and different compounding frequencies.",
  keywords:
    "compound interest calculator, compounding interest calculator, investment calculator with deposits and withdrawals, compound interest calculator with additional contributions, compound interest calculator with regular deposits, compound interest calculator with withdrawals, compound interest calculator with variable interest rates, compound interest calculator with different compounding frequencies, compound interest calculator with timeline customization, compound interest calculator with currency selection, compound interest calculator with yearly breakdown",
  openGraph: {
    title: "Advanced Compound Interest Calculator | PayRadar",
    description:
      "See how your money grows with compound interest. Plan your financial future with our powerful calculator.",
    type: "website",
    url: "https://payradar.space",
  },
}

export default function CompoundInterestPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <CompoundInterestCalculatorStructuredData />
      <FAQStructuredData />
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Advanced Compound Interest Calculator</h1>
      <p className="text-center text-muted-foreground mb-4 max-w-3xl mx-auto">
        See how your investments grow over time with the power of compound interest. Customize your calculation with
        additional deposits, withdrawals, and different compounding frequencies.
      </p>
      <div className="text-center mb-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/how-to-use-calculator" className="text-primary hover:underline">
          How to use this calculator →
        </Link>
        <Link href="/how-compound-interest-works" className="text-primary hover:underline">
          Learn how compound interest works →
        </Link>
      </div>
      <CompoundInterestCalculator />
    </main>
  )
}
