import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '../../components/ui/Button'; // Assuming this is the same custom Button component
import * as FormElements from '../../components/ui/FormElements'; // Consistent form styling
import toast from "react-hot-toast"; // Notification
import { instance } from '../../components/Url'; // Assuming you have this for API requests

export default function AddInventory({ open, handleClose, handleSave }) {
  const [formData, setFormData] = useState({
    itemname: '',
    unitofmeasure: '',
    availablestock: '',
    reorderlevel: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await handleSave(formData); // Save the new inventory item
      // toast.success("Inventory item added successfully");

      // Reset form data
      setFormData({
        itemname: '',
        unitofmeasure: '',
        availablestock: '',
        reorderlevel: ''
      });

      handleClose(); // Close the dialog after success
    } catch (error) {
      console.error("Error saving inventory item:", error);
      toast.error("Error submitting form"); // Error toast
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle  sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#52525b' }}>Add New Inventory Item</DialogTitle>
      <DialogContent>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            {/* <FormElements.Input
              label={<span>Item Code <span className="text-red-500">*</span></span>}
              type="text"
              name="itemcode"
              value={formData.itemcode}
              onChange={handleChange}
            /> */}
            <FormElements.Input
              label={<span>Item Name <span className="text-red-500">*</span></span>}
              type="text"
              name="itemname"
              value={formData.itemname}
              onChange={handleChange}
            />
             <FormElements.Input
              label={<span>Unit Of Measure <span className="text-red-500">*</span></span>}
              type="text"
              name="unitofmeasure"
              value={formData.unitofmeasure}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
           
            <FormElements.Input
              label={<span>Available Stock <span className="text-red-500">*</span></span>}
              type="number"
              name="availablestock"
              value={formData.availablestock}
              onChange={handleChange}
            />
             <FormElements.Input
              label={<span>Reorder Level <span className="text-red-500">*</span></span>}
              type="number"
              name="reorderlevel"
              value={formData.reorderlevel}
              onChange={handleChange}
            />
          </div>
          
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="bg-theme-danger">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-theme-success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
