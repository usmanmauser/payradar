// pages/CompoundInterest.js
import { useState } from 'react';
import Head from 'next/head';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
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

  const freqMap = {
    monthly: 12,
    quarterly: 4,
    halfyearly: 2,
    yearly: 1,
  };

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const tYears = parseInt(years || 0);
    const tMonths = parseInt(months || 0);
    const n = Number(compoundFreq);

    if (isNaN(p) || isNaN(r) || isNaN(n) || (tYears === 0 && tMonths === 0)) {
      alert('Please enter valid principal, rate, compounding frequency, and time.');
      return;
    }

    const totalYears = tYears + tMonths / 12;
    let amount = p;
    const data = [];
    const table = [];

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

    const finalAmount = amount.toFixed(2);
    setResult(finalAmount);
    setChartData(data);
    setTableData(table);

    fetch(`/api/number-to-words?amount=${finalAmount}&currency=${currency}`)
      .then((res) => res.text())
      .then(setResultWords)
      .catch(() => setResultWords(''));
  };

  const resetForm = () => {
    setPrincipal('');
    setRate('');
    setYears('');
    setMonths('');
    setCurrency('USD');
    setCompoundFreq(1);
    setAdditionalOption('none');
    setDepositAmount('');
    setDepositFreq('monthly');
    setWithdrawalAmount('');
    setWithdrawalFreq('monthly');
    setResult(null);
    setResultWords('');
    setChartData([]);
    setTableData([]);
  };

  return (
    <>
      <Head>
        <title>Compound Interest Calculator - PayRadar</title>
        <meta name="description" content="Calculate compound interest easily. Add deposits, withdrawals, pick compound frequency, and get chart + yearly breakdown." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Compound Interest Calculator - PayRadar" />
        <meta property="og:description" content="Easy compound interest calculator with charts, breakdowns, and smart options." />
        <meta property="og:type" content="website" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Compound Interest Calculator</h1>
        <p className="text-gray-700 mb-8">Figure out how your money grows with interest, including deposits, withdrawals, and custom timelines.</p>

        {/* Form inputs go here (not pasted again to save space) */}

        <button
          onClick={calculate}
          className="mt-6 bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
        >
          Calculate
        </button>

        <button
          onClick={resetForm}
          className="ml-4 mt-6 bg-gray-200 text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-300 transition"
        >
          Reset
        </button>

        {result && (
          <div className="mt-10 bg-green-50 p-5 rounded shadow">
            <h2 className="text-xl font-semibold text-green-900 mb-2">Results</h2>
            <p className="text-lg">Future Value: <strong>{currency} {result}</strong></p>
            {resultWords && <p className="text-gray-600 italic mb-4">{resultWords}</p>}

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>

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
      </main>
    </>
  );
}
