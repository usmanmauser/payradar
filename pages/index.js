// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">PayRadar</h1>
        <nav className="space-x-6">
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</span>
          </Link>
          <Link href="/tools">
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Tools</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">About</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
<section className="bg-white py-16 px-6 md:px-20">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">💡 How It Works</h2>
    <p className="text-gray-700 text-lg leading-relaxed">
      Managing money doesn’t have to be complicated. At <span className="font-semibold text-blue-600">PayRadar</span>, we’ve created 10 simple yet powerful financial tools that help you make smarter decisions every day — whether you’re saving, borrowing, budgeting, or buying a home.
      <br /><br />
      Start with our <strong>Compound Interest Calculator</strong> to see how your money can grow over time just by saving consistently. If you’re paying off a loan, the <strong>Loan Repayment Calculator</strong> helps you plan your payments and minimize interest.
      <br /><br />
      Struggling to track expenses? The <strong>Budget Planner</strong> lets you organize your income and spending so you know exactly where your money goes. Planning for the future? Our <strong>Retirement Savings Calculator</strong> estimates how much you’ll need to retire comfortably — and how to get there.
      <br /><br />
      Dealing with credit card debt? The <strong>Credit Card Payoff Calculator</strong> gives you a step-by-step plan to pay it off faster and save on interest. Want to build savings for a specific goal, like a vacation or emergency fund? Use our <strong>Savings Goal Tracker</strong> to stay motivated and on target.
      <br /><br />
      If you have a 401(k), the <strong>401(k) Contribution Estimator</strong> shows how increasing your contributions can impact your retirement nest egg.
      <br /><br />
      Thinking about buying a home? The <strong>Home Affordability Calculator</strong> tells you what kind of home you can realistically afford. Already own a home? Use our <strong>Mortgage Refinance Calculator</strong> to see if refinancing could save you money. Still deciding between renting and buying? Our <strong>Rent vs. Buy Calculator</strong> gives you the facts so you can choose what’s best for your situation.
      <br /><br />
      All of our tools are free, fast, and easy to use — no signup or downloads required. With PayRadar, you’re not just using calculators — you’re building confidence in every financial move you make.
    </p>
  </div>
</section>
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">🛠️ Tool Categories</h2>
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
      {/* Tool 1 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">🔢 Compound Interest Calculator</h3>
        <p className="text-gray-700">
          See how your money can grow on its own over time. Even small amounts can grow big if you leave them alone. Great for anyone starting to save money!
        </p>
      </div>

      {/* Tool 2 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">💸 Loan Repayment Calculator</h3>
        <p className="text-gray-700">
          This tool helps you understand how long it’ll take to pay back a loan. It shows how much interest you’ll pay and how to pay it off faster.
        </p>
      </div>

      {/* Tool 3 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">🧾 Budget Planner</h3>
        <p className="text-gray-700">
          Plan your income and expenses easily. This tool shows you where your money goes and helps you save. It's simple and keeps you on track every month.
        </p>
      </div>

      {/* Tool 4 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">🏖️ Retirement Savings Calculator</h3>
        <p className="text-gray-700">
          Want to know if you’re saving enough for the future? This tool helps you see if you need to save more or if you’re doing okay for retirement.
        </p>
      </div>

      {/* Tool 5 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">💳 Credit Card Payoff Calculator</h3>
        <p className="text-gray-700">
          Owe money on a credit card? This tool shows how long it takes to pay it off and how paying more saves you money. Helps you beat debt faster.
        </p>
      </div>

      {/* Tool 6 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">🎯 Savings Goal Tracker</h3>
        <p className="text-gray-700">
          Saving for something big? Set your goal and track your progress. It tells you if you’re on track or need to save more. Super simple to use!
        </p>
      </div>

      {/* Tool 7 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">📈 401(k) Contribution Estimator</h3>
        <p className="text-gray-700">
          Want to grow your 401(k)? This tool shows how your savings and company match can add up over time. Start small and see big results later!
        </p>
      </div>

      {/* Tool 8 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">🏠 Mortgage Refinance Calculator</h3>
        <p className="text-gray-700">
          Want a lower mortgage rate? This tool compares your current loan to a new one and shows how much you could save monthly and long term.
        </p>
      </div>

      {/* Tool 9 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">🏡 Rent vs. Buy Calculator</h3>
        <p className="text-gray-700">
          Not sure whether to rent or buy? This tool compares the costs and helps you see which option saves more money over time. Clear and easy to use.
        </p>
      </div>

      {/* Tool 10 */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-2">💰 Home Affordability Calculator</h3>
        <p className="text-gray-700">
          Want to buy a house but not sure how much you can afford? This tool shows a home price that fits your budget without making life hard.
        </p>
      </div>
    </div>
  </div>
</section>
