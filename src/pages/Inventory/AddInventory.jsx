import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

export default function AddInventory({ open, handleClose, handleSave }) {
  const [formData, setFormData] = useState({
    itemcode: '',
    itemname: '',
    unitofmeasure: '',
    availablestock: '',
    reorderlevel: ''
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
          label="Item Code"
          name="itemcode"
          value={formData.itemcode}
          onChange={handleChange}
          fullWidth
        />
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
          label="Unit Of Measure"
          name="unitofmeasure"
          value={formData.unitofmeasure}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Available Stock"
          name="availablestock"
          value={formData.availablestock}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Reorder Level"
          name="reorderlevel"
          value={formData.reorderlevel}
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
