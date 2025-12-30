import { getCurrentUser } from "@lib/auth-server";
import { SignupForm } from "@components/auth/signup-form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const user = await getCurrentUser();
  
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
          <p className="mt-2 text-gray-600">
            Get started with your free account today.
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}