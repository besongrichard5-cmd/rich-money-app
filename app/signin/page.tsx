import Link from "next/link"

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold mb-6">Coming Soon</h1>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          Sign in will be available at launch. Join the waitlist to get early access and be the first to trade.
        </p>
        <Link href="/" className="inline-block bg-[#10B981] hover:bg-[#059669] text-black font-bold px-8 py-3 rounded-xl transition-all">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}