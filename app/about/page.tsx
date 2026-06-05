export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">Built in Nigeria. Made for West Africa.</h1>
        
        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>Rich Money exists because sending money across West Africa shouldn’t require 3 banks, 5 days, and 20% in fees.</p>
          
          <p>We’re a team of builders in Nigeria who faced the same FX bottlenecks, transfer delays, and opaque rates that you deal with every day when sending Naira to Cedis or CFA.</p>
          
          <p>So we built an escrow-protected P2P platform for Nigeria, Ghana, and Cameroon. You post a trade. Funds lock in escrow. Only when both sides confirm does money move. No intermediaries. No inflated rates. No chargebacks.</p>
          
          <p>Our mission: make cross-border payments as fast and trustless as sending money to your neighbor.</p>
          
          <div className="pt-12">
            <p className="text-3xl font-bold text-[#10B981]">Money that moves like Africans do.</p>
          </div>
        </div>
      </div>
    </div>
  )
}