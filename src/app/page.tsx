import Link from "next/link";
import { 
  Camera, 
  FileText, 
  Scissors, 
  Download, 
  CheckCircle, 
  Zap,
  Shield,
  Users
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in">
              Turn Your Woodworking Ideas Into Buildable Plans
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in stagger-1">
              Upload a photo or sketch of any project — our AI generates a complete 
              bill of materials, cut list, and step-by-step assembly instructions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-2">
              <Link
                href="/dashboard"
                className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-button text-lg transition-colors shadow-card-hover"
              >
                Start Planning Free
              </Link>
              <Link
                href="#features"
                className="bg-white border-2 border-primary text-primary font-semibold px-8 py-4 rounded-button text-lg transition-colors hover:bg-primary hover:text-white"
              >
                See How It Works
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500 animate-fade-in stagger-3">
              No credit card required · 3 free projects · Pro plans from $9.99/mo
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span className="font-medium">500+ Projects Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-success" />
              <span className="font-medium">Beginner-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-accent" />
              <span className="font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Your Project
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From idea to finished piece — all in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow animate-fade-in stagger-1">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Camera className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                Photo to Plan
              </h3>
              <p className="text-gray-600 text-sm">
                Upload a photo of any furniture piece or sketch. Our AI identifies components and materials instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow animate-fade-in stagger-2">
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-secondary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                Auto BOM Generation
              </h3>
              <p className="text-gray-600 text-sm">
                Get a complete bill of materials with quantities, dimensions, and wood species recommendations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow animate-fade-in stagger-3">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Scissors className="text-accent" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                Smart Cut List
              </h3>
              <p className="text-gray-600 text-sm">
                Kerf-aware cut calculations ensure you order enough material. No more waste from incorrect cuts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-surface p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow animate-fade-in stagger-4">
              <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-success" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                PDF Export
              </h3>
              <p className="text-gray-600 text-sm">
                Export your complete project plan as a printable PDF to take to the lumber yard or workshop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps from idea to actionable plan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in stagger-1">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Upload Your Photo
              </h3>
              <p className="text-gray-600">
                Take a photo of your project idea or draw a simple sketch. Our AI understands what you&apos;re building.
              </p>
            </div>

            <div className="text-center animate-fade-in stagger-2">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                AI Generates Your Plan
              </h3>
              <p className="text-gray-600">
                Get instant BOM, cut list, and assembly instructions. Review and edit any component.
              </p>
            </div>

            <div className="text-center animate-fade-in stagger-3">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                Build with Confidence
              </h3>
              <p className="text-gray-600">
                Export your plan as PDF and start building. Beginner mode includes tips and warnings for tricky cuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you&apos;re ready
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-surface rounded-card shadow-card p-8 animate-fade-in stagger-1">
              <h3 className="font-heading text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for trying things out</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  3 projects per month
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  Basic BOM
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  Manual cut list
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  No AI features
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="block w-full bg-gray-100 text-gray-700 font-medium text-center py-3 rounded-button hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-surface rounded-card shadow-card p-8 border-2 border-accent relative animate-fade-in stagger-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-sm font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">For serious builders</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  Unlimited projects
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  AI photo analysis
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  AI cut optimization
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  PDF export
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-success" />
                  Skill-level instructions
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="block w-full bg-accent hover:bg-accent-dark text-white font-medium text-center py-3 rounded-button transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Plan Your Next Project?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of woodworkers who use WoodCraft AI to turn their ideas into buildable plans.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-button text-lg transition-colors"
          >
            Start Planning Free
          </Link>
        </div>
      </section>
    </div>
  );
}
