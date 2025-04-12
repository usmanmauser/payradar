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

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const tYears = parseInt(years || 0, 10);
    const tMonths = parseInt(months || 0, 10);
    const n = compoundMap[interestApplied] || 1;

    if (isNaN(p) || isNaN(r) || isNaN(tYears) || isNaN(tMonths) || (tYears === 0 && tMonths === 0)) {
      alert('Please fill in all required fields properly.');
      return;
    }

    const totalYears = tYears + tMonths / 12;
    let amount = p;
    const data = [];
    const table = [];

    for (let year = 1; year <= Math.ceil(totalYears); year++) {
      let deposits = 0;
      let withdrawals = 0;

      if (additionalOption === 'deposit' || additionalOption === 'both') {
        const freq = freqMap[depositFreq] || 0;
        deposits = parseFloat(depositAmount) ? (parseFloat(depositAmount) * freq) : 0;
        amount += deposits;
      }

      if (additionalOption === 'withdraw' || additionalOption === 'both') {
        const freq = freqMap[withdrawalFreq] || 0;
        withdrawals = parseFloat(withdrawalAmount) ? (parseFloat(withdrawalAmount) * freq) : 0;
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

    fetch(`/api/number-to-words?amount=${amount}&currency=${currency}`)
      .then((res) => res.text())
      .then(setResultWords);
  }

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

        <div className="space-y-5">
          <div>
            <label className="font-semibold">Currency</label>
            <select className="input w-full" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {Object.entries(currencies).map(([code, name]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Initial Investment</label>
            <p className="text-sm text-gray-600 mb-1">This is your starting amount — what you're investing right now.</p>
            <input type="number" className="input w-full" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 10000" />
          </div>

          <div>
            <label className="font-semibold">Interest Rate (%)</label>
            <p className="text-sm text-gray-600 mb-1">Annual rate of return. For example, bank FD rates, savings accounts, or even stock returns.</p>
            <input type="number" className="input w-full" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 7" />
          </div>

          <div>
            <label className="font-semibold">Interest Applied</label>
            <p className="text-sm text-gray-600 mb-1">Choose how often interest is added: daily, weekly, monthly, quarterly, or yearly.</p>
            <select className="input w-full" value={interestApplied} onChange={(e) => setInterestApplied(e.target.value)}>
              {Object.keys(compoundMap).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Compound Frequency</label>
            <p className="text-sm text-gray-600 mb-1">How often the money is being compounded. Ex: daily (365/year), monthly (12/year).</p>
            <select className="input w-full" onChange={(e) => setCompoundFreq(e.target.value)} value={compoundFreq}>
              <option value={365}>Daily (365/year)</option>
              <option value={52}>Weekly (52/year)</option>
              <option value={26}>Bi-weekly (26/year)</option>
              <option value={4}>Quarterly (4/year)</option>
              <option value={2}>Half-yearly (2/year)</option>
              <option value={1}>Yearly (1/year)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Timeline</label>
            <p className="text-sm text-gray-600 mb-1">For how long will your money stay invested?</p>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" className="input w-full" placeholder="Years" value={years} onChange={(e) => setYears(e.target.value)} />
              <input type="number" className="input w-full" placeholder="Months" value={months} onChange={(e) => setMonths(e.target.value)} />
            </div>
          </div>

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

          {(additionalOption === 'deposit' || additionalOption === 'both') && (
            <div>
              <label className="font-semibold">Deposit Amount</label>
              <div className="flex gap-3">
                <input type="number" className="input w-full" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                <select className="input" value={depositFreq} onChange={(e) => setDepositFreq(e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="halfyearly">Half-yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          )}

          {(additionalOption === 'withdraw' || additionalOption === 'both') && (
            <div>
              <label className="font-semibold">Withdrawal Amount</label>
              <div className="flex gap-3">
                <input type="number" className="input w-full" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} />
                <select className="input" value={withdrawalFreq} onChange={(e) => setWithdrawalFreq(e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="halfyearly">Half-yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          className="mt-6 bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-10 bg-green-50 p-5 rounded shadow">
            <h2 className="text-xl font-semibold text-green-900 mb-2">Results</h2>
            <p className="text-lg">Future Value: <strong>{currency} {result}</strong></p>
            <p className="text-gray-600 italic mb-4">{resultWords}</p>

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

        <div className="mt-12 bg-yellow-100 text-yellow-800 p-4 rounded text-center">
          Ad Placeholder (Tool Bottom)
        </div>

        {/* SEO Optimized Article */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">🤔 Compound Interest Explained Like You're 5 (But Smarter)</h2>
          <p className="text-gray-700 mb-4">
            If you're scratching your head wondering "What the heck is compound interest?"—don’t worry. You're not alone. Most people don’t really learn this stuff in school, but it’s one of the most powerful financial concepts you can understand.
          </p>
          <p className="text-gray-700 mb-4">
            So, let’s break it down in plain English.
          </p>

          <h3 className="text-xl font-semibold mb-2">What Is Compound Interest, Really?</h3>
          <p className="text-gray-700 mb-4">
            At its core, compound interest is interest that earns interest. Sounds weird, right? Let me explain.
          </p>
          <p className="text-gray-700 mb-4">
            Let’s say you put $1,000 into a savings account that earns 5% interest per year. After the first year, you’ll have $1,050 — that’s your $1,000 plus $50 in interest.
          </p>
          <p className="text-gray-700 mb-4">
            Now here’s where the magic happens: in year two, you earn interest not just on your original $1,000, but also on that $50 interest you made in year one.
          </p>
          <p className="text-gray-700 mb-4">
            So instead of getting another $50, you’ll get $52.50. It may not sound like a big deal, but over time, it snowballs. That snowball effect is compound interest.
          </p>

          <h3 className="text-xl font-semibold mb-2">How Is Compound Interest Calculated?</h3>
          <p className="text-gray-700 mb-4">
            Here’s the basic formula (don’t worry, I’ll explain it):
          </p>
          <p className="text-gray-700 mb-4">
            <code>A = P(1 + r/n)<sup>nt</sup></code>
          </p>
          <p className="text-gray-700 mb-4">
            Where:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>A</strong> = the amount of money you’ll have in the future</li>
            <li><strong>P</strong> = your starting amount (a.k.a. principal)</li>
            <li><strong>r</strong> = the annual interest rate (as a decimal — so 5% becomes 0.05)</li>
            <li><strong>n</strong> = how many times per year the interest compounds</li>
            <li><strong>t</strong> = how many years you let it grow</li>
          </ul>

          <h4 className="text-lg font-semibold mb-2">Real-Life Example:</h4>
          <p className="text-gray-700 mb-4">
            Let’s say you invest $5,000 at an interest rate of 6%, and it compounds monthly (that’s 12 times a year), and you leave it alone for 10 years.
          </p>
          <p className="text-gray-700 mb-4">
            Plug that into the formula:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>P</strong> = 5,000</li>
            <li><strong>r</strong> = 0.06</li>
            <li><strong>n</strong> = 12</li>
            <li><strong>t</strong> = 10</li>
          </ul>
          <p className="text-gray-700 mb-4">
            A = 5,000(1 + 0.06/12)<sup>12×10</sup><br />
            A = 5,000(1.005)^120<br />
            A ≈ $9,096.87
          </p>
          <p className="text-gray-700 mb-4">
            So, just by letting your money sit there and grow, you nearly double it over 10 years!
          </p>

          <h3 className="text-xl font-semibold mb-2">Why Is Compound Interest So Powerful?</h3>
          <p className="text-gray-700 mb-4">
            Because time does most of the work for you.
          </p>
          <p className="text-gray-700 mb-4">
            If you start saving early and consistently, compound interest turns small amounts into big piles of cash. Even if you’re not rich or super disciplined, time is your best friend here.
          </p>

          <h4 className="text-lg font-semibold mb-2">Here’s a simple comparison:</h4>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-700">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Person</th>
                  <th className="border border-gray-300 px-4 py-2">Starts Saving</th>
                  <th className="border border-gray-300 px-4 py-2">Saves Per Year</th>
                  <th className="border border-gray-300 px-4 py-2">Total Contributed</th>
                  <th className="border border-gray-300 px-4 py-2">Money at 65 (6% interest)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Emma</td>
                  <td className="border border-gray-300 px-4 py-2">Age 25</td>
                  <td className="border border-gray-300 px-4 py-2">$2,000</td>
                  <td className="border border-gray-300 px-4 py-2">$80,000</td>
                  <td className="border border-gray-300 px-4 py-2">~$372,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Jake</td>
                  <td className="border border-gray-300 px-4 py-2">Age 40</td>
                  <td className="border border-gray-300 px-4 py-2">$2,000</td>
                  <td className="border border-gray-300 px-4 py-2">$50,000</td>
                  <td className="border border-gray-300 px-4 py-2">~$142,000</td>
                </tr>
                {/* Continue with more rows if necessary */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}



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

      <div className="space-y-5">
        {/* Form Sections for Inputs */}
        {/* Add your form input components here as previously described */}
      </div>

      <button
        onClick={calculate}
        className="mt-6 bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-10 bg-green-50 p-5 rounded shadow">
          <h2 className="text-xl font-semibold text-green-900 mb-2">Results</h2>
          <p className="text-lg">Future Value: <strong>{currency} {result}</strong></p>
          <p className="text-gray-600 italic mb-4">{resultWords}</p>

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

      <div className="mt-12 bg-yellow-100 text-yellow-800 p-4 rounded text-center">
        Ad Placeholder (Tool Bottom)
      </div>

      {/* SEO Optimized Article */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
          🤔 Compound Interest Explained Like You're 5 (But Smarter)
        </h2>
        <p className="text-gray-700 mb-4">
          If you're scratching your head wondering "What the heck is compound interest?"—don’t worry. You're not alone. Most people don’t really learn this stuff in school, but it’s one of the most powerful financial concepts you can understand.
        </p>
        <p className="text-gray-700 mb-4">So, let’s break it down in plain English.</p>

        <h3 className="text-xl font-semibold mb-2">What Is Compound Interest, Really?</h3>
        <p className="text-gray-700 mb-4">
          At its core, compound interest is interest that earns interest. Sounds weird, right? Let me explain.
        </p>
        <p className="text-gray-700 mb-4">
          Let’s say you put $1,000 into a savings account that earns 5% interest per year. After the first year, you’ll have $1,050 — that’s your $1,000 plus $50 in interest.
        </p>
        <p className="text-gray-700 mb-4">
          Now here’s where the magic happens: in year two, you earn interest not just on your original $1,000, but also on that $50 interest you made in year one.
        </p>
        <p className="text-gray-700 mb-4">
          So instead of getting another $50, you’ll get $52.50. It may not sound like a big deal, but over time, it snowballs. That snowball effect is compound interest.
        </p>

        <h3 className="text-xl font-semibold mb-2">How Is Compound Interest Calculated?</h3>
        <p className="text-gray-700 mb-4">Here’s the basic formula (don’t worry, I’ll explain it):</p>
        <p className="text-gray-700 mb-4">
          <code>A = P(1 + r/n)<sup>nt</sup></code>
        </p>
        <p className="text-gray-700 mb-4">Where:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li><strong>A</strong> = the amount of money you’ll have in the future</li>
          <li><strong>P</strong> = your starting amount (a.k.a. principal)</li>
          <li><strong>r</strong> = the annual interest rate (as a decimal — so 5% becomes 0.05)</li>
          <li><strong>n</strong> = how many times per year the interest compounds</li>
          <li><strong>t</strong> = how many years you let it grow</li>
        </ul>

        <h4 className="text-lg font-semibold mb-2">Real-Life Example:</h4>
        <p className="text-gray-700 mb-4">
          Let’s say you invest $5,000 at an interest rate of 6%, and it compounds monthly (that’s 12 times a year), and you leave it alone for 10 years.
        </p>
        <p className="text-gray-700 mb-4">
          Plug that into the formula:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li><strong>P</strong> = 5,000</li>
          <li><strong>r</strong> = 0.06</li>
          <li><strong>n</strong> = 12</li>
          <li><strong>t</strong> = 10</li>
        </ul>
        <p className="text-gray-700 mb-4">
          A = 5,000(1 + 0.06/12)<sup>12×10</sup><br />
          A = 5,000(1.005)^120<br />
          A ≈ $9,096.87
        </p>
        <p className="text-gray-700 mb-4">
          So, just by letting your money sit there and grow, you nearly double it over 10 years!
        </p>

        <h3 className="text-xl font-semibold mb-2">Why Is Compound Interest So Powerful?</h3>
        <p className="text-gray-700 mb-4">
          Because time does most of the work for you.
        </p>
        <p className="text-gray-700 mb-4">
          If you start saving early and consistently, compound interest turns small amounts into big piles of cash. Even if you’re not rich or super disciplined, time is your best friend here.
        </p>

        <h4 className="text-lg font-semibold mb-2">Here’s a simple comparison:</h4>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Person</th>
                <th className="border border-gray-300 px-4 py-2">Starts Saving</th>
                <th className="border border-gray-300 px-4 py-2">Saves Per Year</th>
                <th className="border border-gray-300 px-4 py-2">Total Contributed</th>
                <th className="border border-gray-300 px-4 py-2">Money at 65 (6% interest)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Emma</td>
                <td className="border border-gray-300 px-4 py-2">Age 25</td>
                <td className="border border-gray-300 px-4 py-2">$2,000</td>
                <td className="border border-gray-300 px-4 py-2">$80,000</td>
                <td className="border border-gray-300 px-4 py-2">~$372,000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Jake</td>
                <td className="border border-gray-300 px-4 py-2">Age 40</td>
                <td className="border border-gray-300 px-4 py-2">$2,000</td>
                <td className="border border-gray-300 px-4 py-2">$50,000</td>
                <td className="border border-gray-300 px-4 py-2">~$142,000</td>
              </tr>
              {/* Continue with more rows if necessary */}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </>
);
