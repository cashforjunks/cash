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
    const gmailUser = String(
      process.env.GMAIL_USER || ""
    )
      .trim()
      .toLowerCase();

    const gmailAppPassword = String(
      process.env.GMAIL_APP_PASSWORD || ""
    ).replace(/\s+/g, "");

    if (!gmailUser) {
      return res.status(500).json({
        ok: false,
        error: "GMAIL_USER is missing",
      });
    }

    if (!gmailAppPassword) {
      return res.status(500).json({
        ok: false,
        error: "GMAIL_APP_PASSWORD is missing",
      });
    }

    if (gmailAppPassword.length !== 16) {
      console.error("Invalid Gmail App Password length:", {
        length: gmailAppPassword.length,
      });

      return res.status(500).json({
        ok: false,
        error: "Invalid Gmail App Password length",
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

      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },

      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 30000,
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Top Dollar Junk Cars" <${gmailUser}>`,
      to: RECIPIENT_EMAIL,

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
            <h2 style="margin: 0;">
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

    console.log("Quote email sent successfully:", {
      messageId: info.messageId,
      accepted: info.accepted,
    });

    return res.status(200).json({
      ok: true,
      message: "Quote sent successfully.",
    });

  } catch (error) {
    console.error("Gmail SMTP error:", {
      message:
        error instanceof Error
          ? error.message
          : String(error),

      code:
        error &&
        typeof error === "object" &&
        "code" in error
          ? String(error.code)
          : "UNKNOWN",

      responseCode:
        error &&
        typeof error === "object" &&
        "responseCode" in error
          ? String(error.responseCode)
          : "UNKNOWN",
    });

    return res.status(500).json({
      ok: false,
      error: "Failed to send quote email.",
    });
  }
}
