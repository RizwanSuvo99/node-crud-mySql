import express from 'express';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContactById,
} from './contactsController.mjs';

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContactById);
router.delete('/:id', deleteContactById);

export default router;
