import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to PayRadar</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Smart, beautiful, and user-first finance calculators to help you grow your wealth with confidence.
          </p>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md font-semibold">
            Ad Placeholder (Homepage Banner)
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Top Finance Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Replace these with actual links to your tools later */}
            <ToolCard title="Compound Interest" href="/tools/compound-interest" />
            <ToolCard title="Loan Calculator" href="/tools/loan-calculator" />
            <ToolCard title="Retirement Planner" href="/tools/retirement-planner" />
            <ToolCard title="Currency Converter" href="/tools/currency-converter" />
            <ToolCard title="EMI Calculator" href="/tools/emi-calculator" />
            <ToolCard title="Savings Goal" href="/tools/savings-goal" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ToolCard({ title, href }) {
  return (
    <a href={href} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition border border-gray-200">
      <h3 className="text-lg font-bold text-blue-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">Try this calculator</p>
    </a>
  )
}
