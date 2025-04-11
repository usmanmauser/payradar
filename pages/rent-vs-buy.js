// File: payradar/pages/rent-vs-buy.js
import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [mortgageRate, setMortgageRate] = useState('')
  const [mortgageTerm, setMortgageTerm] = useState(30)
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.2')
  const [maintenancePercent, setMaintenancePercent] = useState('1')
  const [homeAppreciation, setHomeAppreciation] = useState('3')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [rentGrowth, setRentGrowth] = useState('3')
  const [investmentReturn, setInvestmentReturn] = useState('5')
  const [years, setYears] = useState(10)

  const [data, setData] = useState([])
  const [summary, setSummary] = useState(null)

  const calculate = () => {
    const hp = parseFloat(homePrice)
    const dp = parseFloat(downPayment)
    const mr = parseFloat(mortgageRate) / 100 / 12
    const termMonths = parseInt(mortgageTerm) * 12
    const pt = parseFloat(propertyTaxRate) / 100
    const maint = parseFloat(maintenancePercent) / 100
    const app = parseFloat(homeAppreciation) / 100
    const rent = parseFloat(monthlyRent)
    const rentInflation = parseFloat(rentGrowth) / 100
    const investReturn = parseFloat(investmentReturn) / 100 / 12
    const duration = parseInt(years)

    if ([hp, dp, mr, pt, maint, app, rent, rentInflation, investReturn].some(isNaN)) {
      alert('Please enter all fields correctly')
      return
    }

    let chartData = []
    let homeValue = hp
    let totalRent = 0
    let totalBuyingCost = dp
    let equity = dp
    let annualRent = rent * 12
    let mortgageBalance = hp - dp
    let totalPrincipalPaid = 0

    for (let year = 1; year <= duration; year++) {
      // Home appreciation
      homeValue = homeValue * (1 + app)

      // Rent cost
      totalRent += annualRent
      annualRent *= (1 + rentInflation)

      // Property taxes and maintenance
      const propTax = hp * pt
      const maintenance = hp * maint

      // Mortgage payments - simplified yearly interest + principal
      const monthlyPayment = (mr === 0) ? 0 : (mortgageBalance * mr) / (1 - Math.pow(1 + mr, -termMonths))
      const yearlyPayment = monthlyPayment * 12

      const interestPaid = mortgageBalance * (mr * 12)
      const principalPaid = yearlyPayment - interestPaid
      mortgageBalance = Math.max(mortgageBalance - principalPaid, 0)
      totalPrincipalPaid += principalPaid
      equity = dp + totalPrincipalPaid

      const yearlyBuyingCost = propTax + maintenance + interestPaid
      totalBuyingCost += yearlyBuyingCost

      chartData.push({
        year,
        Rent: parseFloat(totalRent.toFixed(2)),
        Buy: parseFloat(totalBuyingCost.toFixed(2))
      })
    }

    setSummary({
      totalRent: totalRent.toFixed(2),
      totalBuyingCost: totalBuyingCost.toFixed(2),
      homeValue: homeValue.toFixed(2),
      equity: equity.toFixed(2)
    })
    setData(chartData)
  }

  return (
    <>
      <Head>
        <title>Rent vs. Buy Calculator - PayRadar</title>
        <meta name="description" content="Compare the long-term cost of renting vs. buying a home in the U.S. Detailed breakdown with taxes, maintenance, mortgage, and home appreciation." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Rent vs. Buy Calculator - PayRadar" />
        <meta property="og:description" content="Compare renting and buying a home over time. Estimate your total costs and home equity." />
      </Head>

      <Header />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Rent vs. Buy Calculator</h1>
        <p className="text-gray-700 mb-6">
          Use this tool to determine whether renting or buying a home is more cost-effective over time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input" type="number" placeholder="Home Price ($)" value={homePrice} onChange={e => setHomePrice(e.target.value)} />
          <input className="input" type="number" placeholder="Down Payment ($)" value={downPayment} onChange={e => setDownPayment(e.target.value)} />
          <input className="input" type="number" placeholder="Mortgage Rate (%)" value={mortgageRate} onChange={e => setMortgageRate(e.target.value)} />
          <input className="input" type="number" placeholder="Mortgage Term (Years)" value={mortgageTerm} onChange={e => setMortgageTerm(e.target.value)} />
          <input className="input" type="number" placeholder="Property Tax Rate (%)" value={propertyTaxRate} onChange={e => setPropertyTaxRate(e.target.value)} />
          <input className="input" type="number" placeholder="Maintenance (% of home price/year)" value={maintenancePercent} onChange={e => setMaintenancePercent(e.target.value)} />
          <input className="input" type="number" placeholder="Annual Home Appreciation (%)" value={homeAppreciation} onChange={e => setHomeAppreciation(e.target.value)} />
          <input className="input" type="number" placeholder="Monthly Rent ($)" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)} />
          <input className="input" type="number" placeholder="Annual Rent Increase (%)" value={rentGrowth} onChange={e => setRentGrowth(e.target.value)} />
          <input className="input" type="number" placeholder="Investment Return on Savings (%)" value={investmentReturn} onChange={e => setInvestmentReturn(e.target.value)} />
          <input className="input" type="number" placeholder="Time Horizon (Years)" value={years} onChange={e => setYears(e.target.value)} />
        </div>

        <button className="mt-6 bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900" onClick={calculate}>
          Calculate
        </button>

        {summary && (
          <div className="mt-8 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
            <p>Total Rent Paid: <strong>${summary.totalRent}</strong></p>
            <p>Total Cost of Buying: <strong>${summary.totalBuyingCost}</strong></p>
            <p>Future Home Value: <strong>${summary.homeValue}</strong></p>
            <p>Home Equity Gained: <strong>${summary.equity}</strong></p>
          </div>
        )}

        {data.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-medium mb-2">Cost Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Rent" fill="#f59e0b" />
                <Bar dataKey="Buy" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
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
