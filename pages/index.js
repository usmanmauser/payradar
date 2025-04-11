// pages/index.js

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>PayRadar | Smart Financial Tools</title>
        <meta name="description" content="Use free professional tools for budgeting, loans, savings, and more. Trusted by smart money makers." />
        <meta name="keywords" content="finance tools, loan calculator, budget planner, mortgage, retirement, savings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-gray-50 min-h-screen text-gray-900">
        {/* Navigation */}
        <header className="w-full py-6 px-4 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">PayRadar</h1>
            <nav className="space-x-6 text-sm font-medium text-gray-700">
              <Link href="/">Home</Link>
              <Link href="/tools">Tools</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How PayRadar Works</h2>
              <p className="text-lg text-gray-700 mb-4">
                PayRadar offers 10+ powerful financial tools built for smarter decisions. From mortgage estimates to budgeting — we have you covered.
              </p>
              <p className="text-lg text-gray-700">
                Just pick a tool, input your numbers, and see accurate insights instantly. No login, no cost.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                <div className="text-indigo-600 text-3xl mb-4">🧰</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Choose a Tool</h3>
                <p className="text-gray-600 text-sm">Pick a calculator tailored to your financial need.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                <div className="text-indigo-600 text-3xl mb-4">🧾</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Input Your Info</h3>
                <p className="text-gray-600 text-sm">Easy forms with no data saved or tracked.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                <div className="text-indigo-600 text-3xl mb-4">📊</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">See Instant Results</h3>
                <p className="text-gray-600 text-sm">Visual breakdowns to help you take action.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                <div className="text-indigo-600 text-3xl mb-4">🚀</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Make Smart Moves</h3>
                <p className="text-gray-600 text-sm">Use the data to improve your financial life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 py-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} PayRadar. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="hover:underline mx-2">Privacy</Link>
            <Link href="/terms" className="hover:underline mx-2">Terms</Link>
            <a href="mailto:hello@payradar.com" className="hover:underline mx-2">Contact</a>
          </div>
        </footer>
      </main>
    </>
  );
}
