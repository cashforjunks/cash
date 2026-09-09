import nodemailer from "nodemailer";

const GMAIL_USER = "carsjunk81@gmail.com";
const RECIPIENT_EMAIL = "carsjunk81@gmail.com";

function clean(value, maxLength = 500) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function getAppPassword() {
  return String(process.env.GMAIL_APP_PASSWORD || "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\s+/g, "");
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
    const gmailAppPassword = getAppPassword();

    if (!gmailAppPassword) {
      console.error("GMAIL_APP_PASSWORD is missing");

      return res.status(500).json({
        ok: false,
        error: "Email service is not configured.",
      });
    }

    if (gmailAppPassword.length !== 16) {
      console.error("Invalid Gmail App Password length", {
        length: gmailAppPassword.length,
      });

      return res.status(500).json({
        ok: false,
        error: "Invalid Gmail App Password configuration.",
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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      authMethod: "LOGIN",

      auth: {
        user: GMAIL_USER,
        pass: gmailAppPassword,
      },

      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 30000,
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Quick Cash Junk Cars LLC" <${GMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: GMAIL_USER,

      subject:
        `New Quote Request - ${data.year} ${data.make} ${data.model}`,

      text: [
        "NEW QUOTE REQUEST",
        "",
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Vehicle: ${data.year} ${data.make} ${data.model}`,
        `Condition: ${data.condition}`,
        `ZIP Code: ${data.zipCode}`,
        "",
        "Additional Details:",
        data.description,
      ].join("\n"),

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          color: #111827;
        ">
          <div style="
            background: #16a34a;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
          ">
            <h2 style="margin:0">
              New Quote Request
            </h2>
          </div>

          <div style="
            border: 1px solid #e5e7eb;
            padding: 20px;
            border-radius: 0 0 8px 8px;
          ">
            <p>
              <strong>Name:</strong><br>
              ${data.name}
            </p>

            <p>
              <strong>Phone:</strong><br>
              <a href="tel:${data.phone}">
                ${data.phone}
              </a>
            </p>

            <hr>

            <p><strong>Year:</strong> ${data.year}</p>
            <p><strong>Make:</strong> ${data.make}</p>
            <p><strong>Model:</strong> ${data.model}</p>
            <p><strong>Condition:</strong> ${data.condition}</p>
            <p><strong>ZIP Code:</strong> ${data.zipCode}</p>

            <hr>

            <p><strong>Additional Details:</strong></p>
            <p>${data.description}</p>
          </div>
        </div>
      `,
    });

    console.log("Quote email sent successfully", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return res.status(200).json({
      ok: true,
      message: "Quote sent successfully.",
    });

  } catch (error) {
    const code =
      error &&
      typeof error === "object" &&
      "code" in error
        ? String(error.code)
        : "UNKNOWN";

    const responseCode =
      error &&
      typeof error === "object" &&
      "responseCode" in error
        ? String(error.responseCode)
        : "UNKNOWN";

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.error("Gmail SMTP error", {
      message,
      code,
      responseCode,
      user: GMAIL_USER,
    });

    return res.status(500).json({
      ok: false,
      error:
        code === "EAUTH"
          ? "Gmail authentication failed."
          : "Failed to send quote email.",
    });
  }
}
