// pages/about.js

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-16 px-6 md:px-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">💼 About PayRadar</h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          We started PayRadar with a simple idea: personal finance shouldn’t be confusing. Whether you're trying to save more, pay off debt, or just get a better handle on your money — we believe everyone deserves clear, honest tools to help them make smarter decisions.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          There’s a lot of noise out there when it comes to money advice. That’s why we built PayRadar to be different — no fluff, no jargon, and no gimmicks. Just helpful, easy-to-use calculators that give you real answers to real-life questions. 
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Whether you're planning your first budget, figuring out if it’s time to refinance, or dreaming of your first home, we’ve got a tool for that. And we’re always building more to help you stay one step ahead of your financial goals.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Thanks for stopping by. We hope PayRadar gives you the clarity and confidence to take control of your money — one smart decision at a time.
        </p>
        <p className="text-base text-gray-500 mt-8">– The PayRadar Team</p>
      </div>

      {/* Tools Section */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">🔍 Explore Our Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <Link href="/compound-interest-calculator" className="text-blue-600 hover:underline">🔢 Compound Interest Calculator</Link>
          <Link href="/loan-repayment-calculator" className="text-blue-600 hover:underline">💸 Loan Repayment Calculator</Link>
          <Link href="/budget-planner" className="text-blue-600 hover:underline">🧾 Budget Planner</Link>
          <Link href="/retirement-savings-calculator" className="text-blue-600 hover:underline">🏖️ Retirement Savings Calculator</Link>
          <Link href="/credit-card-payoff-calculator" className="text-blue-600 hover:underline">💳 Credit Card Payoff Calculator</Link>
          <Link href="/savings-goal-tracker" className="text-blue-600 hover:underline">🎯 Savings Goal Tracker</Link>
          <Link href="/401k-contribution-estimator" className="text-blue-600 hover:underline">📈 401(k) Contribution Estimator</Link>
          <Link href="/mortgage-refinance-calculator" className="text-blue-600 hover:underline">🏠 Mortgage Refinance Calculator</Link>
          <Link href="/rent-vs-buy-calculator" className="text-blue-600 hover:underline">🏡 Rent vs. Buy Calculator</Link>
          <Link href="/home-affordability-calculator" className="text-blue-600 hover:underline">💰 Home Affordability Calculator</Link>
        </div>
      </div>
    </div>
  );
}
