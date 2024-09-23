import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '../../components/ui/Button'; 
import * as FormElements from '../../components/ui/FormElements'; 
import toast from "react-hot-toast";
import { instance } from '../../components/Url';

export default function AddItemDialog({ open, handleClose, handleSave }) {
  const [formData, setFormData] = useState({
    itemname: '',
    type: '',
    // image: '',
    price: '',
    status: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = () => {
  //   handleSave(formData);
  //   handleClose();
  // };

  const handleSubmit = async () => {
    try {
      await handleSave(formData); // Call the passed save function
      // toast.success("Item added successfully");
      setFormData({
        itemname: '',
        type: '',
        // image: '',
        price: '',
        status: ''
      }); // Reset the form
      handleClose(); // Close the dialog after submission
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.error("Error submitting form");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#52525b' }}>Add New Item</DialogTitle>
      <DialogContent>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            <FormElements.Input
              label={<span>Item Name <span className="text-red-500">*</span></span>}
              type="text"
              name="itemname"
              value={formData.itemname}
              onChange={handleChange}
            />
            <FormElements.Input
              label={<span>Type <span className="text-red-500">*</span></span>}
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            {/* <FormElements.Input
              label={<span>Image URL <span className="text-red-500">*</span></span>}
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            /> */}
            <FormElements.Input
              label={<span>Price <span className="text-red-500">*</span></span>}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
             <FormElements.Input
              label={<span>Status <span className="text-red-500">*</span></span>}
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
            {/* <FormElements.Input
              label={<span>Status <span className="text-red-500">*</span></span>}
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
            /> */}
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
