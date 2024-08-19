import { useState } from 'react';
import Dialog from '@mui/material/Dialog';

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const DialogComponent = ({ children }) => (
    <Dialog open={isOpen} onClose={closeDialog}>
      {children}
    </Dialog>
  );

  return { openDialog, closeDialog, DialogComponent };
};
