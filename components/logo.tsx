import Link from "next/link"
import { Calculator } from "lucide-react"

export function Logo({ size = "default" }) {
  const sizeClasses = {
    small: "text-lg",
    default: "text-xl",
    large: "text-2xl",
  }

  return (
    <Link href="/" className={`flex items-center font-bold ${sizeClasses[size]}`}>
      <Calculator className="mr-2 h-6 w-6 text-primary" />
      <span>
        Pay<span className="text-primary">Radar</span>
      </span>
    </Link>
  )
}
