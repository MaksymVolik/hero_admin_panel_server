import nodemailer from "nodemailer";

export async function sendActivationMail(to, link) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Account activation on " + process.env.API_URL,
    text: "",
    html: `
        <div>
            <h1>To activate, follow the link</h1>
            <a href="${link}">${link}</a>
        </div>
      `,
  });
}
