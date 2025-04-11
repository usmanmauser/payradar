import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const currencies = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  INR: 'Indian Rupee',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  JPY: 'Japanese Yen',
  SGD: 'Singapore Dollar',
  ZAR: 'South African Rand',
  AED: 'UAE Dirham',
}

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [data, setData] = useState([])
  const [result, setResult] = useState(null)
  const [resultWords, setResultWords] = useState('')

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseInt(years)

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      alert('Please enter valid numbers')
      return
    }

    let amount = p
    const resultData = []

    for (let i = 1; i <= t; i++) {
      amount *= 1 + r
      resultData.push({ year: i, amount: +amount.toFixed(2) })
    }

    setData(resultData)
    setResult(amount.toFixed(2))

    fetch(`/api/number-to-words?amount=${amount}&currency=${currency}`)
      .then((res) => res.text())
      .then(setResultWords)
  }

  return (
    <>
      <Head>
        <title>Compound Interest Calculator - PayRadar</title>
        <meta
          name="description"
          content="Use our Compound Interest Calculator to estimate future returns on your investments. Multi-currency support and detailed charts included."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Compound Interest Calculator - PayRadar" />
        <meta
          property="og:description"
          content="Calculate compound interest with graphs, multi-currency support, and future value in words."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Compound Interest Calculator</h1>
        <p className="text-gray-700 mb-6">
          Calculate how your investment grows over time using compound interest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            className="input"
            placeholder="Principal Amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Annual Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
          <select
            className="input"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calculate}
          className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Results</h2>
            <p className="text-gray-800">
              Future Value: <strong>{currency} {result}</strong>
            </p>
            <p className="text-gray-600 mt-1 italic">{resultWords}</p>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
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
