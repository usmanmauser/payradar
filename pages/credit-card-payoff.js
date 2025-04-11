import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CreditCardPayoff() {
  const [balance, setBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculatePayoff = () => {
    const balanceFloat = parseFloat(balance);
    const rateFloat = parseFloat(interestRate) / 100 / 12;
    const paymentFloat = parseFloat(monthlyPayment);

    if (isNaN(balanceFloat) || isNaN(rateFloat) || isNaN(paymentFloat)) {
      setError('Please enter valid numbers for all fields.');
      return;
    }

    if (paymentFloat <= balanceFloat * rateFloat) {
      setError('Monthly payment must be greater than monthly interest.');
      return;
    }

    setError('');
    let months = 0;
    let remaining = balanceFloat;
    let totalInterest = 0;

    while (remaining > 0) {
      const interest = remaining * rateFloat;
      const principal = paymentFloat - interest;
      remaining -= principal;
      totalInterest += interest;
      months++;
      if (months > 600) break; // prevent infinite loops
    }

    const years = Math.floor(months / 12);
    const leftoverMonths = months % 12;

    setResult({ months, years, leftoverMonths, totalInterest: totalInterest.toFixed(2) });
  };

  return (
    <>
      <Head>
        <title>Credit Card Payoff Calculator - PayRadar</title>
        <meta name="description" content="Use our free Credit Card Payoff Calculator to estimate how long it will take to pay off your credit card debt and how much interest you'll pay." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Credit Card Payoff Calculator - PayRadar" />
        <meta property="og:description" content="Enter your credit card balance, interest rate, and monthly payment to calculate your debt-free timeline and interest paid." />
        <meta property="og:type" content="website" />
      </Head>

      <Header />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Credit Card Payoff Calculator</h1>
        <p className="text-gray-700 mb-6">
          Want to get out of credit card debt faster? Use this calculator to see how long it'll take you to pay off your balance and how much you'll pay in interest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            className="input"
            placeholder="Current Balance ($)"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Interest Rate (APR %)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Monthly Payment ($)"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
          />
        </div>

        <button
          onClick={calculatePayoff}
          className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900 transition"
        >
          Calculate
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {result && (
          <div className="mt-8 bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Your Payoff Summary</h2>
            <p className="text-gray-800">It will take you <strong>{result.years}</strong> years and <strong>{result.leftoverMonths}</strong> months to pay off the debt.</p>
            <p className="text-gray-800">Total interest paid: <strong>${result.totalInterest}</strong></p>
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
