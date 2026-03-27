import nodemailer from 'nodemailer';

export async function sendLicenseEmail(to: string, licenseKey: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS environment variables');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Byt till din SMTP-leverantör om du vill
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: 'ReSight <no-reply@resight.se>',
    to,
    subject: 'Din licensnyckel till ReSight',
    text: `Hej! Här är din licensnyckel: ${licenseKey}`,
    html: `<p>Hej!</p><p>Här är din licensnyckel: <b>${licenseKey}</b></p>`
  });
}
