import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />

      {/* How It Works Section */}
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

      {/* Tool Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">🛠️ Tool Categories</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {[
              {
                title: "🔢 Compound Interest Calculator",
                description: "See how your money can grow on its own over time. Even small amounts can grow big if you leave them alone. Great for anyone starting to save money!",
                href: "/compound-interest"
              },
              {
                title: "💸 Loan Repayment Calculator",
                description: "This tool helps you understand how long it’ll take to pay back a loan. It shows how much interest you’ll pay and how to pay it off faster.",
                href: "/loan-repayment"
              },
              {
                title: "🧾 Budget Planner",
                description: "Plan your income and expenses easily. This tool shows you where your money goes and helps you save. It's simple and keeps you on track every month.",
                href: "/budget-planner"
              },
              {
                title: "🏖️ Retirement Savings Calculator",
                description: "Want to know if you’re saving enough for the future? This tool helps you see if you need to save more or if you’re doing okay for retirement.",
                href: "/retirement-savings"
              },
              {
                title: "💳 Credit Card Payoff Calculator",
                description: "Owe money on a credit card? This tool shows how long it takes to pay it off and how paying more saves you money. Helps you beat debt faster.",
                href: "/credit-card-payoff"
              },
              {
                title: "🎯 Savings Goal Tracker",
                description: "Saving for something big? Set your goal and track your progress. It tells you if you’re on track or need to save more. Super simple to use!",
                href: "/savings-goal"
              },
              {
                title: "📈 401(k) Contribution Estimator",
                description: "Want to grow your 401(k)? This tool shows how your savings and company match can add up over time. Start small and see big results later!",
                href: "/401k-contribution"
              },
              {
                title: "🏠 Mortgage Refinance Calculator",
                description: "Want a lower mortgage rate? This tool compares your current loan to a new one and shows how much you could save monthly and long term.",
                href: "/mortgage-refinance"
              },
              {
                title: "🏡 Rent vs. Buy Calculator",
                description: "Not sure whether to rent or buy? This tool compares the costs and helps you see which option saves more money over time. Clear and easy to use.",
                href: "/rent-vs-buy"
              },
              {
                title: "💰 Home Affordability Calculator",
                description: "Want to buy a house but not sure how much you can afford? This tool shows a home price that fits your budget without making life hard.",
                href: "/home-affordability"
              },
            ].map((tool, index) => (
              <Link key={index} href={tool.href}>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md cursor-pointer transition">
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-gray-700">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
