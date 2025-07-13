/* eslint-disable react/prop-types */
import { Alert, Snackbar } from '@mui/material';

export default function Toast({
  open,
  onClose,
  message,
  severity = 'success',
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
