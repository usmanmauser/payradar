import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

export default function LoanRepayment() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')
  const [data, setData] = useState([])
  const [summary, setSummary] = useState(null)

  const calculate = () => {
    const P = parseFloat(amount)
    const annualRate = parseFloat(rate) / 100
    const years = parseInt(term)

    if (isNaN(P) || isNaN(annualRate) || isNaN(years)) {
      return alert('Please enter valid numbers')
    }

    const n = years * 12
    const r = annualRate / 12
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    let balance = P
    let resultData = []
    let totalInterest = 0
    let totalPrincipal = 0

    for (let y = 1; y <= years; y++) {
      let interestPaid = 0
      let principalPaid = 0
      for (let m = 1; m <= 12; m++) {
        const interest = balance * r
        const principal = emi - interest
        balance -= principal
        interestPaid += interest
        principalPaid += principal
      }
      totalInterest += interestPaid
      totalPrincipal += principalPaid
      resultData.push({
        year: y,
        interest: +interestPaid.toFixed(2),
        principal: +principalPaid.toFixed(2)
      })
    }

    setSummary({
      monthlyEMI: emi.toFixed(2),
      totalPayment: (emi * n).toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      payoffYear: new Date().getFullYear() + years
    })

    setData(resultData)
  }

  return (
    <>
      <Head>
        <title>Loan Repayment Calculator - PayRadar</title>
        <meta name="description" content="Use our Loan Repayment Calculator to estimate your monthly payments, total interest, and loan cost. Visual breakdown included." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Loan Repayment Calculator - PayRadar" />
        <meta property="og:description" content="Find your monthly loan payments and see detailed interest/principal breakdown by year." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Loan Repayment Calculator</h1>
        <p className="text-gray-700 mb-6">
          Easily calculate your monthly loan payments with full breakdown of principal vs interest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input type="number" className="input" placeholder="Loan Amount (USD)" value={amount} onChange={e => setAmount(e.target.value)} />
          <input type="number" className="input" placeholder="Annual Interest Rate (%)" value={rate} onChange={e => setRate(e.target.value)} />
          <input type="number" className="input" placeholder="Loan Term (Years)" value={term} onChange={e => setTerm(e.target.value)} />
        </div>

        <button onClick={calculate} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Calculate
        </button>

        {summary && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Loan Summary</h2>
            <p className="text-gray-800">Monthly EMI: <strong>${summary.monthlyEMI}</strong></p>
            <p className="text-gray-800">Total Payment: <strong>${summary.totalPayment}</strong></p>
            <p className="text-gray-800">Total Interest: <strong>${summary.totalInterest}</strong></p>
            <p className="text-gray-800">Loan Payoff Year: <strong>{summary.payoffYear}</strong></p>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="principal" stroke="#10b981" name="Principal Paid" />
                  <Line type="monotone" dataKey="interest" stroke="#ef4444" name="Interest Paid" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Principal Paid</th>
                    <th className="px-4 py-2">Interest Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.year} className="border-t">
                      <td className="px-4 py-2">{row.year}</td>
                      <td className="px-4 py-2">${row.principal.toLocaleString()}</td>
                      <td className="px-4 py-2">${row.interest.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
