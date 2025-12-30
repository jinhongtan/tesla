"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Alert, AlertDescription } from "@components/ui/alert";
import { CheckCircle, XCircle, Loader2, Mail, LogIn, Home } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5); // Countdown for auto-redirect

  useEffect(() => {
    if (token && status === "idle") {
      handleVerification();
    }
  }, [token, status]);

  // Auto-redirect countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (status === "success" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Auto-redirect when countdown reaches 0
            router.push("/auth/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, countdown, router]);

  const handleVerification = async () => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token");
      return;
    }

    setStatus("loading");
    
    try {
      // Direct fetch to Better Auth's built-in endpoint
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      
      console.log("Verification response:", data);

      if (!response.ok || data?.error) {
        setStatus("error");
        setMessage(data?.error?.message || "Failed to verify email");
      } else {
        setStatus("success");
        setMessage("Email verified successfully! You can now sign in.");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setStatus("error");
      setMessage(error?.message || "An unexpected error occurred");
    }
  };

  const retryVerification = () => {
    setStatus("idle");
    handleVerification();
  };

  const handleManualRedirect = (path: string) => {
    // Clear the countdown and redirect immediately
    setCountdown(0);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Email Verification
          </CardTitle>
          <CardDescription className="text-lg">
            {status === "idle" && "Checking verification token..."}
            {status === "loading" && "Verifying your email address..."}
            {status === "success" && `🎉 Verified! Redirecting in ${countdown}s`}
            {status === "error" && "❌ Verification Failed"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
              <p className="text-lg font-medium text-gray-700">
                Verifying your email address...
              </p>
              <p className="text-sm text-gray-500 text-center">
                Please wait while we confirm your email.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6">
              <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <AlertDescription className="text-green-800 text-lg">
                  {message} <span className="font-bold">Redirecting in {countdown} seconds...</span>
                </AlertDescription>
              </Alert>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium">
                  ✨ Your email has been verified successfully!
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  You can now access all features of your account.
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg"
                  onClick={() => handleManualRedirect("/auth/login")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full py-3 text-lg"
                  onClick={() => handleManualRedirect("/")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go to Home
                </Button>
                <div className="text-center">
                  <button
                    onClick={() => handleManualRedirect("/auth/login")}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Click here to skip countdown
                  </button>
                </div>
              </div>
            </div>
          )}

          {status === "error" && (
            <Alert variant="destructive" className="border-red-300">
              <XCircle className="h-6 w-6" />
              <AlertDescription className="text-red-800">
                {message}
              </AlertDescription>
            </Alert>
          )}

          {!token && (
            <Alert variant="destructive" className="border-red-300">
              <XCircle className="h-6 w-6" />
              <AlertDescription className="text-red-800">
                No verification token found. Please check your email for the verification link.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {status === "error" && token && (
              <>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg"
                  onClick={retryVerification}
                //   disabled={status === "loading"}
                >
                  {/* {status === "loading" ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    "Try Again"
                  )} */}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full py-3 text-lg"
                  onClick={() => router.push("/")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go to Home
                </Button>
              </>
            )}

            {!token && status !== "success" && (
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full py-3 text-lg"
                  onClick={() => router.push("/")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Go to Home
                </Button>
                
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Didn't receive the email?
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <span className="mr-2">📧</span>
                      Check your spam folder
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">⏰</span>
                      Wait a few minutes and try again
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✅</span>
                      Make sure you used the correct email
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}