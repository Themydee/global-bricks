import { db } from "../db/index.js";
import { contacts } from "../db/schema.js";
import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

// Set your Brevo API key
apiInstance.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, company, projectType, message } = req.body;

    // Save to database
    const [newRequest] = await db.insert(contacts)
      .values({ name, email, phone, company, projectType, message })
      .returning();

    // Prepare Brevo email
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = `New Contact Request from ${name}`;
    sendSmtpEmail.sender = { name: "Global Red Bricks", email: "nifetemiboy@gmail.com" };
    sendSmtpEmail.to = [{ email: "temidayo.akanbi@kampuskonnekt49.com", name: "Admin" }];
    sendSmtpEmail.htmlContent = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `;

    // Send email via Brevo
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.status(201).json({
      success: true,
      message: "Contact request submitted successfully and email sent!",
      request: newRequest,
    });

  } catch (error) {
    console.error("❌ Error processing contact request:", error);
    res.status(500).json({
      success: false,
      message: "Server error while processing contact request",
      error: error.message,
    });
  }
};
