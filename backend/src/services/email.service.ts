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
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: `"Portfolio Contact" <${env.EMAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully', { messageId: info.messageId, to: options.to });
    } catch (error) {
      logger.error('Failed to send email', { error, to: options.to });
      throw new Error('Failed to send email');
    }
  }
}

const emailService = new EmailService();
export const sendEmail = (options: EmailOptions) => emailService.sendEmail(options);
