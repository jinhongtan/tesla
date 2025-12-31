import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail } from "@/lib/email";
import { Resend } from "resend";


// Define types matching Better Auth's exact structure
interface BetterAuthUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined; // Add null support
}

interface SendVerificationEmailData {
  user: BetterAuthUser;
  url: string;
  token: string;
}

interface SendWelcomeEmailData {
  user: BetterAuthUser;
}

interface SendResetEmailData {
  user: BetterAuthUser;
  url: string;
  token: string;
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async (data: SendResetEmailData) => {
      await sendPasswordResetEmail({
        to: data.user.email,
        resetUrl: data.url,
      });
    },
  },
  emailVerification: {
    enabled: true,
    sendOnSignUp: true,
    sendVerificationEmail: async (data: SendVerificationEmailData) => {
      await sendVerificationEmail({
        to: data.user.email,
        verificationUrl: data.url,
        userEmail:data.user.email,
      });
    },
    sendWelcomeEmail: async (data: SendWelcomeEmailData) => {
      await sendWelcomeEmail({
        to: data.user.email,
        userName: data.user.name || data.user.email.split("@")[0],
      });
    },
  },
  user: {
    additionalFields: {
      name: {
        type: "string",
        required: false,
      },
    },
  },
  secret: process.env.AUTH_SECRET!,
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;