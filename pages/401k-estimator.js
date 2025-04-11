import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function K401Estimator() {
  const [age, setAge] = useState('')
  const [retireAge, setRetireAge] = useState('')
  const [salary, setSalary] = useState('')
  const [contribution, setContribution] = useState('')
  const [employerMatch, setEmployerMatch] = useState('')
  const [currentBalance, setCurrentBalance] = useState('')
  const [returnRate, setReturnRate] = useState('')
  const [growthRate, setGrowthRate] = useState('')
  const [result, setResult] = useState(null)
  const [data, setData] = useState([])

  const calculate401k = () => {
    const a = parseInt(age)
    const rAge = parseInt(retireAge)
    const yrs = rAge - a
    const s = parseFloat(salary)
    const c = parseFloat(contribution) / 100
    const m = parseFloat(employerMatch) / 100
    const b = parseFloat(currentBalance)
    const rr = parseFloat(returnRate) / 100
    const gr = parseFloat(growthRate) / 100

    if (isNaN(a) || isNaN(rAge) || isNaN(s) || isNaN(c) || isNaN(m) || isNaN(b) || isNaN(rr) || isNaN(gr)) {
      alert('Please enter all values correctly')
      return
    }

    let yearData = []
    let balance = b
    let currentSalary = s

    for (let i = 1; i <= yrs; i++) {
      const maxContribution = a + i >= 50 ? 30500 : 23000
      let employeeContribution = Math.min(currentSalary * c, maxContribution)
      let employerContribution = Math.min(currentSalary * m, maxContribution - employeeContribution)
      let totalContribution = employeeContribution + employerContribution

      balance = (balance + totalContribution) * (1 + rr)
      currentSalary *= (1 + gr)

      yearData.push({
        year: a + i,
        balance: +balance.toFixed(2)
      })
    }

    setData(yearData)
    setResult(balance.toFixed(2))
  }

  return (
    <>
      <Head>
        <title>401(k) Contribution Calculator - Maximize Your Retirement | PayRadar</title>
        <meta name="description" content="Accurately estimate your 401(k) growth with employer match, annual return, and salary increases. Plan your U.S. retirement smartly." />
        <meta property="og:title" content="401(k) Contribution Estimator - PayRadar" />
        <meta property="og:description" content="Plan your retirement with our 401(k) calculator. Factor in salary growth, employer match, and compound returns." />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">401(k) Contribution Estimator</h1>
        <p className="text-gray-700 mb-6">Estimate how your retirement savings can grow with annual contributions, employer match, and investment growth. All figures are in USD and follow U.S. IRS limits.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input type="number" className="input" placeholder="Current Age" value={age} onChange={e => setAge(e.target.value)} />
          <input type="number" className="input" placeholder="Retirement Age" value={retireAge} onChange={e => setRetireAge(e.target.value)} />
          <input type="number" className="input" placeholder="Annual Salary ($)" value={salary} onChange={e => setSalary(e.target.value)} />
          <input type="number" className="input" placeholder="Your Contribution %" value={contribution} onChange={e => setContribution(e.target.value)} />
          <input type="number" className="input" placeholder="Employer Match %" value={employerMatch} onChange={e => setEmployerMatch(e.target.value)} />
          <input type="number" className="input" placeholder="Current 401(k) Balance ($)" value={currentBalance} onChange={e => setCurrentBalance(e.target.value)} />
          <input type="number" className="input" placeholder="Expected Annual Return (%)" value={returnRate} onChange={e => setReturnRate(e.target.value)} />
          <input type="number" className="input" placeholder="Annual Salary Growth Rate (%)" value={growthRate} onChange={e => setGrowthRate(e.target.value)} />
        </div>

        <button onClick={calculate401k} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Estimate 401(k)
        </button>

        {result && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Estimated Retirement Savings</h2>
            <p className="text-gray-800">Final 401(k) Balance: <strong>${result}</strong></p>

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
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
