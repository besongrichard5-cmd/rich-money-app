const faqs = [
  {q: "How does Rich Money work?", a: "You post a trade to send Naira and receive Cedis, CFA, etc. Your funds are held in escrow until both parties confirm the trade is complete. Only then is money released. If a trade isn’t completed, your money is automatically refunded."},
  {q: "Is my money safe?", a: "Yes. All funds stay locked in escrow until both parties confirm receipt. We never hold your money in a central wallet. If a transaction isn’t completed within the time window, funds are automatically returned to your account."},
  {q: "Which countries do you support?", a: "We’re launching with Nigeria, Ghana, and Cameroon. Support for more West African countries and currencies is coming soon."},
  {q: "What are the fees?", a: "We charge a transparent, low fee per transaction. No hidden charges. You’ll see the exact fee before you confirm any trade."},
  {q: "How fast are transfers?", a: "Most trades complete within minutes once both parties confirm. The speed depends on how quickly the counterparty confirms receipt on their side."},
  {q: "Do I need KYC?", a: "Yes. For security and compliance, we require basic identity verification before you can post trades or receive funds."},
  {q: "What if the other person doesn’t confirm?", a: "If a trade isn’t completed within the designated time window, funds are automatically returned to your account. No manual intervention needed."},
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-12">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <details key={i} className="border border-gray-800 bg-[#111] rounded-xl p-6 group">
              <summary className="font-bold text-xl cursor-pointer list-none flex justify-between items-center">
                {item.q}
                <span className="text-[#10B981] group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="text-gray-400 mt-4 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}