import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../app';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: env.EMAIL_PORT === 465, // true for 465, false for other ports
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    // Verify connection
    this.transporter.verify().then(() => {
      logger.info('Email transporter verified and ready to send');
    }).catch(err => {
      logger.error('Email transporter verification failed', { error: err.message });
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: `"Portfolio" <${env.EMAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.stripHtml(options.html),
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully', { messageId: info.messageId, to: options.to });
    } catch (error: any) {
      logger.error('Failed to send email', { error: error.message, to: options.to });
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  }

  async sendContactConfirmation(email: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for reaching out, ${name}!</h2>
        <p style="color: #666; line-height: 1.6;">
          Your message has been successfully received. I appreciate you taking the time to contact me.
        </p>
        <p style="color: #666; line-height: 1.6;">
          I will review your message and get back to you as soon as possible.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">
          Best regards,<br>
          Livingstone Oduor
        </p>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: 'We received your message',
      html,
    });
  }

  async sendPaymentSuccessNotification(email: string, amount: number, reference: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Thank you for your generous support! 🎉</h2>
        <p style="color: #666; line-height: 1.6;">
          Your payment has been successfully received and verified.
        </p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0; color: #333;"><strong>Payment Details:</strong></p>
          <p style="margin: 5px 0; color: #666;">Amount: <strong>KES ${amount.toLocaleString()}</strong></p>
          <p style="margin: 5px 0; color: #666;">Reference: <strong>${reference}</strong></p>
          <p style="margin: 5px 0; color: #666;">Date: <strong>${new Date().toLocaleString()}</strong></p>
        </div>
        <p style="color: #666; line-height: 1.6;">
          Your support means a lot to me and helps me continue creating great content. Thank you!
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">
          Best regards,<br>
          Livingstone Oduor
        </p>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Payment Successful - Thank You!',
      html,
    });
  }

  async sendAdminNotification(subject: string, html: string): Promise<void> {
    try {
      await this.sendEmail({
        to: env.EMAIL_FROM,
        subject: `[Admin] ${subject}`,
        html,
      });
    } catch (error) {
      logger.error('Failed to send admin notification', { error });
      // Don't throw - let admin notifications fail silently
    }
  }

  async sendContactSubmissionNotification(name: string, email: string, message: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Message:</strong></p>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #999; font-size: 12px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    await this.sendAdminNotification(`New Contact: ${name}`, html);
  }
}

const emailService = new EmailService();
export const sendEmail = (options: EmailOptions) => emailService.sendEmail(options);
export const sendContactConfirmation = (email: string, name: string) => 
  emailService.sendContactConfirmation(email, name);
export const sendPaymentSuccessNotification = (email: string, amount: number, reference: string) => 
  emailService.sendPaymentSuccessNotification(email, amount, reference);
export const sendContactSubmissionNotification = (name: string, email: string, message: string) => 
  emailService.sendContactSubmissionNotification(name, email, message);

