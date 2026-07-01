'use client' // <- Required for useState + onClick

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-gray-800 bg-[#0A0A0A] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#10B981]">Rich Money</Link>
        
        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-white hover:text-[#10B981]">Home</Link>
          <Link href="/about" className="text-white hover:text-[#10B981]">About</Link>
          <Link href="/faq" className="text-white hover:text-[#10B981]">FAQ</Link>
          <Link href="/signin" className="text-white hover:text-[#10B981]">Sign In</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 px-6 py-4 flex flex-col gap-3 bg-[#0A0A0A]">
          <Link href="/" className="text-white font-bold py-3 px-3 rounded-xl hover:bg-white/5 transition" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" className="text-white font-bold py-3 px-3 rounded-xl hover:bg-white/5 transition" onClick={() => setOpen(false)}>About</Link>
          <Link href="/faq" className="text-white font-bold py-3 px-3 rounded-xl hover:bg-white/5 transition" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/signin" className="text-white font-bold py-3 px-3 rounded-xl hover:bg-white/5 transition" onClick={() => setOpen(false)}>Sign In</Link>
        </div>
      )}
    </header>
  )
}