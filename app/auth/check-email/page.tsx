"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Mail, Home, ArrowLeft, CheckCircle } from "lucide-react";

export default function CheckEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl"> {/* Increased from max-w-lg to max-w-4xl */}
        <Card className="shadow-2xl overflow-hidden">
          {/* Header - Wider */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 text-white">
            <CardHeader className="p-0">
              <div className="flex items-center justify-center mb-8">
                <div className="h-28 w-28 rounded-full bg-white/20 flex items-center justify-center">
                  <Mail className="h-14 w-14" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-center">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-blue-100 text-center text-xl mt-4">
                We've sent a verification link to your email address
              </CardDescription>
            </CardHeader>
          </div>

          <CardContent className="p-10 space-y-10"> {/* Increased padding */}
            {/* Email Display - Centered and larger */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center bg-blue-50 rounded-full px-8 py-4 border-2 border-blue-100">
                <Mail className="h-6 w-6 text-blue-600 mr-3" />
                <span className="text-xl font-semibold text-blue-900">
                  {email || "your email address"}
                </span>
              </div>
              <p className="text-gray-700 text-xl">
                Click the verification link in the email to activate your account.
              </p>
            </div>

            {/* Help Section - Wider layout */}
          

            {/* Navigation Buttons - Wider */}
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1 py-6 text-lg"
                  onClick={() => router.push("/auth/signup")}
                >
                  <ArrowLeft className="mr-3 h-5 w-5" />
                  Back to Sign Up
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1 py-6 text-lg"
                  onClick={() => router.push("/auth/login")}
                >
                  Already Verified? Sign In
                </Button>
              </div>
              
            </div>

            {/* Quick Email Links - Wider */}
            <div className="text-center pt-6 border-t">
              <p className="text-lg text-gray-700 mb-2">Need to check your email?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-base font-medium transition-colors hover:scale-105 transform duration-200"
                >
                  Gmail
                </a>
                <a
                  href="https://outlook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-base font-medium transition-colors hover:scale-105 transform duration-200"
                >
                  Outlook
                </a>
                <a
                  href="https://yahoo.com/mail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-base font-medium transition-colors hover:scale-105 transform duration-200"
                >
                  Yahoo Mail
                </a>
                <a
                  href="https://apple.com/mail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-base font-medium transition-colors hover:scale-105 transform duration-200"
                >
                  Apple Mail
                </a>
                <a
                  href="https://proton.me/mail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-base font-medium transition-colors hover:scale-105 transform duration-200"
                >
                  Proton Mail
                </a>
              </div>
           
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}