// pages/tools.js
import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      emoji: '🔢',
      title: 'Compound Interest Calculator',
      description: 'See how your savings can grow over time with interest.',
      link: '/compound-interest-calculator',
    },
    {
      emoji: '💸',
      title: 'Loan Repayment Calculator',
      description: 'Plan your loan payoff and reduce interest costs.',
      link: '/loan-repayment-calculator',
    },
    {
      emoji: '🧾',
      title: 'Budget Planner',
      description: 'Track income and expenses to take control of your budget.',
      link: '/budget-planner',
    },
    {
      emoji: '🏖️',
      title: 'Retirement Savings Calculator',
      description: 'Estimate your savings for a stress-free retirement.',
      link: '/retirement-savings-calculator',
    },
    {
      emoji: '💳',
      title: 'Credit Card Payoff Calculator',
      description: 'Pay off credit cards faster and save on interest.',
      link: '/credit-card-payoff-calculator',
    },
    {
      emoji: '🎯',
      title: 'Savings Goal Tracker',
      description: 'Track your savings progress toward any goal.',
      link: '/savings-goal-tracker',
    },
    {
      emoji: '📈',
      title: '401(k) Contribution Estimator',
      description: 'See how contributions grow with time and employer match.',
      link: '/401k-contribution-estimator',
    },
    {
      emoji: '🏠',
      title: 'Mortgage Refinance Calculator',
      description: 'Compare your current mortgage with refinance options.',
      link: '/mortgage-refinance-calculator',
    },
    {
      emoji: '🏡',
      title: 'Rent vs. Buy Calculator',
      description: 'Compare renting vs buying based on your lifestyle.',
      link: '/rent-vs-buy-calculator',
    },
    {
      emoji: '💰',
      title: 'Home Affordability Calculator',
      description: 'Find out how much house you can afford confidently.',
      link: '/home-affordability-calculator',
    },
  ];

  return (
    <div className="py-16 px-6 md:px-20 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">🛠️ Our Financial Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <div key={tool.title} className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">{tool.emoji} {tool.title}</h2>
            <p className="text-gray-700 mb-4">{tool.description}</p>
            <Link href={tool.link}>
              <span className="inline-block mt-2 text-blue-600 font-medium hover:underline cursor-pointer">Try Tool →</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
