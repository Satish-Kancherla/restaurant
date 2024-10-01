import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddItemDialog from "./AddItemDialog";
import { CircleFadingPlus, Edit } from "lucide-react";
import { instance } from "../../components/Url";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import { Menu, MenuItem } from "@mui/material";
import AlertDialog from "../../components/DeleteDialog";
import EditItemDialog from "./EditItemDialog";

const columns = [
    { field: "itemname", headerName: <b>Item Name</b>, width: 200, flex: 0.7, sortable: false },
    { field: "type", headerName: <b>Type</b>, width: 150, flex: 0.5, sortable: false },
    { field: "price", headerName: <b>Price</b>, width: 100, flex: 0.5, sortable: false },
];

export default function MenuItems() {
    const [rows, setRows] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Fetch menu items when the component loads
    const fetchMenuItems = async () => {
        try {
            const response = await instance.get("/api/v1/menu");
            const capitalizedData = response.data.map((item) => ({
                ...item,
                itemname: item.itemname.charAt(0).toUpperCase() + item.itemname.slice(1),
            }));
            setRows(capitalizedData);
        } catch (error) {
            toast.error("Failed to load menu items");
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleAddItemClick = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSaveItem = async (newItem) => {
        try {
            await instance.post("/api/v1/menu/create", newItem);
            toast.success("Menu Item Added Successfully");
            fetchMenuItems(); // Refresh the data grid after adding a new item
        } catch (error) {
            console.error("Error saving item:", error);
            toast.error("Error adding menu item");
        }
        handleDialogClose();
    };

    const handleUpdate = (updatedItem) => {
        setRows((prevRows) => prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row)));
    };

    const handleDelete = async (id) => {
        try {
            await instance.delete(`/api/v1/menu/delete/${id}`);
            toast.success("Item deleted successfully");
            fetchMenuItems();
        } catch (error) {
            console.error("Failed to delete the item", error);
            toast.error("Failed to delete the item");
        }
    };

    return (
        <div className="w-[calc(100%-20px)]">
            <div className="flex justify-between">
                <p className="block tracking-wide text-zinc-600 text-xl font-bold mr-2 mb-4">Menu Items</p>
                <div>
                    <CircleFadingPlus className="cursor-pointer text-black size-7" onClick={handleAddItemClick} />
                </div>
            </div>
            <DataGrid
                rows={rows}
                checkboxSelection={false}
                style={{ fontSize: "0.9rem", color: "black", borderRadius: "20px", borderWidth: "2px" }}
                columns={[
                    ...columns,
                    {
                        field: "actions",
                        headerName: <b>Actions</b>,
                        width: 80,
                        sortable: false,
                        renderCell: (params) => <BasicMenu rowData={params.row} onDelete={() => handleDelete(params.row.id)} handleUpdate={handleUpdate} />,
                    },
                ]}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                disableColumnMenu
            />
            <AddItemDialog open={dialogOpen} handleClose={handleDialogClose} handleSave={handleSaveItem} />
        </div>
    );
}

export function BasicMenu({ rowData, onDelete, handleUpdate }) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setEditDialogOpen(true); // Open the edit dialog
    };

    return (
        <div>
            <Button
                variant="text"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Edit />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {" "}
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                {/* <MenuItem onClick={() => setAlertDialogOpen(true)} >
                    Delete
                </MenuItem> */}
                <MenuItem className="hover:bg-gray-600">
                    <EditItemDialog open={editDialogOpen} handleClose={() => setEditDialogOpen(false)} rowData={rowData} handleUpdate={handleUpdate} />
                </MenuItem>
                <AlertDialog
                    style={{ justifyContent: "center", cursor: "pointer" }}
                    open={alertDialogOpen}
                    onClose={() => setAlertDialogOpen(false)}
                    onDelete={async () => {
                        await onDelete();
                        setAlertDialogOpen(false);
                    }}
                />
            </Menu>
        </div>
    );
}
