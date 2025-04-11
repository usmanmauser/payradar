import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomeAffordability() {
  const [income, setIncome] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState('')
  const [monthlyDebts, setMonthlyDebts] = useState('')
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.25')
  const [insurance, setInsurance] = useState('')
  const [hoa, setHoa] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const annualIncome = parseFloat(income)
    const monthlyIncome = annualIncome / 12
    const debts = parseFloat(monthlyDebts) || 0
    const insuranceCost = parseFloat(insurance) || 0
    const hoaCost = parseFloat(hoa) || 0
    const taxRate = parseFloat(propertyTaxRate) / 100
    const rate = parseFloat(interestRate) / 100 / 12
    const numPayments = parseInt(loanTerm) * 12

    if (isNaN(annualIncome) || isNaN(rate) || isNaN(numPayments)) {
      alert('Please fill out all required fields correctly.')
      return
    }

    const maxDTI = 0.36
    const maxMonthlyPayment = monthlyIncome * maxDTI - debts

    // Estimate monthly cost including taxes, insurance, HOA
    let estimatedLoanAmount = maxMonthlyPayment
    for (let i = 0; i < 5; i++) {
      const mortgage = (estimatedLoanAmount * rate) / (1 - Math.pow(1 + rate, -numPayments))
      const propertyTaxes = (estimatedLoanAmount * taxRate) / 12
      const totalMonthly = mortgage + propertyTaxes + insuranceCost + hoaCost
      const scale = maxMonthlyPayment / totalMonthly
      estimatedLoanAmount *= scale
    }

    const dp = parseFloat(downPayment) || 0
    const maxHomePrice = estimatedLoanAmount + dp
    setResult({ maxHomePrice: maxHomePrice.toFixed(2), estimatedLoanAmount: estimatedLoanAmount.toFixed(2) })
  }

  return (
    <>
      <Head>
        <title>Home Affordability Calculator - PayRadar</title>
        <meta name="description" content="Use our Home Affordability Calculator to determine how much house you can afford based on your income, debt, interest rate, taxes, and more. Designed for U.S. home buyers." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Home Affordability Calculator - PayRadar" />
        <meta property="og:description" content="Figure out how much home you can afford in the U.S. with our calculator. Includes income, debt, interest, down payment, taxes, and more." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Home Affordability Calculator</h1>
        <p className="text-gray-700 mb-6">
          Estimate how much home you can afford in the U.S. based on your income, down payment, debt, interest rate, and more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input type="number" className="input" placeholder="Annual Gross Income ($)" value={income} onChange={e => setIncome(e.target.value)} />
          <input type="number" className="input" placeholder="Down Payment ($)" value={downPayment} onChange={e => setDownPayment(e.target.value)} />
          <input type="number" className="input" placeholder="Loan Term (years)" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
          <input type="number" className="input" placeholder="Interest Rate (%)" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
          <input type="number" className="input" placeholder="Monthly Debts ($)" value={monthlyDebts} onChange={e => setMonthlyDebts(e.target.value)} />
          <input type="number" className="input" placeholder="Property Tax Rate (%)" value={propertyTaxRate} onChange={e => setPropertyTaxRate(e.target.value)} />
          <input type="number" className="input" placeholder="Monthly Insurance ($)" value={insurance} onChange={e => setInsurance(e.target.value)} />
          <input type="number" className="input" placeholder="HOA Fees (optional)" value={hoa} onChange={e => setHoa(e.target.value)} />
        </div>

        <button onClick={calculate} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Calculate
        </button>

        {result && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Estimated Affordability</h2>
            <p className="text-gray-800">Maximum Home Price: <strong>${result.maxHomePrice}</strong></p>
            <p className="text-gray-600">Estimated Loan Amount: <strong>${result.estimatedLoanAmount}</strong></p>
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
