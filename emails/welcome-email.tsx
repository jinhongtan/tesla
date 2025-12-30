import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userName: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {process.env.NEXT_PUBLIC_APP_NAME || "our app"}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome aboard, {userName}! 👋</Heading>
          
          <Text style={text}>
            Thank you for joining {process.env.NEXT_PUBLIC_APP_NAME || "our app"}! We're excited to have you with us.
          </Text>
          
          <Text style={text}>
            Your account has been successfully verified and is ready to use. You can now:
          </Text>
          
          <ul style={list}>
            <li style={listItem}>Access your dashboard</li>
            <li style={listItem}>Update your profile</li>
            <li style={listItem}>Explore all features</li>
          </ul>
          
          <Text style={text}>
            If you have any questions or need assistance, please don't hesitate to reach out to our support team.
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

const list = {
  margin: "16px 0",
  paddingLeft: "24px",
};

const listItem = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "8px 0",
};

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "32px",
  paddingTop: "16px",
  borderTop: "1px solid #eee",
};