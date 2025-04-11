import Head from 'next/head'
import Link from 'next/link'
import { FaLightbulb, FaTools, FaEnvelopeOpenText } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Head>
        <title>PayRadar | Smarter Financial Tools</title>
        <meta
          name="description"
          content="Plan, save, and grow smarter with 100% free financial calculators. No downloads, no sign-up — just simple tools for better money decisions."
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Smarter Tools for Smarter Money
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Plan, save, and grow with 10 powerful calculators — all free, no sign-up required.
        </p>
        <Link href="/tools">
          <a className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition">
            Explore All Tools
          </a>
        </Link>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-yellow-500 text-3xl mb-2 inline-block">
            <FaLightbulb />
          </div>
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-700 text-lg">
            At <span className="font-semibold text-blue-600">PayRadar</span>, we make money management simple. Whether you’re budgeting, saving, borrowing, or buying a home, our tools are built to empower your financial decisions — fast, free, and easy to use.
          </p>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-3xl text-blue-500 inline-block mb-2">
              <FaTools />
            </div>
            <h2 className="text-2xl font-bold">Explore Our Tools</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link href={tool.href} key={tool.title}>
                <a className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition block h-full">
                  <div className="text-xl mb-2">{tool.emoji} <span className="font-semibold">{tool.title}</span></div>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-3xl mb-4 inline-block">
            <FaEnvelopeOpenText />
          </div>
          <h2 className="text-2xl font-bold mb-2">Get Smart Money Tips</h2>
          <p className="mb-6">
            Join our newsletter for weekly personal finance tips and tool updates — no spam, ever.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-gray-800 w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

const tools = [
  {
    title: 'Compound Interest Calculator',
    emoji: '🔢',
    href: '/compound-interest-calculator',
    description:
      'See how your money can grow on its own over time. Even small amounts grow big if left alone.',
  },
  {
    title: 'Loan Repayment Calculator',
    emoji: '💸',
    href: '/loan-repayment-calculator',
    description:
      'See how long it takes to repay your loan and how much interest you’ll pay. Be in control of your debt.',
  },
  {
    title: 'Budget Planner',
    emoji: '🧾',
    href: '/budget-planner',
    description:
      'Organize income, expenses, and savings. Know where your money goes and stay on track every month.',
  },
  {
    title: 'Retirement Savings Calculator',
    emoji: '🏖️',
    href: '/retirement-savings-calculator',
    description:
      'See if you’re saving enough for retirement. Great for planning your future early.',
  },
  {
    title: 'Credit Card Payoff Calculator',
    emoji: '💳',
    href: '/credit-card-payoff-calculator',
    description:
      'Find out how long to pay off your credit card and how to save more by paying faster.',
  },
  {
    title: 'Savings Goal Tracker',
    emoji: '🎯',
    href: '/savings-goal-tracker',
    description:
      'Set savings goals and track your progress. Know if you’re on track or need to adjust.',
  },
  {
    title: '401(k) Contribution Estimator',
    emoji: '📈',
    href: '/401k-contribution-estimator',
    description:
      'Estimate how your 401(k) grows. See the power of early and consistent saving.',
  },
  {
    title: 'Mortgage Refinance Calculator',
    emoji: '🏠',
    href: '/mortgage-refinance-calculator',
    description:
      'Compare your mortgage with a new one. See how much you could save monthly and long-term.',
  },
  {
    title: 'Rent vs. Buy Calculator',
    emoji: '🏡',
    href: '/rent-vs-buy-calculator',
    description:
      'Compare renting and buying. Helps you decide what’s better for your situation.',
  },
  {
    title: 'Home Affordability Calculator',
    emoji: '💰',
    href: '/home-affordability-calculator',
    description:
      'See what home price fits your budget. A great first step if you’re thinking of buying.',
  },
]
