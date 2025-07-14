/* eslint-disable no-unused-vars */

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from '../services/apiClient';

const emptyContact = { name: '', phone: '', email: '' };

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [form, setForm] = useState(emptyContact);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getAllContacts();
      setContacts(data);
    } catch (e) {
      setError('Failed to load contacts');
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenModal = (contact = null) => {
    setEditingContact(contact);
    setForm(contact ? { ...contact } : emptyContact);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingContact(null);
    setForm(emptyContact);
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('All fields are required');
      toast.error('All fields are required');
      return;
    }
    setLoading(true);
    try {
      if (editingContact) {
        const updatedContact = await updateContact(editingContact._id, form);
        setContacts(
          contacts.map((contact) =>
            contact._id === editingContact._id ? updatedContact : contact
          )
        );
        toast.success('Contact updated successfully!');
      } else {
        const newContact = await createContact(form);
        setContacts([...contacts, newContact]);
        toast.success('Contact added successfully!');
      }
      handleCloseModal();
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || 'Failed to save contact';
      setError(errorMessage);
      toast.error(errorMessage);
      await fetchContacts(); // Fallback to refetch
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteToast = (onConfirm) => {
    toast.custom(
      (t) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            bgcolor: (theme) => theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 320,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography sx={{ flex: 1 }}>
            Are you sure you want to delete this contact?
          </Typography>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            sx={{ ml: 1 }}
          >
            Delete
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => toast.dismiss(t.id)}
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      ),
      { duration: 5000 }
    );
  };

  const handleDelete = async (id) => {
    confirmDeleteToast(async () => {
      setLoading(true);
      try {
        await deleteContact(id);
        setContacts(contacts.filter((contact) => contact._id !== id));
        toast.success('Contact deleted successfully!');
      } catch (e) {
        const errorMessage =
          e.response?.data?.message || 'Failed to delete contact';
        toast.error(errorMessage);
        await fetchContacts(); // Fallback to refetch
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        px: { xs: 1, sm: 3, md: 6 },
        py: 2,
        m: 4,
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)',
        background: (theme) => theme.palette.background.paper,
        overflow: 'hidden',
        width: '100%',
        maxWidth: '1200px',
        boxSizing: 'border-box',
        mx: 'auto',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            letterSpacing: 1,
          }}
        >
          Contacts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
          disabled={loading}
        >
          Add Contact
        </Button>
      </Stack>

      {loading && contacts.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography>Loading contacts...</Typography>
        </Box>
      ) : (
        <TableContainer
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 2px 12px 0 rgba(25, 118, 210, 0.07)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: (theme) =>
                    `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                }}
              >
                <TableCell
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 0,
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 0,
                  }}
                >
                  Phone
                </TableCell>
                <TableCell
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 0,
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 0,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, idx) => (
                <TableRow
                  key={contact._id}
                  sx={{
                    background:
                      idx % 2 === 0
                        ? 'rgba(25, 118, 210, 0.04)'
                        : 'rgba(25, 118, 210, 0.01)',
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell
                    sx={{ fontWeight: 500, color: 'text.primary', border: 0 }}
                  >
                    {contact.name}
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', border: 0 }}>
                    {contact.phone}
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', border: 0 }}>
                    {contact.email}
                  </TableCell>
                  <TableCell align="right" sx={{ border: 0 }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(contact);
                      }}
                      color="primary"
                      disabled={loading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(contact._id);
                      }}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {contacts.length === 0 && !loading && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ color: 'text.secondary', border: 0 }}
                  >
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        disableScrollLock
      >
        <DialogTitle>
          {editingContact ? 'Edit Contact' : 'Add Contact'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
            />
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {editingContact ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactsTable;
