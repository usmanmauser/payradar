// File: /payradar/pages/mortgage-calculator.js

import { useState } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [loanTerm, setLoanTerm] = useState('30')
  const [interestRate, setInterestRate] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [amortization, setAmortization] = useState([])

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment)
    const rate = parseFloat(interestRate) / 100 / 12
    const n = parseInt(loanTerm) * 12

    if (isNaN(principal) || isNaN(rate) || isNaN(n)) {
      alert('Please enter valid inputs')
      return
    }

    const monthly = (principal * rate) / (1 - Math.pow(1 + rate, -n))
    setMonthlyPayment(monthly.toFixed(2))

    let balance = principal
    let amortData = []

    for (let i = 1; i <= n; i++) {
      const interest = balance * rate
      const principalPaid = monthly - interest
      balance -= principalPaid
      amortData.push({
        month: i,
        balance: +balance.toFixed(2),
        principalPaid: +principalPaid.toFixed(2),
        interestPaid: +interest.toFixed(2)
      })
    }

    setAmortization(amortData)
  }

  return (
    <>
      <Head>
        <title>Mortgage Calculator - PayRadar</title>
        <meta name="description" content="Estimate your monthly mortgage payments with our easy-to-use mortgage calculator. Includes amortization chart and detailed breakdown." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mortgage Calculator - PayRadar" />
        <meta property="og:description" content="Estimate monthly mortgage payments with interest breakdown. Easy to use and U.S. mortgage friendly." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Mortgage Calculator</h1>
        <p className="text-gray-700 mb-6">Calculate your estimated monthly mortgage payments based on the home price, loan term, and interest rate.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input type="number" className="input" placeholder="Home Price ($)" value={homePrice} onChange={e => setHomePrice(e.target.value)} />
          <input type="number" className="input" placeholder="Down Payment ($)" value={downPayment} onChange={e => setDownPayment(e.target.value)} />
          <input type="number" className="input" placeholder="Loan Term (Years)" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
          <input type="number" className="input" placeholder="Interest Rate (%)" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
        </div>

        <button onClick={calculateMortgage} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Calculate Mortgage
        </button>

        {monthlyPayment && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Results</h2>
            <p className="text-gray-800">Monthly Payment: <strong>$ {monthlyPayment}</strong></p>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={amortization}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" name="Remaining Balance" />
                  <Line type="monotone" dataKey="principalPaid" stroke="#10b981" name="Principal Paid" />
                  <Line type="monotone" dataKey="interestPaid" stroke="#f59e0b" name="Interest Paid" />
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
