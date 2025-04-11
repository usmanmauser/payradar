import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>PayRadar - Smart Finance Calculators</title>
        <meta
          name="description"
          content="Explore powerful personal finance tools to plan your future. PayRadar helps you make smarter money decisions with easy-to-use calculators."
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Master Your Money with Smart Tools
        </h1>

        {/* Tool Categories */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              🧮 Compound Interest Calculator
            </h2>
            <p className="text-gray-700 mb-4">
              Find out how your savings grow over time with compound interest. Great for tracking long-term investments or setting savings goals.
            </p>
            <Link
              href="/compound-interest-calculator"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Use Tool →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              💳 Credit Card Payoff Calculator
            </h2>
            <p className="text-gray-700 mb-4">
              Learn how long it’ll take to pay off your credit card and how much interest you’ll pay. Enter your balance, interest rate, and payment.
            </p>
            <Link
              href="/credit-card-payoff-calculator"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Use Tool →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              🏠 Home Affordability Calculator
            </h2>
            <p className="text-gray-700 mb-4">
              Find out how much house you can afford based on your income, down payment, and monthly debt. Make smart home buying decisions.
            </p>
            <Link
              href="/home-affordability-calculator"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Use Tool →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              🔁 Mortgage Refinance Calculator
            </h2>
            <p className="text-gray-700 mb-4">
              See if refinancing your mortgage could save you money. Compare your current loan with a new one and find your monthly savings.
            </p>
            <Link
              href="/mortgage-refinance-calculator"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Use Tool →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
