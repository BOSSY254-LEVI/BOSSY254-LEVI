import { Router } from 'express';
import { submitContact, getContacts } from '../controllers/contact.controller';

const router = Router();

// POST /api/contact - Submit contact form
router.post('/', submitContact);

// GET /api/contact - Get all contacts (protected route - requires authentication)
router.get('/', getContacts);

export { router as contactRoutes };
