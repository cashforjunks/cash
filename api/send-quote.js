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
    ).trim();

    // يشيل المسافات من Google App Password تلقائياً
    const gmailAppPassword = String(
      process.env.GMAIL_APP_PASSWORD || ""
    ).replace(/\s+/g, "");

    if (!gmailUser || !gmailAppPassword) {
      console.error(
        "Missing GMAIL_USER or GMAIL_APP_PASSWORD"
      );

      return res.status(500).json({
        ok: false,
        error: "Email environment variables are missing.",
        code: "MISSING_ENV",
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
        description || "No details",
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

      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // يتأكد من Gmail قبل الإرسال
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `Quick Cash Junk Cars LLC <${gmailUser}>`,

      to: RECIPIENT_EMAIL,

      subject:
        `New Quote Request - ` +
        `${data.year} ${data.make} ${data.model}`,

      text: [
        "New Quote Request",
        "",
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Car: ${data.year} ${data.make} ${data.model}`,
        `Condition: ${data.condition}`,
        `ZIP Code: ${data.zipCode}`,
        `Additional Details: ${data.description}`,
      ].join("\n"),

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #111;
        ">
          <h2>New Quote Request</h2>

          <p>
            <strong>Name:</strong>
            ${data.name}
          </p>

          <p>
            <strong>Phone:</strong>
            ${data.phone}
          </p>

          <p>
            <strong>Car:</strong>
            ${data.year}
            ${data.make}
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

          <p>
            <strong>Additional Details:</strong>
            ${data.description}
          </p>
        </div>
      `,
    });

    console.log(
      "Quote email sent successfully:",
      info.messageId
    );

    return res.status(200).json({
      ok: true,
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

    console.error("Email send error:", {
      message,
      code,
    });

    return res.status(500).json({
      ok: false,
      error: message,
      code,
    });
  }
}
