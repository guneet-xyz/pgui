import Link from "next/link"
import { Database } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-14 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Database className="h-5 w-5" />
          <span>pgui</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
