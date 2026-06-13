import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">LiveCoach</div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Start Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Win Every Negotiation.<br />
          <span className="text-blue-600">Real-Time AI Coach.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The average person leaves $50,000 on the table every decade by not negotiating.
          LiveCoach fixes that.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Try Your First Negotiation Free
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Watch Demo (60s)
          </Button>
        </div>

        {/* Social Proof */}
        <p className="mt-8 text-sm text-gray-500">
          Users report winning an average of <span className="font-semibold text-gray-900">$11,400 more</span> per negotiation
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Setup</h3>
              <p className="text-gray-600">
                Tell us what you're negotiating, your goal, and your walk-away point
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live</h3>
              <p className="text-gray-600">
                Type what they said. Get your exact next move in 2 seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Win</h3>
              <p className="text-gray-600">
                Close the deal. Get a detailed debrief on what worked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Salary Negotiation", desc: "Get the offer you deserve", icon: "💼" },
              { title: "Rent & Leases", desc: "Save hundreds per month", icon: "🏠" },
              { title: "Contract Deals", desc: "Better rates, better terms", icon: "📄" },
              { title: "Vendor Pricing", desc: "Cut costs for your business", icon: "🤝" },
            ].map((useCase) => (
              <div key={useCase.title} className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition">
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-lg mb-2">Free</h3>
              <div className="text-3xl font-bold mb-4">$0</div>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600">✓ 1 session per month</li>
                <li className="text-sm text-gray-600">✓ Text input only</li>
                <li className="text-sm text-gray-600">✓ Basic debrief</li>
              </ul>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="border-2 border-blue-600 rounded-lg p-6 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
              <h3 className="font-semibold text-lg mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-4">
                $29<span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600">✓ Unlimited sessions</li>
                <li className="text-sm text-gray-600">✓ Voice input</li>
                <li className="text-sm text-gray-600">✓ Full debrief + score</li>
                <li className="text-sm text-gray-600">✓ Session history</li>
                <li className="text-sm text-gray-600">✓ Shareable wins</li>
              </ul>
              <Link href="/auth/signup">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>

            {/* Pay Per Session */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-lg mb-2">Pay Per Session</h3>
              <div className="text-3xl font-bold mb-4">
                $9<span className="text-lg text-gray-600">/session</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600">✓ Full pro features</li>
                <li className="text-sm text-gray-600">✓ Single session</li>
                <li className="text-sm text-gray-600">✓ No commitment</li>
              </ul>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Win Your Next Negotiation?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands who've already negotiated better deals
          </p>
          <Link href="/auth/signup">
            <Button size="lg">Start Your First Session Free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          © 2026 LiveCoach. Real-time negotiation coaching powered by AI.
        </div>
      </footer>
    </div>
  )
}
