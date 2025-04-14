import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currencyCode: string, fractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}

export function numberToWords(num: number, currencyCode: string): string {
  if (num === 0) return "zero"

  const currencyNames = {
    USD: "dollars",
    EUR: "euros",
    GBP: "pounds",
    JPY: "yen",
    CNY: "yuan",
    INR: "rupees",
    CAD: "Canadian dollars",
    AUD: "Australian dollars",
    CHF: "Swiss francs",
    KRW: "won",
  }

  const currencyName = currencyNames[currencyCode] || "units"

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ]
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

  const numString = num.toFixed(2)
  const [dollars, cents] = numString.split(".")
  const numDollars = Number.parseInt(dollars)
  const numCents = Number.parseInt(cents)

  function convertLessThanOneThousand(num: number): string {
    if (num === 0) {
      return ""
    } else if (num < 20) {
      return ones[num]
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? "-" + ones[num % 10] : "")
    } else {
      return (
        ones[Math.floor(num / 100)] + " hundred" + (num % 100 !== 0 ? " " + convertLessThanOneThousand(num % 100) : "")
      )
    }
  }

  function convert(num: number): string {
    if (num === 0) {
      return "zero"
    }

    let result = ""

    if (num < 0) {
      result = "negative "
      num = Math.abs(num)
    }

    let snumber = num.toString()

    // pad with zeros
    while (snumber.length < 12) {
      snumber = "0" + snumber
    }

    // break the number into groups of 3 digits
    const billions = Number.parseInt(snumber.substring(0, 3))
    const millions = Number.parseInt(snumber.substring(3, 6))
    const thousands = Number.parseInt(snumber.substring(6, 9))
    const hundreds = Number.parseInt(snumber.substring(9, 12))

    if (billions) {
      result += convertLessThanOneThousand(billions) + " billion "
    }

    if (millions) {
      result += convertLessThanOneThousand(millions) + " million "
    }

    if (thousands) {
      result += convertLessThanOneThousand(thousands) + " thousand "
    }

    if (hundreds) {
      result += convertLessThanOneThousand(hundreds)
    }

    return result.trim()
  }

  let result = ""

  if (numDollars > 0) {
    result += convert(numDollars) + " " + currencyName
  }

  if (numCents > 0) {
    result += (numDollars > 0 ? " and " : "") + convert(numCents) + " " + (numCents === 1 ? "cent" : "cents")
  }

  return result
}
