import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "carsjunk81@gmail.com";

function clean(value, maxLength = 500) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  try {
    // قراءة بيانات Gmail من Vercel Environment Variables
    const gmailUser = String(
      process.env.GMAIL_USER || ""
    ).trim();

    const rawPassword = String(
      process.env.GMAIL_APP_PASSWORD || ""
    );

    // إزالة أي مسافات من App Password تلقائياً
    const gmailAppPassword = rawPassword.replace(/\s+/g, "");

    // هذا يظهر في Vercel Logs للتأكد من الإعدادات
    // لا يقوم بطباعة الباسورد نفسه
console.log("GMAIL SMTP CHECK:", {
  user: gmailUser,
  passwordLength: gmailAppPassword.length,
  hasAtGmail: gmailUser.toLowerCase().endsWith("@gmail.com"),
  environment: process.env.VERCEL_ENV || "unknown",
});

    if (!gmailUser) {
      console.error("GMAIL_USER is missing");

      return res.status(500).json({
        ok: false,
        error: "GMAIL_USER is missing.",
        code: "MISSING_GMAIL_USER",
      });
    }

    if (!gmailAppPassword) {
      console.error("GMAIL_APP_PASSWORD is missing");

      return res.status(500).json({
        ok: false,
        error: "GMAIL_APP_PASSWORD is missing.",
        code: "MISSING_GMAIL_APP_PASSWORD",
      });
    }

    if (gmailAppPassword.length !== 16) {
      console.error(
        "Invalid App Password length:",
        gmailAppPassword.length
      );

      return res.status(500).json({
        ok: false,
        error: `App Password length is ${gmailAppPassword.length}, expected 16.`,
        code: "INVALID_APP_PASSWORD_LENGTH",
      });
    }

    const {
      name,
      phone,
      year,
      make,
      model,
      condition,
      zipCode,
      description,
    } = req.body || {};

    if (
      !name ||
      !phone ||
      !year ||
      !make ||
      !model ||
      !condition ||
      !zipCode
    ) {
      return res.status(400).json({
        ok: false,
        error: "Please fill in all required fields.",
        code: "MISSING_FIELDS",
      });
    }

    const data = {
      name: clean(name, 120),
      phone: clean(phone, 80),
      year: clean(year, 20),
      make: clean(make, 80),
      model: clean(model, 80),
      condition: clean(condition, 80),
      zipCode: clean(zipCode, 30),
      description: clean(
        description || "No additional details",
        2000
      ),
    };

    console.log("Creating Gmail SMTP transporter...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },

      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    console.log("Verifying Gmail SMTP connection...");

    try {
      await transporter.verify();

      console.log("Gmail SMTP verification successful.");
    } catch (verifyError) {
      console.error("GMAIL VERIFY ERROR:", {
        message:
          verifyError instanceof Error
            ? verifyError.message
            : String(verifyError),

        code:
          verifyError &&
          typeof verifyError === "object" &&
          "code" in verifyError
            ? String(verifyError.code)
            : "UNKNOWN",

        response:
          verifyError &&
          typeof verifyError === "object" &&
          "response" in verifyError
            ? String(verifyError.response)
            : "NO_RESPONSE",

        responseCode:
          verifyError &&
          typeof verifyError === "object" &&
          "responseCode" in verifyError
            ? String(verifyError.responseCode)
            : "NO_RESPONSE_CODE",
      });

      throw verifyError;
    }

    console.log("Sending quote email...");

    const info = await transporter.sendMail({
      from: `Quick Cash Junk Cars LLC <${gmailUser}>`,

      to: RECIPIENT_EMAIL,

      subject:
        `New Quote Request - ${data.year} ${data.make} ${data.model}`,

      text: `
NEW QUOTE REQUEST

Name:
${data.name}

Phone:
${data.phone}

Vehicle:
${data.year} ${data.make} ${data.model}

Condition:
${data.condition}

ZIP Code:
${data.zipCode}

Additional Details:
${data.description}
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: 0 auto;
            color: #111827;
          "
        >
          <div
            style="
              background: #16a34a;
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            "
          >
            <h2 style="margin:0;">
              New Quote Request
            </h2>
          </div>

          <div
            style="
              border: 1px solid #e5e7eb;
              padding: 20px;
              border-radius: 0 0 8px 8px;
            "
          >
            <p>
              <strong>Full Name:</strong><br>
              ${data.name}
            </p>

            <p>
              <strong>Phone Number:</strong><br>
              <a href="tel:${data.phone}">
                ${data.phone}
              </a>
            </p>

            <hr>

            <p>
              <strong>Year:</strong>
              ${data.year}
            </p>

            <p>
              <strong>Make:</strong>
              ${data.make}
            </p>

            <p>
              <strong>Model:</strong>
              ${data.model}
            </p>

            <p>
              <strong>Condition:</strong>
              ${data.condition}
            </p>

            <p>
              <strong>ZIP Code:</strong>
              ${data.zipCode}
            </p>

            <hr>

            <p>
              <strong>Additional Details:</strong>
            </p>

            <p>
              ${data.description}
            </p>
          </div>
        </div>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return res.status(200).json({
      ok: true,
      message: "Quote sent successfully.",
    });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    const code =
      error &&
      typeof error === "object" &&
      "code" in error
        ? String(error.code)
        : "EMAIL_SEND_FAILED";

    const response =
      error &&
      typeof error === "object" &&
      "response" in error
        ? String(error.response)
        : "";

    const responseCode =
      error &&
      typeof error === "object" &&
      "responseCode" in error
        ? String(error.responseCode)
        : "";

    console.error("FINAL EMAIL ERROR:", {
      message,
      code,
      response,
      responseCode,
    });

    return res.status(500).json({
      ok: false,
      error: message,
      code,
      responseCode,
    });
  }
}
