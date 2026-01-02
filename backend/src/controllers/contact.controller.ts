import { Request, Response } from 'express';
import { z } from 'zod';
import { supabaseService } from '../services/supabase.service';
import { sendEmail } from '../services/email.service';
import { logger } from '../app';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

export const submitContact = async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    // Save to Supabase
    const contact = await supabaseService.createContact(validatedData);

    // Send email notification
    try {
      await sendEmail({
        to: process.env.EMAIL_FROM || 'admin@example.com',
        subject: 'New Contact Form Submission',
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        `,
      });
    } catch (emailError) {
      logger.error('Failed to send contact email', { error: emailError });
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        submittedAt: contact.created_at,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      });
    } else {
      logger.error('Contact submission error', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form',
      });
    }
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await supabaseService.getContacts();

    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    logger.error('Failed to fetch contacts', { error });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    });
  }
};
