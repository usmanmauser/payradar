import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About PayRadar | Your Trusted Compound Interest Calculator",
  description:
    "Learn about PayRadar, the team behind the most advanced compound interest calculator. Our mission is to help you make smarter financial decisions.",
  keywords: "PayRadar, about us, compound interest calculator, investment calculator with deposits and withdrawals",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About PayRadar</h1>

      <div className="space-y-6 text-lg">
        <p>
          Hey there! We're the team behind PayRadar, and we're so glad you stopped by. We created this platform with one
          simple goal in mind: to help regular people like you make sense of your money without needing a finance
          degree.
        </p>

        <p>
          Let's be honest – financial planning can be overwhelming. Interest rates, compounding periods, investment
          strategies... it's a lot to wrap your head around. That's exactly why we built our{" "}
          <Link href="/" className="text-primary underline hover:no-underline">
            compound interest calculator
          </Link>{" "}
          and other tools – to make these concepts accessible to everyone.
        </p>

        <p>
          Our team consists of finance enthusiasts and tech lovers who believe that understanding how your money grows
          shouldn't be complicated. We've spent countless hours perfecting our calculators to ensure they're both
          powerful enough for detailed planning and simple enough for anyone to use.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>

        <p>
          We believe financial literacy should be available to everyone. Our mission is to provide free, easy-to-use
          financial tools that help you visualize the power of compound interest, plan your investments, and make
          informed decisions about your financial future.
        </p>

        <p>
          Whether you're saving for retirement, planning for college, or just trying to grow your wealth, we want to be
          the resource you turn to for clear, unbiased information and helpful tools.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Why Trust PayRadar?</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Our calculators are built with precision and accuracy as top priorities</li>
          <li>We regularly update our tools based on user feedback</li>
          <li>We don't sell financial products – our only goal is to provide helpful information</li>
          <li>We believe in transparency in everything we do</li>
        </ul>

        <p className="mt-8">
          We're constantly working to improve our tools and add new features. If you have suggestions or feedback, we'd
          love to hear from you! Drop us a line on our{" "}
          <Link href="/contact" className="text-primary underline hover:no-underline">
            contact page
          </Link>
          .
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">Try Our Compound Interest Calculator</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
