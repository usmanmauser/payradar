import { useState } from 'react'
import Head from 'next/head'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

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
  const [compFreq, setCompFreq] = useState(1)
  const [interestApplyFreq, setInterestApplyFreq] = useState('annually')
  const [years, setYears] = useState('')
  const [months, setMonths] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [additionalOption, setAdditionalOption] = useState('none')
  const [depositAmount, setDepositAmount] = useState('')
  const [depositFreq, setDepositFreq] = useState('yearly')
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [withdrawalFreq, setWithdrawalFreq] = useState('yearly')
  const [data, setData] = useState([])
  const [result, setResult] = useState(null)
  const [resultWords, setResultWords] = useState('')

  const freqMap = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    quarterly: 4,
    halfyearly: 2,
    yearly: 1,
  }

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const y = parseInt(years) || 0
    const m = parseInt(months) || 0
    const totalYears = y + m / 12

    if (isNaN(p) || isNaN(r) || totalYears <= 0) {
      alert('Please enter valid values for investment, interest rate, and time.')
      return
    }

    let amount = p
    const breakdown = []

    for (let i = 1; i <= totalYears * compFreq; i++) {
      amount *= 1 + r / compFreq

      if (additionalOption === 'deposit' || additionalOption === 'both') {
        if (i % (compFreq / freqMap[depositFreq]) === 0) {
          amount += parseFloat(depositAmount || 0)
        }
      }

      if (additionalOption === 'withdrawal' || additionalOption === 'both') {
        if (i % (compFreq / freqMap[withdrawalFreq]) === 0) {
          amount -= parseFloat(withdrawalAmount || 0)
        }
      }

      if (i % compFreq === 0) {
        breakdown.push({
          year: i / compFreq,
          amount: +amount.toFixed(2),
        })
      }
    }

    setData(breakdown)
    setResult(amount.toFixed(2))

    fetch(`/api/number-to-words?amount=${amount}&currency=${currency}`)
      .then((res) => res.text())
      .then(setResultWords)
  }

  return (
    <>
      <Head>
        <title>Smart Compound Interest Calculator | PayRadar</title>
        <meta
          name="description"
          content="Get accurate growth forecasts for your investments. Try our compound interest calculator with timeline, deposits, withdrawals, and flexible frequency options."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Smart Compound Interest Calculator | PayRadar" />
        <meta
          property="og:description"
          content="Estimate your investment growth with our compound interest calculator. Add deposits, withdrawals, and see visual charts with yearly breakdown."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Compound Interest Calculator</h1>
        <p className="text-gray-700 mb-6">
          Let’s figure out how fast your money can grow over time with smart compounding. You can even add deposits or withdrawals to see real scenarios.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-semibold mb-1">Initial Investment</label>
            <p className="text-sm text-gray-600 mb-2">The amount you’re starting with in your investment journey.</p>
            <input
              type="number"
              className="input"
              placeholder="Enter amount"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Interest Rate (%)</label>
            <p className="text-sm text-gray-600 mb-2">This is how fast your money grows—think savings account, FD, stocks etc.</p>
            <input
              type="number"
              className="input"
              placeholder="e.g. 7"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Interest Applied</label>
            <p className="text-sm text-gray-600 mb-2">Choose how often interest is added to your investment.</p>
            <select
              className="input"
              value={interestApplyFreq}
              onChange={(e) => setInterestApplyFreq(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
              <option value="none">Off</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Compound Frequency</label>
            <p className="text-sm text-gray-600 mb-2">How often your interest gets added back in (compounded). E.g., yearly, monthly etc.</p>
            <select
              className="input"
              value={compFreq}
              onChange={(e) => setCompFreq(parseInt(e.target.value))}
            >
              <option value={365}>Daily (365/year)</option>
              <option value={52}>Weekly (52/year)</option>
              <option value={26}>Bi-weekly (26/year)</option>
              <option value={4}>Quarterly (4/year)</option>
              <option value={2}>Half-yearly (2/year)</option>
              <option value={1}>Yearly (1/year)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Investment Duration</label>
            <p className="text-sm text-gray-600 mb-2">How long you’re planning to keep the money invested.</p>
            <div className="flex gap-2">
              <input
                type="number"
                className="input"
                placeholder="Years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
              <input
                type="number"
                className="input"
                placeholder="Months"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Currency</label>
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

          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">Additional Situations</label>
            <p className="text-sm text-gray-600 mb-2">Want to add extra money or withdraw during the investment period? Choose below.</p>
            <select
              className="input"
              value={additionalOption}
              onChange={(e) => setAdditionalOption(e.target.value)}
            >
              <option value="none">None</option>
              <option value="deposit">Only Deposits</option>
              <option value="withdrawal">Only Withdrawals</option>
              <option value="both">Both</option>
            </select>
          </div>

          {(additionalOption === 'deposit' || additionalOption === 'both') && (
            <div>
              <label className="block font-semibold mb-1">Deposit Amount</label>
              <input
                type="number"
                className="input"
                placeholder="e.g. 100"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <select
                className="input mt-2"
                value={depositFreq}
                onChange={(e) => setDepositFreq(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="halfyearly">Half Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}

          {(additionalOption === 'withdrawal' || additionalOption === 'both') && (
            <div>
              <label className="block font-semibold mb-1">Withdrawal Amount</label>
              <input
                type="number"
                className="input"
                placeholder="e.g. 50"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
              />
              <select
                className="input mt-2"
                value={withdrawalFreq}
                onChange={(e) => setWithdrawalFreq(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="halfyearly">Half Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-10 bg-green-50 p-5 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Final Results</h2>
            <p className="text-gray-800">
              Total Future Value: <strong>{currency} {result}</strong>
            </p>
            <p className="text-gray-600 italic mt-1">{resultWords}</p>

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
    </>
  )
}
