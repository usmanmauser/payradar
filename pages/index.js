import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Your All-In-One Personal Finance Toolkit
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700">
            Make smarter money decisions with beautifully simple calculators and planners built just for you.
          </p>
          <div className="mt-8">
            <a
              href="#tools"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Explore Tools
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">💡 How It Works</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            PayRadar offers 10 powerful, free financial tools that are incredibly easy to use. Whether you're saving, budgeting, planning retirement, or buying a home — we’ve got you covered. No jargon. No fluff. Just clarity.
          </p>
        </div>
      </section>

      {/* Tool Categories */}
      <section id="tools" className="bg-gray-50 py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">🛠️ Explore Our Tools</h2>

          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "🔢 Compound Interest Calculator",
                description: "See how your savings grow over time.",
                href: "/compound-interest",
              },
              {
                title: "💸 Loan Repayment Calculator",
                description: "Plan your loan payoff strategy.",
                href: "/loan-repayment",
              },
              {
                title: "🧾 Budget Planner",
                description: "Stay on top of your monthly spending.",
                href: "/budget-planner",
              },
              {
                title: "🏖️ Retirement Savings Calculator",
                description: "Know if you’re saving enough for the future.",
                href: "/retirement-savings",
              },
              {
                title: "💳 Credit Card Payoff Calculator",
                description: "Get out of debt faster with a custom plan.",
                href: "/credit-card-payoff",
              },
              {
                title: "🎯 Savings Goal Tracker",
                description: "Track your progress toward any financial goal.",
                href: "/savings-goal",
              },
              {
                title: "📈 401(k) Estimator",
                description: "Estimate your retirement contributions.",
                href: "/401k-contribution",
              },
              {
                title: "🏠 Mortgage Refinance Calculator",
                description: "See how much refinancing can save you.",
                href: "/mortgage-refinance",
              },
              {
                title: "🏡 Rent vs. Buy Calculator",
                description: "Compare the true cost of renting vs buying.",
                href: "/rent-vs-buy",
              },
              {
                title: "💰 Home Affordability Calculator",
                description: "Find out what kind of home fits your budget.",
                href: "/home-affordability",
              },
            ].map((tool, index) => (
              <Link key={index} href={tool.href}>
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-200 hover:border-blue-500 cursor-pointer">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{tool.title}</h3>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
