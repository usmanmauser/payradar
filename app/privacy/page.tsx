import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | PayRadar Compound Interest Calculator",
  description:
    "PayRadar's privacy policy explains how we collect, use, and protect your information when using our compound interest calculator.",
  keywords: "privacy policy, PayRadar privacy, compound interest calculator privacy, data protection",
}

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6">
        <p className="text-muted-foreground">Last Updated: April 14, 2025</p>

        <p>
          At PayRadar, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect
          your information when you use our website and services, including our{" "}
          <Link href="/" className="text-primary underline hover:no-underline">
            compound interest calculator
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">Information You Provide</h3>
        <p>
          Our calculators work without requiring you to create an account or provide personal information. However, if
          you choose to contact us, we may collect your email address and any other information you voluntarily provide.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Automatically Collected Information</h3>
        <p>When you visit our website, we automatically collect certain information about your device, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Time and date of your visit</li>
          <li>Pages you view</li>
          <li>Time spent on those pages</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>

        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Understand how users interact with our website</li>
          <li>Detect and prevent technical issues</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Monitor and analyze usage patterns and trends</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Similar Technologies</h2>

        <p>
          We use cookies and similar tracking technologies to track activity on our website and hold certain
          information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
        </p>

        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
          you do not accept cookies, you may not be able to use some portions of our service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>

        <p>
          The security of your data is important to us. We strive to use commercially acceptable means to protect your
          personal information, but we cannot guarantee its absolute security. Any information you provide is at your
          own risk.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>

        <p>
          We may employ third-party companies and individuals to facilitate our service, provide the service on our
          behalf, perform service-related services, or assist us in analyzing how our service is used.
        </p>

        <p>
          These third parties have access to your personal information only to perform these tasks on our behalf and are
          obligated not to disclose or use it for any other purpose.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Analytics</h2>

        <p>We may use third-party service providers to monitor and analyze the use of our service.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>

        <p>
          Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable
          information from children under 13. If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact us.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>

        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date.
        </p>

        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>

        <p>
          If you have any questions about this Privacy Policy, please{" "}
          <Link href="/contact" className="text-primary underline hover:no-underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
