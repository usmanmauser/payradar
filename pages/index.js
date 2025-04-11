// pages/index.js
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PayRadar | Free Financial Calculators</title>
        <meta name="description" content="PayRadar offers free, smart, and user-friendly financial calculators to help you build wealth with confidence." />
        <meta name="keywords" content="finance calculators, compound interest calculator, loan calculator, retirement planner, savings goal, EMI, personal finance tools" />
        <meta name="author" content="PayRadar" />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-800">PayRadar</h1>
            <nav className="space-x-6">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/tools" className="hover:text-blue-600">Tools</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
            </nav>
          </div>
        </header>

        <section className="text-center py-16 bg-blue-50">
          <h2 className="text-4xl font-bold text-blue-800">Smart Financial Tools for Smarter Money Decisions</h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">Explore simple, beautiful, and powerful financial calculators designed to help you build wealth, save more, and plan better.</p>
          <div className="bg-yellow-100 border border-yellow-300 mt-6 mx-auto max-w-xl py-3 px-4 rounded-lg text-sm">
            Ad Placeholder (Homepage Banner)
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Top Finance Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.title} href={tool.path}>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200">
                  <h4 className="font-semibold text-blue-800 text-lg">{tool.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="bg-gray-100 text-center text-sm py-6">
          © {new Date().getFullYear()} PayRadar. All rights reserved.
        </footer>
      </main>
    </>
  );
}

const tools = [
  { title: "Compound Interest", path: "/compound-interest", description: "Calculate your future investments." },
  { title: "Loan Calculator", path: "/loan-repayment", description: "Plan your monthly loan payments." },
  { title: "Retirement Planner", path: "/retirement-savings", description: "Estimate your retirement savings." },
  { title: "Credit Card Payoff", path: "/credit-card-payoff", description: "Pay off debt faster." },
  { title: "Savings Goal", path: "/savings-goal", description: "Track and reach your savings goals." },
  { title: "EMI Calculator", path: "/emi-calculator", description: "Monthly installment planning." },
  { title: "Currency Converter", path: "/currency-converter", description: "Live exchange rates." },
  { title: "Home Affordability", path: "/home-affordability", description: "See what home you can afford." },
  { title: "Rent vs Buy", path: "/rent-vs-buy", description: "Compare renting and buying." },
  { title: "Mortgage Refinance", path: "/mortgage-refinance", description: "See if refinancing is worth it." },
];
