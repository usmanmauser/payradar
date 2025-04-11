// pages/index.js
import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>PayRadar | Smart Financial Calculators</title>
        <meta name="description" content="Free financial tools that help you save, plan, borrow, and invest smarter. No signup needed." />
        <meta name="keywords" content="financial tools, calculators, savings, loan, budget, retirement" />
        <meta name="author" content="PayRadar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">Smarter Tools for Smarter Money</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Plan, save, and grow with 10 powerful calculators — all free, no sign-up required.
        </p>
        <a href="/tools" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition">
          Explore All Tools
        </a>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">💡 How It Works</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At <strong className="text-blue-600">PayRadar</strong>, we make money management simple. Whether you’re budgeting, saving, borrowing, or buying a home, our tools are built to empower your financial decisions — fast, free, and easy to use.
          </p>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-20 bg-gray-50 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">🛠️ Explore Our Tools</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-left">
            {tools.map((tool) => (
              <a key={tool.href} href={tool.href} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">{tool.icon} {tool.title}</h3>
                <p className="text-gray-700">{tool.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">📬 Get Smart Money Tips</h2>
        <p className="mb-6">Join our newsletter for weekly personal finance tips and tool updates — no spam, ever.</p>
        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg w-full sm:w-auto flex-1 text-black"
          />
          <button type="submit" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <a href="/" className="text-2xl font-bold text-white">PayRadar</a>
            <p className="text-gray-400 mt-3">Smarter tools for smarter money. 100% free financial calculators — no downloads, no fluff.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white text-gray-400">Home</a></li>
              <li><a href="/tools" className="hover:text-white text-gray-400">Tools</a></li>
              <li><a href="/about" className="hover:text-white text-gray-400">About</a></li>
              <li><a href="/privacy-policy" className="hover:text-white text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">📧 contact@payrader.space</p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs border-t border-gray-700 pt-4 mt-8">
          &copy; {new Date().getFullYear()} PayRadar. All rights reserved.
        </div>
      </footer>
    </>
  );
}

const tools = [
  {
    title: "Compound Interest Calculator",
    href: "/compound-interest",
    icon: "🔢",
    description: "See how your money can grow on its own over time. Just enter how much you have, how often you add money, and the interest rate.",
  },
  {
    title: "Loan Repayment Calculator",
    href: "/loan-repayment",
    icon: "💸",
    description: "Understand how long it’ll take to repay a loan. Enter the loan amount, interest rate, and monthly payment to track your payoff plan.",
  },
  {
    title: "Budget Planner",
    href: "/budget-planner",
    icon: "🧾",
    description: "Track where your money goes each month. Input income and expenses to see your full financial picture and find ways to save.",
  },
  {
    title: "Retirement Savings Calculator",
    href: "/retirement-savings",
    icon: "🏖️",
    description: "Check if you’re saving enough for retirement. Enter your age, savings, and target to see if you’re on track for the future.",
  },
  {
    title: "Credit Card Payoff Calculator",
    href: "/credit-card-payoff",
    icon: "💳",
    description: "Calculate how long it will take to pay off your credit card. Enter your balance and payments to reduce interest and get debt-free.",
  },
  {
    title: "Savings Goal Tracker",
    href: "/savings-goal",
    icon: "🎯",
    description: "Set a savings goal and track progress. Whether it’s for a trip or a car, this tool keeps you motivated and focused.",
  },
  {
    title: "401(k) Contribution Estimator",
    href: "/401k-contribution",
    icon: "📈",
    description: "Estimate how your 401(k) grows with regular contributions and employer match. A helpful tool for long-term financial planning.",
  },
  {
    title: "Mortgage Refinance Calculator",
    href: "/mortgage-refinance",
    icon: "🏠",
    description: "Compare your current mortgage with a new one. See potential monthly savings and long-term benefits if you refinance.",
  },
  {
    title: "Rent vs. Buy Calculator",
    href: "/rent-vs-buy",
    icon: "🏡",
    description: "Compare the cost of renting and buying a home. Helps you make a smart housing decision based on your budget.",
  },
  {
    title: "Home Affordability Calculator",
    href: "/home-affordability",
    icon: "💰",
    description: "Find out what home price fits your budget. Input income, bills, and savings to see what you can afford without stress.",
  },
];
