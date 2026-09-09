import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "carsjunk81@gmail.com";

function clean(value, maxLength = 500) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
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

    if (!name || !phone || !year || !make || !model || !condition || !zipCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing Gmail environment variables");
      return res.status(500).json({ error: "Email service is not configured" });
    }

    const data = {
      name: clean(name, 120),
      phone: clean(phone, 80),
      year: clean(year, 20),
      make: clean(make, 80),
      model: clean(model, 80),
      condition: clean(condition, 80),
      zipCode: clean(zipCode, 30),
      description: clean(description || "No details", 2000),
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Car Quote Website <${process.env.GMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Quote Request - ${data.year} ${data.make} ${data.model}`,
      text: [
        "New Quote Request",
        "",
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Car: ${data.year} ${data.make} ${data.model}`,
        `Condition: ${data.condition}`,
        `ZIP: ${data.zipCode}`,
        `Details: ${data.description}`,
      ].join("\n"),
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Car:</strong> ${data.year} ${data.make} ${data.model}</p>
        <p><strong>Condition:</strong> ${data.condition}</p>
        <p><strong>ZIP:</strong> ${data.zipCode}</p>
        <p><strong>Details:</strong> ${data.description}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
