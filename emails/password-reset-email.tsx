import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

interface PasswordResetEmailProps {
  resetUrl: string;
  userEmail: string;
}

export const PasswordResetEmail = ({
  resetUrl,
  userEmail,
}: PasswordResetEmailProps) => {
  const previewText = `Reset your password for ${process.env.NEXT_PUBLIC_APP_NAME || "our app"}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset Your Password</Heading>
          
          <Text style={text}>
            Hello,
          </Text>
          
          <Text style={text}>
            We received a request to reset the password for your account ({userEmail}).
            Click the button below to set a new password:
          </Text>
          
          <Button href={resetUrl} style={button}>
            Reset Password
          </Button>
          
          <Text style={text}>
            Or copy and paste this URL into your browser:
          </Text>
          
          <Text style={code}>{resetUrl}</Text>
          
          <Text style={text}>
            <strong>Important:</strong> This password reset link will expire in 1 hour.
          </Text>
          
          <Text style={text}>
            If you didn't request a password reset, you can safely ignore this email.
            Your password will not be changed.
          </Text>
          
          <Text style={footer}>
            Best regards,
            <br />
            The {process.env.NEXT_PUBLIC_APP_NAME || "App"} Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.3",
  padding: "17px 0 0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "left" as const,
  margin: "16px 0",
};

const button = {
  backgroundColor: "#4f46e5",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "48px",
  padding: "12px 24px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  margin: "24px 0",
};

const code = {
  backgroundColor: "#f4f4f4",
  borderRadius: "4px",
  color: "#333",
  fontFamily: "monospace",
  fontSize: "14px",
  padding: "12px",
  wordBreak: "break-all" as const,
  margin: "16px 0",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "32px",
  paddingTop: "16px",
  borderTop: "1px solid #eee",
};