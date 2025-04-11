import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function RetirementSavings() {
  const [currentAge, setCurrentAge] = useState('')
  const [retirementAge, setRetirementAge] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [data, setData] = useState([])
  const [finalAmount, setFinalAmount] = useState(null)

  const calculate = () => {
    const start = parseInt(currentAge)
    const end = parseInt(retirementAge)
    const monthly = parseFloat(monthlyContribution)
    const annualRate = parseFloat(annualReturn) / 100
    const initial = parseFloat(currentSavings)

    if (isNaN(start) || isNaN(end) || isNaN(monthly) || isNaN(annualRate) || isNaN(initial)) {
      alert('Please enter valid numbers')
      return
    }

    let savings = initial
    let resultData = []

    for (let age = start; age <= end; age++) {
      for (let month = 0; month < 12; month++) {
        savings += monthly
        savings *= 1 + annualRate / 12
      }
      resultData.push({ age, savings: +savings.toFixed(2) })
    }

    setData(resultData)
    setFinalAmount(savings.toFixed(2))
  }

  return (
    <>
      <Head>
        <title>Retirement Savings Calculator - PayRadar</title>
        <meta name="description" content="Plan your future with our U.S.-based Retirement Savings Calculator. Forecast your nest egg with compound growth and monthly contributions." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Retirement Savings Calculator - PayRadar" />
        <meta property="og:description" content="Forecast your retirement savings with charts and personalized inputs. U.S.-focused financial tool." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Retirement Savings Calculator</h1>
        <p className="text-gray-700 mb-6">
          Plan how much you'll have by retirement based on your monthly contributions, current savings, and expected annual return.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input type="number" className="input" placeholder="Current Age" value={currentAge} onChange={e => setCurrentAge(e.target.value)} />
          <input type="number" className="input" placeholder="Retirement Age" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} />
          <input type="number" className="input" placeholder="Monthly Contribution ($)" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
          <input type="number" className="input" placeholder="Expected Annual Return (%)" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} />
          <input type="number" className="input" placeholder="Current Savings ($)" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
        </div>

        <button onClick={calculate} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Calculate
        </button>

        {finalAmount && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Projection Summary</h2>
            <p className="text-gray-800">Estimated Savings at Age {retirementAge}: <strong>${finalAmount}</strong></p>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
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
