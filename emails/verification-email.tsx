import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
    verificationUrl: string;
    userEmail: string;
}

export const VerificationEmail = ({
    verificationUrl,
    userEmail,
}: VerificationEmailProps) => {
    const previewText = `Verify your email for ${process.env.NEXT_PUBLIC_APP_NAME || "our app"}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Verify Your Email Address</Heading>
                    <Text style={text}>
                        Hello there,
                    </Text>
                    <Text style={text}>
                        Thank you for signing up! Please verify your email address by clicking the button below:
                    </Text>

                    <Link
                        href={verificationUrl}
                        target="_blank"
                        style={button}
                    >
                        Verify Email Address
                    </Link>

                    <Text style={text}>
                        Or copy and paste this URL into your browser:
                    </Text>
                    <Text style={code}>{verificationUrl}</Text>

                    <Text style={text}>
                        This verification link will expire in 24 hours.
                    </Text>

                    <Text style={text}>
                        If you didn't create an account, you can safely ignore this email.
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