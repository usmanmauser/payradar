import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function SavingsGoalTracker() {
  const [goal, setGoal] = useState('')
  const [monthly, setMonthly] = useState('')
  const [months, setMonths] = useState(null)
  const [result, setResult] = useState('')

  const calculate = () => {
    const g = parseFloat(goal)
    const m = parseFloat(monthly)
    if (isNaN(g) || isNaN(m) || m === 0) {
      alert('Please enter valid numbers')
      return
    }
    const totalMonths = Math.ceil(g / m)
    setMonths(totalMonths)
    const years = Math.floor(totalMonths / 12)
    const remMonths = totalMonths % 12
    setResult(`${years} year(s) and ${remMonths} month(s) to reach your goal.`)
  }

  return (
    <>
      <Head>
        <title>Savings Goal Tracker - PayRadar</title>
        <meta name="description" content="Use our Savings Goal Tracker to calculate how many months or years it will take to reach your savings goal. Free and easy to use." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Savings Goal Tracker - PayRadar" />
        <meta property="og:description" content="Track your savings goals with PayRadar's easy-to-use calculator. Get a month-by-month breakdown and plan your future with confidence." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Savings Goal Tracker</h1>
        <p className="text-gray-700 mb-6">
          Find out how long it will take to reach your savings goal with monthly contributions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input type="number" className="input" placeholder="Savings Goal ($)" value={goal} onChange={e => setGoal(e.target.value)} />
          <input type="number" className="input" placeholder="Monthly Contribution ($)" value={monthly} onChange={e => setMonthly(e.target.value)} />
        </div>

        <button onClick={calculate} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Calculate
        </button>

        {months !== null && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Results</h2>
            <p className="text-gray-800">You will reach your goal in approximately <strong>{months} month(s)</strong>.</p>
            <p className="text-gray-600 mt-1 italic">{result}</p>
          </div>
        )}

        <div className="mt-10 bg-yellow-100 text-yellow-800 p-4 rounded text-center">
          Ad Placeholder (Tool Bottom)
        </div>
      </main>
      <Footer />
    </>
  )
}
