import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PayRadar | Advanced Compound Interest Calculator",
  description:
    "Calculate how your investments grow over time with our advanced compound interest calculator. Customize with deposits, withdrawals, and different compounding frequencies.",
  keywords:
    "compound interest calculator, investment calculator, compounding interest calculator, financial planning tools",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Logo />
                <nav className="hidden md:flex items-center space-x-6">
                  <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link
                    href="/how-to-use-calculator"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    How to Use
                  </Link>
                  <Link
                    href="/how-compound-interest-works"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Learn
                  </Link>
                  <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                    Contact
                  </Link>
                  <Link
                    href="https://ko-fi.com/usmanibrahimmauser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white bg-[#00bfa5] hover:bg-[#00bfa5]/90 px-3 py-2 rounded-md transition-colors"
                  >
                    Support Me
                  </Link>
                </nav>
                <div className="md:hidden">
                  <MobileNav />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <Script id="kofi-widget" strategy="afterInteractive">
          {`
            (function kofiSetup() {
              const script = document.createElement('script');
              script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
              script.onload = function() {
                if (typeof kofiWidgetOverlay !== 'undefined') {
                  kofiWidgetOverlay.draw('usmanibrahimmauser', {
                    'type': 'floating-chat',
                    'floating-chat.donateButton.text': 'Support me',
                    'floating-chat.donateButton.background-color': '#00bfa5',
                    'floating-chat.donateButton.text-color': '#fff'
                  });
                }
              };
              document.body.appendChild(script);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}

function MobileNav() {
  return (
    <div className="relative">
      <details className="group [&[open]>summary::after]:rotate-180">
        <summary className="list-none cursor-pointer">
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </div>
        </summary>
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="p-2">
            <Link href="/" className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
              Home
            </Link>
            <Link
              href="/how-to-use-calculator"
              className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              How to Use
            </Link>
            <Link
              href="/how-compound-interest-works"
              className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Learn
            </Link>
            <Link href="/about" className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
              About
            </Link>
            <Link
              href="/contact"
              className="block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Contact
            </Link>
            <Link
              href="https://ko-fi.com/usmanibrahimmauser"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-4 py-2 text-sm bg-[#00bfa5] text-white mt-2"
            >
              Support Me
            </Link>
          </div>
        </div>
      </details>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="large" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Advanced compound interest calculator to help you plan your investments and see your money grow.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Calculator</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Compound Interest Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-use-calculator"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  How to Use Our Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/how-compound-interest-works"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  How Compound Interest Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-sm text-muted-foreground mb-4">Have questions or feedback?</p>
            <div className="space-y-3">
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contact Us
              </Link>
              <div>
                <Link
                  href="https://ko-fi.com/usmanibrahimmauser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#00bfa5] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#00bfa5]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Support on Ko-fi
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PayRadar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


import './globals.css'