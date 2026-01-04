import { Request, Response } from 'express';
import { z } from 'zod';
import { supabaseService } from '../services/supabase.service';
import { sendEmail, sendContactConfirmation, sendContactSubmissionNotification } from '../services/email.service';
import { logger } from '../app';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').trim(),
  email: z.string().email('Invalid email format').toLowerCase(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long').trim(),
});

export const submitContact = async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    // Save to Supabase
    const contact = await supabaseService.createContact(validatedData);

    // Send confirmation email to user
    try {
      await sendContactConfirmation(validatedData.email, validatedData.name);
    } catch (emailError) {
      logger.error('Failed to send confirmation email', { error: emailError });
      // Don't fail the request if confirmation email fails
    }

    // Send notification email to admin
    try {
      await sendContactSubmissionNotification(validatedData.name, validatedData.email, validatedData.message);
    } catch (emailError) {
      logger.error('Failed to send admin notification', { error: emailError });
      // Don't fail the request if admin notification fails
    }

    logger.info('Contact form submitted successfully', { contactId: contact.id, email: validatedData.email });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. Check your email for confirmation.',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        submittedAt: contact.created_at,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Validation failed for contact submission', { errors: error.errors });
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    logger.error('Contact submission error', { error: error instanceof Error ? error.message : error });
    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.',
    });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    // TODO: Add authentication middleware to protect this endpoint
    // For now, this is a public endpoint - consider adding API key or JWT authentication
    
    const contacts = await supabaseService.getContacts();

    logger.info('Contacts fetched', { count: contacts?.length || 0 });

    res.json({
      success: true,
      data: contacts || [],
      count: contacts?.length || 0,
    });
  } catch (error) {
    logger.error('Failed to fetch contacts', { error: error instanceof Error ? error.message : error });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Contact ID is required',
      });
    }

    await supabaseService.deleteContact(id);

    logger.info('Contact deleted', { contactId: id });

    res.json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    logger.error('Failed to delete contact', { error: error instanceof Error ? error.message : error });
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
    });
  }
};

