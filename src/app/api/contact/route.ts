import { NextResponse } from "next/server";
import {
  sendContactEmail,
  isEmailServiceConfigured,
  logGmailConfiguration,
  EmailNotConfiguredError,
  EMAIL_PATTERN,
} from "@/lib/email/gmail";

const MAX_LENGTHS = {
  name: 100,
  email: 200,
  phone: 40,
  message: 5000,
};

const GENERIC_ERROR =
  "Could not send your message. Please try again later.";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function readField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  // Presence-only diagnostic. Never prints a secret value.
  logGmailConfiguration();

  if (!isEmailServiceConfigured()) {
    const missing = [
      ["GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID],
      ["GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET],
      ["GOOGLE_REFRESH_TOKEN", process.env.GOOGLE_REFRESH_TOKEN],
      ["GOOGLE_WORKSPACE_EMAIL", process.env.GOOGLE_WORKSPACE_EMAIL],
      ["NOTIFICATION_EMAIL", process.env.NOTIFICATION_EMAIL],
    ]
      .filter(([, value]) => !value || !value.trim())
      .map(([name]) => name);

    console.error(
      "[contact] Email service is not configured. Missing or empty:",
      missing.length > 0 ? missing : "none (check email format)",
      "| Expected scope: https://www.googleapis.com/auth/gmail.send",
    );

    return NextResponse.json(
      { success: false, error: GENERIC_ERROR },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = readField(body.name, MAX_LENGTHS.name);
  const email = readField(body.email, MAX_LENGTHS.email);
  const phone = readField(body.phone, MAX_LENGTHS.phone);
  const message = readField(body.message, MAX_LENGTHS.message);

  const missing = [
    !name && "name",
    !email && "email",
    !phone && "phone",
    !message && "message",
  ].filter(Boolean);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: `Missing required field(s): ${missing.join(", ")}`,
      },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({ name, email, phone, message });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      console.error("[contact] Email service is not configured.", {
        missing: error.missing,
        invalid: error.invalid,
      });
      return NextResponse.json(
        { success: false, error: GENERIC_ERROR },
        { status: 500 },
      );
    }

    // sendContactEmail already ran logGmailError with the full Google error
    // shape. Only the error class name is added here so an unexpected
    // non-Gmail failure stays traceable without leaking a message that could
    // contain a token. The browser never receives Google or OAuth detail.
    console.error(
      "[contact] Contact submission failed; returning generic error to client.",
      {
        errorName:
          error instanceof Error ? error.name : typeof error,
      },
    );

    return NextResponse.json(
      { success: false, error: GENERIC_ERROR },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export const runtime = "nodejs";
