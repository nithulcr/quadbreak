import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type FormData = {
  name: string;
  email: string;
  number: string;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, number, message } = req.body as FormData;

  if (!name || !email || !number || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Terrah Website" <${process.env.EMAIL_USER}>`,
      to: 'terrahconnects@gmail.com',
      subject: 'New Contact Message from Terrah Website',
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${number}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log('✅ Email sent successfully:', info.messageId);

    return res.status(200).json({ success: true });
  } 
  catch (error: unknown) {
  let errorMessage = 'Failed to send email';

  if (error instanceof Error) {
    errorMessage = error.message;
    console.error('❌ Error sending email:', error.message);
  } else {
    console.error('❌ Unknown error sending email:', error);
  }

  return res.status(500).json({ success: false, error: errorMessage });
  }
}
