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
  const [years, setYears] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [resultWords, setResultWords] = useState('');

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseInt(years);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      alert('Please enter valid numbers');
      return;
    }

    let amount = p;
    const resultData = [];

    for (let i = 1; i <= t; i++) {
      amount *= 1 + r;
      resultData.push({ year: i, amount: +amount.toFixed(2) });
    }

    setData(resultData);
    setResult(amount.toFixed(2));

    fetch(`/api/number-to-words?amount=${amount}&currency=${currency}`)
      .then((res) => res.text())
      .then(setResultWords);
  };

  return (
    <>
      <Head>
        <title>Compound Interest Calculator - PayRadar</title>
        <meta
          name="description"
          content="Use our Compound Interest Calculator to estimate future returns on your investments. Multi-currency support and detailed charts included."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Compound Interest Calculator - PayRadar" />
        <meta
          property="og:description"
          content="Calculate compound interest with graphs, multi-currency support, and future value in words."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Compound Interest Calculator</h1>
        <p className="text-gray-700 mb-6">
          Calculate how your investment grows over time using compound interest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            className="input"
            placeholder="Principal Amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Annual Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
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

        <button
          onClick={calculate}
          className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Results</h2>
            <p className="text-gray-800">
              Future Value: <strong>{currency} {result}</strong>
            </p>
            <p className="text-gray-600 mt-1 italic">{resultWords}</p>

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

        {/* SEO Optimized Article */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">How to Use the Compound Interest Calculator</h2>
          <p className="text-gray-700 mb-4">
            Okay, let’s get one thing straight: this <strong>Compound Interest Calculator</strong> is here to help you <strong>see</strong> how your money can grow over time. We’re not throwing around crazy finance jargon — we’re keeping it simple, no stress. So, if you're thinking "what the heck is compound interest?" don’t worry, we’ve got you.  
            By the end of this, you'll know how to use this tool like a pro, even if you’ve never used a calculator like this before. Let’s dive in!
          </p>

          <h3 className="text-xl font-semibold mb-2">💸 What’s Your Initial Investment?</h3>
          <p className="text-gray-700 mb-4">
            This is just the money you're starting with — your <strong>“seed money”</strong>. It's the cash you're putting in now to watch it grow.
            <br /> <strong>For example:</strong> Let’s say you’ve got $1,000 in your savings account. That’s your <strong>initial investment</strong>.
            <br /> Just type in the amount you want to start with — easy. No need for dollar signs or commas, just the number (like 1000). Your <strong>initial investment</strong> is the base for all your growth. The more you start with, the more it can grow, especially with <strong>compound interest</strong>.
          </p>

          <h3 className="text-xl font-semibold mb-2">📈 Interest Rate: What’s That About?</h3>
          <p className="text-gray-700 mb-4">
            This is the rate at which your money earns interest. It's often called the <strong>rate of return</strong>, and it's the percentage your money will grow by each year.
            <br /> <strong>For example:</strong> - A savings account might offer you 2% per year. <br />
            - A fixed deposit could give you 5%. <br />
            - Stocks might give you 7–10% (but those are riskier).
            <br /> Just type the <strong>percentage</strong>. So if your interest rate is 5%, type <strong>5</strong>. 
            If you’re unsure, use <strong>7%</strong> — that's an average return you can expect from long-term investing.
          </p>

          <h3 className="text-xl font-semibold mb-2">🔄 Interest Frequency: How Often Does It Add Up?</h3>
          <p className="text-gray-700 mb-4">
            This is how often your money gets interest added to it. The more often, the better! That’s how <strong>compound interest</strong> works — it builds on itself.
            <br /> Options to choose from:
            <ul className="list-disc pl-6 mb-4">
              <li>Daily</li>
              <li>Weekly</li>
              <li>Monthly</li>
              <li>Annually</li>
            </ul>
            Pick the one that fits how your money grows. If you’re not sure, go with <strong>Annually</strong>. It’s the default setting.
          </p>

          <h3 className="text-xl font-semibold mb-2">🔄 Compounding Frequency: How Often Does the Interest Compound?</h3>
          <p className="text-gray-700 mb-4">
            This is similar to the interest frequency, but it’s how often your interest <strong>recalculates</strong>. So, if you have daily compounding, your interest is compounded every day.
            <br /> Pick what fits your situation. For most people, <strong>Yearly</strong> is a good starting point. But if you want to experiment, try <strong>Monthly</strong> or <strong>Daily</strong> to see how they affect your results.
          </p>

          <h3 className="text-xl font-semibold mb-2">🗓️ Timeline: How Long Are You Investing For?</h3>
          <p className="text-gray-700 mb-4">
            This is the duration you want to invest your money — how long you plan to let it grow. If you're saving for a vacation in 2 years, set the timeline to 2 years. If you’re thinking long-term, like for retirement, you might set it for 20 years or more.
            <br /> You can fill this in with either <strong>years</strong>, <strong>months</strong>, or both. So if you want 5 years and 6 months, you can set both fields to see exactly how long your money will be growing.
          </p>

          {/* Continue with the rest of the article... */}
        </section>
      </main>
    </>
  );
}
