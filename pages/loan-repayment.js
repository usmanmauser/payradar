import { useState } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
  AED: 'UAE Dirham'
}

export default function LoanRepayment() {
  const [loan, setLoan] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')
  const [frequency, setFrequency] = useState('monthly')
  const [currency, setCurrency] = useState('USD')
  const [emi, setEmi] = useState(null)
  const [totalInterest, setTotalInterest] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)
  const [chartData, setChartData] = useState([])
  const [resultWords, setResultWords] = useState('')

  const calculate = () => {
    const principal = parseFloat(loan)
    const annualRate = parseFloat(rate) / 100
    const years = parseInt(term)

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) return alert('Please enter valid numbers')

    const n = frequency === 'monthly' ? 12 : 1
    const r = annualRate / n
    const payments = years * n
    const emi = (principal * r * Math.pow(1 + r, payments)) / (Math.pow(1 + r, payments) - 1)

    const total = emi * payments
    const interest = total - principal

    setEmi(emi.toFixed(2))
    setTotalPayment(total.toFixed(2))
    setTotalInterest(interest.toFixed(2))

    const chart = []
    let balance = principal
    for (let i = 1; i <= payments; i++) {
      const interestPayment = balance * r
      const principalPayment = emi - interestPayment
      balance -= principalPayment
      chart.push({ payment: i, interest: parseFloat(interestPayment.toFixed(2)), principal: parseFloat(principalPayment.toFixed(2)) })
    }
    setChartData(chart)

    fetch(`/api/number-to-words?amount=${total}&currency=${currency}`)
      .then(res => res.text())
      .then(setResultWords)
  }

  return (
    <>
      <Head>
        <title>Loan Repayment Calculator - PayRadar</title>
        <meta name="description" content="Calculate monthly or yearly loan repayments with total interest and detailed chart. Easy-to-use loan EMI calculator with currency support." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Loan Repayment Calculator - PayRadar" />
        <meta property="og:description" content="Easy-to-use calculator to determine EMI, total payment, and interest for your loan. Multi-currency support and chart visualization included." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Loan Repayment Calculator</h1>
        <p className="text-gray-700 mb-6">
          Calculate your monthly or yearly loan payments. Get detailed breakdown of principal and interest over time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input type="number" className="input" placeholder="Loan Amount" value={loan} onChange={e => setLoan(e.target.value)} />
          <input type="number" className="input" placeholder="Annual Interest Rate (%)" value={rate} onChange={e => setRate(e.target.value)} />
          <input type="number" className="input" placeholder="Loan Term (Years)" value={term} onChange={e => setTerm(e.target.value)} />
          <select className="input" value={frequency} onChange={e => setFrequency(e.target.value)}>
            <option value="monthly">Monthly Payments</option>
            <option value="yearly">Yearly Payments</option>
          </select>
          <select className="input" value={currency} onChange={e => setCurrency(e.target.value)}>
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>{code} - {name}</option>
            ))}
          </select>
        </div>

        <button onClick={calculate} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Calculate
        </button>

        {emi && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Results</h2>
            <p className="text-gray-800">{frequency === 'monthly' ? 'Monthly EMI' : 'Yearly Payment'}: <strong>{currency} {emi}</strong></p>
            <p className="text-gray-800">Total Interest: <strong>{currency} {totalInterest}</strong></p>
            <p className="text-gray-800">Total Repayment: <strong>{currency} {totalPayment}</strong></p>
            <p className="text-gray-600 mt-1 italic">{resultWords}</p>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="payment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="principal" stackId="a" fill="#10b981" />
                  <Bar dataKey="interest" stackId="a" fill="#f59e0b" />
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

