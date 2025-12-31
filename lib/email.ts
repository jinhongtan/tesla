import { Resend } from "resend";
import { VerificationEmail } from "@/emails/verification-email";
import { WelcomeEmail } from "@/emails/welcome-email";
import { PasswordResetEmail } from "@/emails/password-reset-email";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

const resend = new Resend(apiKey);

export async function sendVerificationEmail({
  to,
  verificationUrl,
  userEmail,
}: {
  to: string;
  verificationUrl: string;
  userEmail: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>",
      to: [to],
      subject: `Verify your email for ${process.env.NEXT_PUBLIC_APP_NAME || "our app"}`,
      react: VerificationEmail({ verificationUrl, userEmail }),
    });

    if (error) {
      console.error("Error sending verification email:", error);
      return { success: false, error };
    }

    console.log("✅ Verification email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail({
  to,
  userName,
}: {
  to: string;
  userName: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>",
      to: [to],
      subject: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || "our app"}!`,
      react: WelcomeEmail({ userName }),
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }

    console.log("✅ Welcome email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: {
  to: string;
  resetUrl: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>",
      to: [to],
      subject: `Reset your password for ${process.env.NEXT_PUBLIC_APP_NAME || "our app"}`,
      react: PasswordResetEmail({ resetUrl:resetUrl, userEmail:to }),
    });

    if (error) {
      console.error("Error sending password reset email:", error);
      return { success: false, error };
    }

    console.log("✅ Password reset email sent:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return { success: false, error };
  }
}