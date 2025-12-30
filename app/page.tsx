import { Header } from "@/components/layout/header";
import { getCurrentUser } from "@/lib/auth-server";
import { ArrowRight, CheckCircle, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Secure Authentication
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Made Simple
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              A complete authentication solution for Next.js with Drizzle ORM and PostgreSQL.
              Get started in minutes with email/password, sessions, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/profile"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    View Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {user && (
              <div className="mt-8 inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-700 font-medium">
                  Welcome back, {user.name || user.email?.split("@")[0]}!
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Authentication
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with modern tools and best practices for security and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure by Default
              </h3>
              <p className="text-gray-600">
                Built-in security features including email verification, session management,
                and protection against common vulnerabilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fast & Efficient
              </h3>
              <p className="text-gray-600">
                Optimized for performance with edge-ready architecture and minimal bundle size.
                Get lightning-fast authentication flows.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Simple API, TypeScript support, and comprehensive documentation
                make integration a breeze for developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by Modern Stack
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with the best tools for a robust and scalable authentication system.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Next.js 14", color: "bg-black text-white" },
              { name: "Drizzle ORM", color: "bg-amber-500 text-white" },
              { name: "PostgreSQL", color: "bg-blue-800 text-white" },
              { name: "Better Auth", color: "bg-violet-600 text-white" },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`${tech.color} rounded-lg p-6 text-center transition-transform hover:scale-105`}
              >
                <p className="font-semibold">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust our authentication solution.
            It&apos;s free to get started and takes only minutes to integrate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-transparent hover:bg-white/10 border-2 border-white rounded-lg transition-all"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NA</span>
                </div>
                <span className="text-xl font-bold text-white">NextAuth</span>
              </Link>
              <p className="mt-2 text-sm">
                Secure authentication for modern web applications
              </p>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© {new Date().getFullYear()} NextAuth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}