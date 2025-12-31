"use client";

//app/auth/request-reset-password/page.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Alert, AlertDescription } from "@components/ui/alert";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    console.log(email);

    setStatus("loading");
    setMessage("");

    try {
      // Call Better Auth's forgot password endpoint
      const response = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          redirectTo: `${window.location.origin}/auth/reset-password`
        }),
      });

      const data = await response.json();

      if (data?.error) {
        setStatus("error");
        setMessage(data.error.message || "Failed to send reset email");
      } else {
        setStatus("success");
        setMessage("Password reset instructions have been sent to your email!");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setStatus("error");
      setMessage("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-lg">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {status === "success" ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800">
                  {message}
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Check your inbox:</strong> We've sent password reset instructions to{" "}
                  <span className="font-semibold">{email}</span>
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => router.push("/auth/login")}
                >
                  Back to Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setStatus("idle");
                    setEmail("");
                  }}
                >
                  Reset Another Password
                </Button>
              </div>
            </div>
          ) : (
            <>
              {status === "error" && (
                <Alert variant="destructive">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Reset Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>

              <div className="text-center space-y-3">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Login
                </Link>

                <div className="text-xs text-gray-500">
                  <p>You'll receive an email with a link to reset your password.</p>
                  <p className="mt-1">The link will expire in 1 hour.</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}