import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import toast from "react-hot-toast";
import { instance } from "../../components/Url";
import Button from "../../components/ui/Button";
import * as FormElements from "../../components/ui/FormElements";

export default function EditItemDialog({ open, handleClose, rowData, handleUpdate }) {
    const [formData, setFormData] = useState({
        itemname: "",
        type: "",
        // image: '',
        price: "",
        status: "",
    });

    useEffect(() => {
        if (rowData) {
            setFormData({
                itemname: rowData.itemname || "",
                type: rowData.type || "",
                price: rowData.price || "",
                status: rowData.status || "",
            });
        }
    }, [rowData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const updatedItem = { ...rowData, ...formData }; // Merge rowData with updated form data
            await instance.put(`http://localhost:5000/api/v1/menu/update/${rowData.id}`, updatedItem);
            toast.success("Item updated successfully");
            handleUpdate(updatedItem); // Call the parent function to refresh the data grid
        } catch (error) {
            console.error("Error updating item:", error);
            toast.error("Failed to update the item");
        }
        handleClose(); // Close the dialog
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogContent>
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
                        <FormElements.Input
                            label={
                                <span>
                                    Item Name 
                                </span>
                            }
                            type="text"
                            name="itemname"
                            value={formData.itemname}
                            onChange={handleChange}
                        />
                        <FormElements.Select
                            label={
                                <span>
                                    Type 
                                </span>
                            }
                            optionsArray={[
                                { id: "", title: "Select an Option" },
                                { value: "Veg", title: "Veg" },
                                { value: "Non-Veg", title: "Non-Veg" },
                            ]}
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
                        <FormElements.Input
                            label={
                                <span>
                                    Price 
                                </span>
                            }
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} className="bg-theme-danger">
                    Cancel
                </Button>
                <Button onClick={handleSave} className="bg-theme-success">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
