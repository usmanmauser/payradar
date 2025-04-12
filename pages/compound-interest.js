import { useState } from 'react';
import Head from 'next/head';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define the available currencies with their full names.
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
};

export default function CompoundInterest() {
  // State hooks for managing various form inputs and results.
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [interestApplied, setInterestApplied] = useState('annually');
  const [compoundFreq, setCompoundFreq] = useState(1);
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [currency, setCurrency] = useState('USD');

  const [additionalOption, setAdditionalOption] = useState('none');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositFreq, setDepositFreq] = useState('monthly');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalFreq, setWithdrawalFreq] = useState('monthly');

  const [result, setResult] = useState(null);
  const [resultWords, setResultWords] = useState('');
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  // Mapping for compound frequencies and additional deposit/withdrawal frequencies.
  const compoundMap = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    quarterly: 4,
    halfyearly: 2,
    annually: 1,
  };

  const freqMap = {
    monthly: 12,
    quarterly: 4,
    halfyearly: 2,
    yearly: 1,
  };

  // Calculate function to perform the interest and investment calculations.
  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const tYears = parseInt(years || 0, 10);
    const tMonths = parseInt(months || 0, 10);
    const n = parseInt(compoundFreq, 10);

    // Checking conditions before calculations to avoid invalid arithmetic operations.
    if (isNaN(p) || isNaN(r) || isNaN(n) || (tYears === 0 && tMonths === 0)) {
      alert('Please fill in all required fields properly.');
      return;
    }

    const totalYears = tYears + tMonths / 12;
    let amount = p;
    const data = [];
    const table = [];

    // Loop through each year to compute deposits, withdrawals and compound interest.
    for (let year = 1; year <= totalYears; year++) {
      let deposits = 0;
      let withdrawals = 0;

      if (additionalOption === 'deposit' || additionalOption === 'both') {
        const freq = freqMap[depositFreq] || 0;
        deposits = (parseFloat(depositAmount) || 0) * freq;
        amount += deposits;
      }

      if (additionalOption === 'withdraw' || additionalOption === 'both') {
        const freq = freqMap[withdrawalFreq] || 0;
        withdrawals = (parseFloat(withdrawalAmount) || 0) * freq;
        amount -= withdrawals;
      }

      amount *= Math.pow(1 + r / n, n);
      amount = Math.max(amount, 0);

      data.push({ year, amount: +amount.toFixed(2) });
      table.push({ year, deposits, withdrawals, value: +amount.toFixed(2) });
    }

    setResult(amount.toFixed(2));
    setChartData(data);
    setTableData(table);

    // Fetching the result in words for accessibility.
    fetch(`/api/number-to-words?amount=${amount}&currency=${currency}`)
      .then((res) => res.text())
      .then(setResultWords);
  };

  return (
    <>
      {/* Head section for setting the document head content */}
      <Head>
        <title>Compound Interest Calculator - PayRadar</title>
        <meta name="description" content="Calculate compound interest easily. Add deposits, withdrawals, pick compound frequency, and get chart + yearly breakdown." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Compound Interest Calculator - PayRadar" />
        <meta property="og:description" content="Easy compound interest calculator with charts, breakdowns, and smart options." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Main content area with form and calculation results */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Compound Interest Calculator</h1>
        <p className="text-gray-700 mb-8">Figure out how your money grows with interest, including deposits, withdrawals, and custom timelines.</p>

        {/* Form section for input fields and options */}
        <div className="space-y-5">
          <div>
            {/* Currency selection */}
            <label className="font-semibold">Currency</label>
            <select className="input w-full" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {Object.entries(currencies).map(([code, name]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          import { useState } from 'react';
import Head from 'next/head';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define the available currencies with their full names.
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
};

export default function CompoundInterest() {
  // State hooks for managing various form inputs and results.
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [interestApplied, setInterestApplied] = useState('annually');
  const [compoundFreq, setCompoundFreq] = useState(1);
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [currency, setCurrency] = useState('USD');

  const [additionalOption, setAdditionalOption] = useState('none');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositFreq, setDepositFreq] = useState('monthly');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalFreq, setWithdrawalFreq] = useState('monthly');

  const [result, setResult] = useState(null);
  const [resultWords, setResultWords] = useState('');
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  // Mapping for compound frequencies and additional deposit/withdrawal frequencies.
  const compoundMap = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    quarterly: 4,
    halfyearly: 2,
    annually: 1,
  };

  const freqMap = {
    monthly: 12,
    quarterly: 4,
    halfyearly: 2,
    yearly: 1,
  };

  // Calculate function to perform the interest and investment calculations.
  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const tYears = parseInt(years || 0, 10);
    const tMonths = parseInt(months || 0, 10);
    const n = parseInt(compoundFreq, 10);

    // Checking conditions before calculations to avoid invalid arithmetic operations.
    if (isNaN(p) || isNaN(r) || isNaN(n) || (tYears === 0 && tMonths === 0)) {
      alert('Please fill in all required fields properly.');
      return;
    }

    const totalYears = tYears + tMonths / 12;
    let amount = p;
    const data = [];
    const table = [];

    // Loop through each year to compute deposits, withdrawals and compound interest.
    for (let year = 1; year <= totalYears; year++) {
      let deposits = 0;
      let withdrawals = 0;

      if (additionalOption === 'deposit' || additionalOption === 'both') {
        const freq = freqMap[depositFreq] || 0;
        deposits = (parseFloat(depositAmount) || 0) * freq;
        amount += deposits;
      }

      if (additionalOption === 'withdraw' || additionalOption === 'both') {
        const freq = freqMap[withdrawalFreq] || 0;
        withdrawals = (parseFloat(withdrawalAmount) || 0) * freq;
        amount -= withdrawals;
      }

      amount *= Math.pow(1 + r / n, n);
      amount = Math.max(amount, 0);

      data.push({ year, amount: +amount.toFixed(2) });
      table.push({ year, deposits, withdrawals, value: +amount.toFixed(2) });
    }

    setResult(amount.toFixed(2));
    setChartData(data);
    setTableData(table);

    // Fetching the result in words for accessibility.
    fetch(`/api/number-to-words?amount=${amount}&currency=${currency}`)
      .then((res) => res.text())
      .then(setResultWords);
  };

  return (
    <>
      {/* Head section for setting the document head content */}
      <Head>
        <title>Compound Interest Calculator - PayRadar</title>
        <meta name="description" content="Calculate compound interest easily. Add deposits, withdrawals, pick compound frequency, and get chart + yearly breakdown." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Compound Interest Calculator - PayRadar" />
        <meta property="og:description" content="Easy compound interest calculator with charts, breakdowns, and smart options." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Main content area with form and calculation results */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Compound Interest Calculator</h1>
        <p className="text-gray-700 mb-8">Figure out how your money grows with interest, including deposits, withdrawals, and custom timelines.</p>

        {/* Form section for input fields and options */}
        <div className="space-y-5">
          <div>
            {/* Currency selection */}
            <label className="font-semibold">Currency</label>
            <select className="input w-full" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {Object.entries(currencies).map(([code, name]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          {/* Principal input */}
          <div>
            <label className="font-semibold">Initial Investment</label>
            <p className="text-sm text-gray-600 mb-1">This is your starting amount — what you're investing right now.</p>
            <input
              type="number"
              className="input w-full"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 10000"
            />
          </div>

          {/* Interest rate input */}
          <div>
            <label className="font-semibold">Interest Rate (%)</label>
            <p className="text-sm text-gray-600 mb-1">Annual rate of return. For example, bank FD rates, savings accounts, or even stock returns.</p>
            <input
              type="number"
              className="input w-full"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 7"
            />
          </div>

          {/* Interest application frequency */}
          <div>
            <label className="font-semibold">Interest Applied</label>
            <p className="text-sm text-gray-600 mb-1">Choose how often interest is added: daily, weekly, monthly, quarterly, or yearly.</p>
            <select className="input w-full" value={interestApplied} onChange={(e) => setInterestApplied(e.target.value)}>
              {Object.keys(compoundMap).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          {/* Compound frequency */}
          <div>
            <label className="font-semibold">Compound Frequency</label>
            <p className="text-sm text-gray-600 mb-1">How often the money is being compounded. Ex: daily (365/year), monthly (12/year).</p>
            <select
              className="input w-full"
              onChange={(e) => setCompoundFreq(parseInt(e.target.value, 10))}
              value={compoundFreq}
            >
              <option value={365}>Daily (365/year)</option>
              <option value={52}>Weekly (52/year)</option>
              <option value={26}>Bi-weekly (26/year)</option>
              <option value={4}>Quarterly (4/year)</option>
              <option value={2}>Half-yearly (2/year)</option>
              <option value={1}>Yearly (1/year)</option>
            </select>
          </div>

          {/* Time period inputs for years and months */}
          <div>
            <label className="font-semibold">Timeline</label>
            <p className="text-sm text-gray-600 mb-1">For how long will your money stay invested?</p>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className="input w-full"
                placeholder="Years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
              <input
                type="number"
                className="input w-full"
                placeholder="Months"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
            </div>
          </div>

          {/* Additional deposit/withdrawal options */}
          <div>
            <label className="font-semibold">Additional Situations</label>
            <p className="text-sm text-gray-600 mb-1">Want to add money regularly or take some out? Turn this on to explore that.</p>
            <select className="input w-full" value={additionalOption} onChange={(e) => setAdditionalOption(e.target.value)}>
              <option value="none">None</option>
              <option value="deposit">Deposits Only</option>
              <option value="withdraw">Withdrawals Only</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Conditional rendering for deposits */}
          {(additionalOption === 'deposit' || additionalOption === 'both') && (
            <div>
              <label className="font-semibold">Deposit Amount</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  className="input w-full"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <select className="input" value={depositFreq} onChange={(e) => setDepositFreq(e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="halfyearly">Half-yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          )}

          {/* Conditional rendering for withdrawals */}
          {(additionalOption === 'withdraw' || additionalOption === 'both') && (
            <div>
              <label className="font-semibold">Withdrawal Amount</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  className="input w-full"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
                <select className="input" value={withdrawalFreq} onChange={(e) => setWithdrawalFreq(e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="halfyearly">Half-yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          )}

          {/* Button to trigger the calculation */}
          <button
            onClick={calculate}
            className="mt-6 bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
          >
            Calculate
          </button>

          {/* Displaying the results */}
          {result && (
            <div className="mt-10 bg-green-50 p-5 rounded shadow">
              <h2 className="text-xl font-semibold text-green-900 mb-2">Results</h2>
              <p className="text-lg">Future Value: <strong>{currency} {result}</strong></p>
              <p className="text-gray-600 italic mb-4">{resultWords}</p>

              {/* Chart showing the data over time */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>

              {/* Table showing the detailed breakdown */}
              <div className="mt-8 overflow-auto">
                <table className="w-full border mt-4 text-sm">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-3 py-2 border">Year</th>
                      <th className="px-3 py-2 border">Deposits</th>
                      <th className="px-3 py-2 border">Withdrawals</th>
                      <th className="px-3 py-2 border">End Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => (
                      <tr key={row.year}>
                        <td className="px-3 py-1 border text-center">{row.year}</td>
                        <td className="px-3 py-1 border text-center">{currency} {row.deposits.toFixed(2)}</td>
                        <td className="px-3 py-1 border text-center">{currency} {row.withdrawals.toFixed(2)}</td>
                        <td className="px-3 py-1 border text-center">{currency} {row.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placeholder for ad or additional content */}
          <div className="mt-12 bg-yellow-100 text-yellow-800 p-4 rounded text-center">
            Ad Placeholder (Tool Bottom)
          </div>

          {/* SEO-optimized article content goes here, unchanged */}
          {/* ... */}
        </div>
      </main>
    </>
  );
}
