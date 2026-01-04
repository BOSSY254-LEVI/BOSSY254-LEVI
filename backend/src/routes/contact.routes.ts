import { Router } from 'express';
import { submitContact, getContacts, deleteContact } from '../controllers/contact.controller';

const router = Router();

/**
 * POST /api/contact
 * Submit contact form
 */
router.post('/', submitContact);

/**
 * GET /api/contact
 * Get all contacts (protected route - requires authentication)
 * TODO: Add authentication middleware
 */
router.get('/', getContacts);

/**
 * DELETE /api/contact/:id
 * Delete a contact (protected route - requires authentication)
 * TODO: Add authentication middleware
 */
router.delete('/:id', deleteContact);

export { router as contactRoutes };

