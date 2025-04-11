import Head from 'next/head';
import Link from 'next/link';

const tools = [
  {
    title: '🔢 Compound Interest Calculator',
    href: '/compound-interest-calculator',
    description: 'See how your money can grow over time. Even small amounts grow big with compound interest. Great for anyone starting to save!',
  },
  {
    title: '💸 Loan Repayment Calculator',
    href: '/loan-repayment-calculator',
    description: 'Understand how long it’ll take to pay back a loan. Shows total interest and helps you plan faster debt payoff.',
  },
  {
    title: '🧾 Budget Planner',
    href: '/budget-planner',
    description: 'Track your income and expenses easily. Helps you spot where money goes and where you can save.',
  },
  {
    title: '🏖️ Retirement Savings Calculator',
    href: '/retirement-savings-calculator',
    description: 'See if you’re saving enough for retirement. Plan early and adjust to reach your future goals with ease.',
  },
  {
    title: '💳 Credit Card Payoff Calculator',
    href: '/credit-card-payoff-calculator',
    description: 'Figure out how long it’ll take to pay off credit card debt and how much interest you’ll pay. Pay off faster.',
  },
  {
    title: '🎯 Savings Goal Tracker',
    href: '/savings-goal-tracker',
    description: 'Saving for a big goal? Track your progress and see if you’re on pace or need to adjust.',
  },
  {
    title: '📈 401(k) Contribution Estimator',
    href: '/401k-contribution-estimator',
    description: 'Estimate how much your 401(k) will grow. See the impact of contributions and employer match over time.',
  },
  {
    title: '🏠 Mortgage Refinance Calculator',
    href: '/mortgage-refinance-calculator',
    description: 'Compare your current loan with a new one. See potential savings on monthly payments and long-term interest.',
  },
  {
    title: '🏡 Rent vs. Buy Calculator',
    href: '/rent-vs-buy-calculator',
    description: 'Should you rent or buy a home? Compare both to see which makes more financial sense for you.',
  },
  {
    title: '💰 Home Affordability Calculator',
    href: '/home-affordability-calculator',
    description: 'Find out how much house you can afford based on your income and expenses. A smart first step toward buying.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>PayRadar | Smarter Tools for Smarter Money</title>
        <meta
          name="description"
          content="10 powerful and free personal finance tools to help you save, plan, and grow. No downloads, no sign-ups, just smarter money management."
        />
      </Head>

      <main className="bg-gray-50 min-h-screen px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Smarter Tools for Smarter Money</h1>
          <p className="mt-4 text-lg text-gray-600">
            Plan, save, and grow with 10 free calculators — no sign-up required.
          </p>
        </section>

        {/* Tool Grid */}
        <section className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href}>
              <a className="block bg-white hover:shadow-xl shadow-md rounded-2xl p-6 transition border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{tool.title}</h2>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </a>
            </Link>
          ))}
        </section>

        {/* Contact Footer Area */}
        <section className="text-center mt-20 text-sm text-gray-500">
          <p>Contact us: <a href="mailto:contact@payrader.space" className="text-blue-600">contact@payrader.space</a></p>
        </section>
      </main>
    </>
  );
}
