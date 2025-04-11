// File: pages/mortgage-refinance.js
import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MortgageRefinance() {
  const [currentBalance, setCurrentBalance] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [remainingYears, setRemainingYears] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [closingCosts, setClosingCosts] = useState('');
  const [monthlyTaxInsurance, setMonthlyTaxInsurance] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const balance = parseFloat(currentBalance);
    const cRate = parseFloat(currentRate) / 100 / 12;
    const rMonths = parseInt(remainingYears) * 12;
    const nRate = parseFloat(newRate) / 100 / 12;
    const nTerm = parseInt(newTerm) * 12;
    const costs = parseFloat(closingCosts || 0);
    const taxIns = parseFloat(monthlyTaxInsurance || 0);

    if (isNaN(balance) || isNaN(cRate) || isNaN(rMonths) || isNaN(nRate) || isNaN(nTerm)) {
      alert('Please enter valid values in all required fields.');
      return;
    }

    const currentPayment = balance * cRate / (1 - Math.pow(1 + cRate, -rMonths));
    const newLoanAmount = balance + costs;
    const newPayment = newLoanAmount * nRate / (1 - Math.pow(1 + nRate, -nTerm));

    const totalOld = currentPayment * rMonths;
    const totalNew = newPayment * nTerm;
    const savings = totalOld - totalNew;
    const monthlySavings = currentPayment - newPayment;
    const breakEven = monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : null;

    setResult({
      currentPayment: currentPayment.toFixed(2),
      newPayment: newPayment.toFixed(2),
      totalOld: totalOld.toFixed(2),
      totalNew: totalNew.toFixed(2),
      savings: savings.toFixed(2),
      breakEven,
      chartData: [
        { name: 'Current Loan', value: totalOld },
        { name: 'Refinanced Loan', value: totalNew }
      ]
    });
  };

  return (
    <>
      <Head>
        <title>Mortgage Refinance Calculator - PayRadar</title>
        <meta name="description" content="Use our Mortgage Refinance Calculator to evaluate monthly payments, total savings, and your break-even point. Make smarter refinancing decisions." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mortgage Refinance Calculator - PayRadar" />
        <meta property="og:description" content="Calculate your monthly mortgage payments before and after refinancing. See your total interest savings and breakeven point instantly." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Mortgage Refinance Calculator</h1>
        <p className="text-gray-700 mb-6">Estimate your monthly savings and see if refinancing your mortgage makes financial sense. Includes total interest comparison and break-even analysis.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input type="number" className="input" placeholder="Current Loan Balance ($)" value={currentBalance} onChange={e => setCurrentBalance(e.target.value)} />
          <input type="number" className="input" placeholder="Current Interest Rate (%)" value={currentRate} onChange={e => setCurrentRate(e.target.value)} />
          <input type="number" className="input" placeholder="Years Remaining" value={remainingYears} onChange={e => setRemainingYears(e.target.value)} />
          <input type="number" className="input" placeholder="New Interest Rate (%)" value={newRate} onChange={e => setNewRate(e.target.value)} />
          <input type="number" className="input" placeholder="New Loan Term (Years)" value={newTerm} onChange={e => setNewTerm(e.target.value)} />
          <input type="number" className="input" placeholder="Closing Costs ($)" value={closingCosts} onChange={e => setClosingCosts(e.target.value)} />
          <input type="number" className="input" placeholder="Monthly Tax & Insurance ($) (Optional)" value={monthlyTaxInsurance} onChange={e => setMonthlyTaxInsurance(e.target.value)} />
        </div>

        <button onClick={calculate} className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition">
          Calculate
        </button>

        {result && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Results</h2>
            <p className="text-gray-800">Current Monthly Payment: <strong>${result.currentPayment}</strong></p>
            <p className="text-gray-800">New Monthly Payment: <strong>${result.newPayment}</strong></p>
            <p className="text-gray-800 mt-2">Total Interest on Current Loan: <strong>${result.totalOld}</strong></p>
            <p className="text-gray-800">Total Interest on Refinanced Loan: <strong>${result.totalNew}</strong></p>
            <p className="text-gray-800">Total Savings: <strong>${result.savings}</strong></p>
            {result.breakEven && <p className="text-gray-800">Break-even Point: <strong>{result.breakEven} months</strong></p>}

            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#10b981" />
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
  );
}
