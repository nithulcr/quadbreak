import { google } from "googleapis";

const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";

/**
 * The scope the refresh token in GOOGLE_REFRESH_TOKEN must have been granted
 * with. Defining it here does NOT grant it - see the OAuth flow in README.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FROM_NAME = "Quadbreak Website";

export type ContactEnquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/**
 * Environment variable names, in the order they are validated. Only names are
 * ever reported - never values.
 */
const REQUIRED_VARS = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN",
  "GOOGLE_WORKSPACE_EMAIL",
] as const;

export class EmailNotConfiguredError extends Error {
  readonly missing: string[];
  readonly invalid: string[];

  constructor(missing: string[] = [], invalid: string[] = []) {
    super("Google email service is not configured.");
    this.name = "EmailNotConfiguredError";
    this.missing = missing;
    this.invalid = invalid;
  }
}

function readConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const workspaceEmail = process.env.GOOGLE_WORKSPACE_EMAIL;
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL || workspaceEmail;

  const values: Record<string, string | undefined> = {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    GOOGLE_REFRESH_TOKEN: refreshToken,
    GOOGLE_WORKSPACE_EMAIL: workspaceEmail,
  };

  const missing = REQUIRED_VARS.filter((key) => !values[key]?.trim());
  const invalid = workspaceEmail && !EMAIL_PATTERN.test(workspaceEmail.trim())
    ? ["GOOGLE_WORKSPACE_EMAIL (not a valid email address)"]
    : [];

  if (missing.length > 0 || invalid.length > 0) {
    throw new EmailNotConfiguredError(missing, invalid);
  }

  return {
    clientId: clientId as string,
    clientSecret: clientSecret as string,
    refreshToken: refreshToken as string,
    workspaceEmail: (workspaceEmail as string).trim(),
    notificationEmail: (notificationEmail as string).trim(),
  };
}

export function isEmailServiceConfigured(): boolean {
  const workspaceEmail = process.env.GOOGLE_WORKSPACE_EMAIL;
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL || workspaceEmail;

  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_REFRESH_TOKEN ||
    !workspaceEmail ||
    !notificationEmail
  ) {
    return false;
  }

  return EMAIL_PATTERN.test(workspaceEmail.trim());
}

/**
 * Reports whether each required environment variable exists.
 *
 * Values are NEVER printed - only presence booleans and, for the two
 * non-secret address variables, a "configured"/"missing" marker. Secrets
 * (GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) and any token material
 * (access_token, id_token, authorization code) must never be logged.
 */
export function logGmailConfiguration(): void {
  console.log("[contact] Gmail configuration:", {
    clientId: Boolean(process.env.GOOGLE_CLIENT_ID),
    clientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    refreshToken: Boolean(process.env.GOOGLE_REFRESH_TOKEN),
    workspaceEmail: process.env.GOOGLE_WORKSPACE_EMAIL
      ? "configured"
      : "missing",
    notificationEmail: process.env.NOTIFICATION_EMAIL
      ? "configured"
      : "missing",
  });
}

/**
 * Maps a Gmail/OAuth failure onto the action that actually resolves it.
 * Keeping this as static text means no secret or token can ever leak here.
 */
function gmailErrorHint(
  status: number | undefined,
  error: string | undefined,
): string | undefined {
  const code = (error || "").toLowerCase();

  if (status === 401 || code === "invalid_grant") {
    return "401/invalid_grant: GOOGLE_REFRESH_TOKEN is invalid, revoked, or was issued to a different Google account. Re-authorise the OAuth flow signed in as GOOGLE_WORKSPACE_EMAIL with scope " +
      GMAIL_SEND_SCOPE +
      ".";
  }
  if (status === 403 && (code === "insufficientpermissions" || code === "insufficient permissions")) {
    return "403 insufficientPermissions: the token lacks " +
      GMAIL_SEND_SCOPE +
      ", or Workspace policy is blocking the app. Re-authorise with that scope and check Admin console > API controls.";
  }
  if (status === 403) {
    return "403 forbidden: inspect Google Workspace admin restrictions for this account and app (third-party app access / Gmail send restriction).";
  }
  if (status === 400) {
    return "400 invalid argument: inspect the MIME message - headers (From/To/Reply-To/Subject), the recipient address, and the base64url encoding of requestBody.raw.";
  }
  if (status === 404) {
    return "404: the Gmail API may not be enabled on the Google Cloud project behind GOOGLE_CLIENT_ID, or the authenticated account cannot be resolved.";
  }
  if (status === 429) {
    return "429: Gmail API quota or rate limit exceeded for the project behind GOOGLE_CLIENT_ID.";
  }
  if (code === "etimedout" || code === "enotfound" || code === "econnreset") {
    return "Network/TLS failure reaching googleapis.com. Check outbound connectivity and any proxy or firewall.";
  }

  return undefined;
}

type GmailErrorShape = {
  message?: string;
  code?: number | string;
  response?: {
    status?: number;
    data?: {
      error?: string;
      error_description?: string;
      errors?: Array<{
        reason?: string;
        message?: string;
        domain?: string;
      }>;
    };
  };
};

/**
 * Structured, credential-safe diagnostics for a failed Gmail send.
 *
 * Only the error shape googleapis surfaces is read: message, numeric code,
 * HTTP status, the OAuth/Gmail error slug, its description, and Google's
 * `errors[]` array. It never touches env values, tokens, or the request body.
 */
