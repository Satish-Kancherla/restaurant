import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

export default function AddItemDialog({ open, handleClose, handleSave }) {
  const [formData, setFormData] = useState({
    itemname: '',
    type: '',
    image: '',
    price: '',
    status: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Item Name"
          name="itemname"
          value={formData.itemname}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
