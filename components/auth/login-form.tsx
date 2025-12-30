"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { data, error } = await signIn.email(
            {
                email,
                password,
            },
            {
                onRequest: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    router.push("/dashboard");
                    router.refresh();
                },
                onError: (ctx) => {
                    // ctx.error contains the typed error object
                    setError(ctx.error.message ?? "Something went wrong");
                },
                onResponse: () => {
                    setIsLoading(false);
                },
            }
        );

        setIsLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Login</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                <div className="mt-4 text-center">
                    <Link
                        href="/auth/request-reset-password"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </form>
        </div>
    );
}