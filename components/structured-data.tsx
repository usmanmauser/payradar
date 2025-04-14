export function CompoundInterestCalculatorStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "PayRadar Compound Interest Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Calculate how your investments grow over time with our advanced compound interest calculator. Customize with deposits, withdrawals, and different compounding frequencies.",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "127",
          },
        }),
      }}
    />
  )
}

export function ArticleStructuredData({ title, description, datePublished, dateModified, imageUrl }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: description,
          image: imageUrl,
          datePublished: datePublished,
          dateModified: dateModified,
          author: {
            "@type": "Organization",
            name: "PayRadar",
            url: "https://payradar.space/about",
          },
          publisher: {
            "@type": "Organization",
            name: "PayRadar",
            logo: {
              "@type": "ImageObject",
              url: "https://payradar.space/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://payradar.space/how-compound-interest-works",
          },
        }),
      }}
    />
  )
}

export function FAQStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is compound interest?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Compound interest is interest calculated on the initial principal and also on the accumulated interest over previous periods. It's essentially 'interest on interest,' which makes your money grow faster than simple interest.",
              },
            },
            {
              "@type": "Question",
              name: "How does the compound interest calculator work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our calculator uses the compound interest formula A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the number of times interest is compounded per year, and t is the time in years. It also accounts for additional deposits and withdrawals.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between different compounding frequencies?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Compounding frequency refers to how often interest is calculated and added to your principal. Options include daily (365/year), weekly (52/year), monthly (12/year), quarterly (4/year), and annually (1/year). More frequent compounding results in slightly higher returns over time.",
              },
            },
            {
              "@type": "Question",
              name: "How do additional deposits affect compound interest?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Regular deposits significantly increase your investment growth over time. Each deposit begins earning interest immediately, creating multiple streams of compound growth. Even small regular contributions can dramatically increase your final balance over long periods.",
              },
            },
          ],
        }),
      }}
    />
  )
}
