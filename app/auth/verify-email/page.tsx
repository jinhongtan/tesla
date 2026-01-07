"use client";

import { useEffect, useState, Suspense } from "react"; // Added Suspense
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Alert, AlertDescription } from "@components/ui/alert";
import { CheckCircle, XCircle, Loader2, Mail, LogIn, Home } from "lucide-react";

// 1. Core logic component
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (token && status === "idle") {
      handleVerification();
    }
  }, [token, status]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "success" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/auth/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [status, countdown, router]);

  const handleVerification = async () => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (!response.ok || data?.error) {
        setStatus("error");
        setMessage(data?.error?.message || "Failed to verify email");
      } else {
        setStatus("success");
        setMessage("Email verified successfully! You can now sign in.");
      }
    } catch (error: any) {
      setStatus("error");
      setMessage(error?.message || "An unexpected error occurred");
    }
  };

  const retryVerification = () => {
    setStatus("idle");
    handleVerification();
  };

  const handleManualRedirect = (path: string) => {
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
              <p className="text-lg font-medium text-gray-700">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6">
              <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <AlertDescription className="text-green-800 text-lg">
                  {message} <span className="font-bold">Redirecting in {countdown}s...</span>
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 text-lg"
                  onClick={() => handleManualRedirect("/auth/login")}
                >
                  <LogIn className="mr-2 h-5 w-5" /> Sign In Now
                </Button>
                <Button variant="outline" className="w-full py-3 text-lg" onClick={() => handleManualRedirect("/")}>
                  <Home className="mr-2 h-5 w-5" /> Go to Home
                </Button>
              </div>
            </div>
          )}

          {status === "error" && (
            <Alert variant="destructive" className="border-red-300">
              <XCircle className="h-6 w-6" />
              <AlertDescription className="text-red-800">{message}</AlertDescription>
            </Alert>
          )}

          {!token && (
            <Alert variant="destructive" className="border-red-300">
              <XCircle className="h-6 w-6" />
              <AlertDescription className="text-red-800">No verification token found.</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {status === "error" && token && (
              <>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 text-lg"
                  onClick={retryVerification}
                >
                  Try Again
                </Button>
                <Button variant="outline" className="w-full py-3 text-lg" onClick={() => router.push("/")}>
                  <Home className="mr-2 h-5 w-5" /> Go to Home
                </Button>
              </>
            )}

            {!token && status !== "success" && (
              <div className="space-y-4">
                <Button variant="outline" className="w-full py-3 text-lg" onClick={() => router.push("/")}>
                  <Home className="mr-2 h-5 w-5" /> Go to Home
                </Button>
                <div className="border-t pt-4 text-sm text-gray-600">
                  <p className="font-medium text-gray-700 mb-2">Didn't receive the email?</p>
                  <ul className="space-y-1">
                    <li>📧 Check your spam folder</li>
                    <li>⏰ Wait a few minutes</li>
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

// 2. Main Page with Suspense
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 font-medium">Initializing verification...</p>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}