export function logGmailError(error: unknown): void {
  if (error && typeof error === "object") {
    const err = error as GmailErrorShape;

    console.error("[contact] Gmail API send failed", {
      message: err.message,
      code: err.code,
      status: err.response?.status,
      error: err.response?.data?.error,
      errorDescription: err.response?.data?.error_description,
      googleErrors: err.response?.data?.errors,
      hint: gmailErrorHint(err.response?.status, err.response?.data?.error),
    });

    return;
  }

  console.error("[contact] Gmail API send failed", {
    error: String(error),
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Encodes a string for use in an RFC 2047 encoded-word header value.
 * ASCII-only values are returned untouched so common subjects stay readable.
 */
function encodeHeader(value: string): string {
  if (/^[\x20-\x7E]*$/.test(value)) {
    return value;
  }

  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

/**
 * Builds a `Display Name <address>` mailbox.
 *
 * A display name is only emitted unquoted when it is plain printable ASCII
 * with no characters that would break the header; otherwise it is quoted and
 * backslash-escaped. Non-ASCII names go through RFC 2047 `encodeHeader` first.
 * Without this, a visitor named `Ann "A" O'Brien` produces malformed MIME and
 * Gmail rejects the whole message with 400 invalid argument.
 */
function formatAddress(displayName: string, address: string): string {
  const asciiSafe = /^[\x20-\x21\x23-\x5B\x5D-\x7E]+$/.test(displayName);

  if (asciiSafe) {
    return `${displayName} <${address}>`;
  }

  const encoded = encodeHeader(displayName);
  const quoted = `"${encoded.replace(/(["\\])/g, "\\$1")}"`;

  return `${quoted} <${address}>`;
}

/**
 * Standard base64, used for MIME `Content-Transfer-Encoding: base64` parts.
 * Distinct from `toBase64Url` below: RFC 2045 bodies must use the standard
 * alphabet (`+` and `/`), not the URL-safe one.
 */
function toBase64(value: string): string {
  return Buffer.from(value, "utf8").toString("base64");
}

/**
 * base64url as required by the Gmail API `raw` field.
 */
function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function buildTextBody(enquiry: ContactEnquiry): string {
  return [
    "New contact form enquiry",
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    "",
    "Message:",
    enquiry.message,
    "",
    "Reply directly to this email to respond to the visitor.",
  ].join("\n");
}

function buildHtmlBody(enquiry: ContactEnquiry): string {
  const safeName = escapeHtml(enquiry.name);
  const safeEmail = escapeHtml(enquiry.email);
  const safePhone = escapeHtml(enquiry.phone);
  const safeMessage = escapeHtml(enquiry.message).replace(/\n/g, "<br />");

  return [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#111">',
    '<h2 style="margin:0 0 16px;font-size:18px">New contact form enquiry</h2>',
    '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px">',
    `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">Name</td><td style="padding:4px 0"><strong>${safeName}</strong></td></tr>`,
    `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">Email</td><td style="padding:4px 0"><a href="mailto:${safeEmail}" style="color:#1155cc">${safeEmail}</a></td></tr>`,
    `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">Phone</td><td style="padding:4px 0">${safePhone}</td></tr>`,
    "</table>",
    '<hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 20px" />',
    `<div style="white-space:normal">${safeMessage}</div>`,
    '<hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0 16px" />',
    `<p style="color:#666;font-size:12px;margin:0">Reply directly to this email to respond to the visitor.</p>`,
    "</div>",
  ].join("");
}

/**
 * Builds an RFC 2822 multipart/alternative message.
 *
 * `From` is always the authenticated Workspace account; the visitor's address
 * is only ever placed in `Reply-To`, so the message stays authenticated and
 * hitting Reply in Gmail goes straight back to the visitor.
 */
function buildMimeMessage(
  enquiry: ContactEnquiry,
  workspaceEmail: string,
  notificationEmail: string,
): string {
  const boundary = `----quadbreak_${Date.now().toString(36)}`;
  const encodedSubject = encodeHeader(`New enquiry from ${enquiry.name}`);

  return [
    `From: ${formatAddress(FROM_NAME, workspaceEmail)}`,
    
    `To: ${notificationEmail}`,
    `Reply-To: ${formatAddress(enquiry.name, enquiry.email)}`,
    `Subject: ${encodedSubject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    "--" + boundary,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    toBase64(buildTextBody(enquiry)),
    "",
    "--" + boundary,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    toBase64(buildHtmlBody(enquiry)),
    "",
    "--" + boundary + "--",
    "",
  ].join("\r\n");
}

export async function sendContactEmail(
  enquiry: ContactEnquiry,
): Promise<void> {
  // readConfig throws EmailNotConfiguredError, which the route reports
  // separately, so it stays outside the diagnostic try/catch below.
  const {
    clientId,
    clientSecret,
    refreshToken,
    workspaceEmail,
    notificationEmail,
  } = readConfig();

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });

  try {
    const mime = buildMimeMessage(enquiry, workspaceEmail, notificationEmail);
    const raw = toBase64Url(mime);

    // Structural diagnostics only: the recipient and the authenticated sender
    // are safe to show, but the MIME body, token and client secret never are.
    console.log("[contact] Gmail send", {
      sender: workspaceEmail,
      replyTo: enquiry.email,
      recipient: notificationEmail,
      mimeBytes: Buffer.byteLength(mime, "utf8"),
      rawBase64UrlBytes: raw.length,
      scope: GMAIL_SEND_SCOPE,
    });

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    console.log("[contact] Gmail send succeeded", {
      messageId: response.data.id ?? null,
      threadId: response.data.threadId ?? null,
    });
  } catch (error) {
    // Safe structured diagnostics, then rethrow unchanged so the route can map
    // it to a generic client response without losing the original error.
    logGmailError(error);
    throw error;
  }
}

export { GMAIL_SEND_SCOPE, buildMimeMessage, toBase64Url };
