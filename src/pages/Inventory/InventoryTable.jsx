import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as FormElements from "../../components/ui/FormElements";
import AddInventory from "./AddInventory";
import { CircleFadingPlus } from "lucide-react";
import toast from "react-hot-toast"; // Notification
import { instance } from "../../components/Url"; // API handler

const columns = [
  { field: "itemcode", headerName: <b>Item Code</b>, width: 100,flex:0.5 },
  { field: "itemname", headerName: <b>Item Name</b>, type: "text", width: 200,flex:0.5 },
  { field: "unitofmeasure", headerName: <b>Unit Of Measure</b>, type: "text", width: 200,flex:0.5 },
  { field: "availablestock", headerName: <b>Available Stock</b>, type: "text", width: 200,flex:0.5 },
  { field: "reorderlevel", headerName: <b>Reorder Level</b>, type: "text", width: 200 },
];

export default function InventoryTable() {
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch inventory items when the component loads
  const fetchInventoryItems = async () => {
    try {
      const response = await instance.get("/api/v1/inventory"); // Replace with actual API endpoint
      setRows(response.data);
    } catch (error) {
      toast.error("Failed to load inventory items");
      console.error("Error fetching inventory items:", error);
    }
  };

  useEffect(() => {
    fetchInventoryItems(); // Fetch the data when the component mounts
  }, []);

  const handleAddItemClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveItem = async (newItem) => {
    try {
      await instance.post("/api/v1/inventory/create", newItem); // Replace with actual API endpoint
      // toast.success("Inventory item added successfully");
      fetchInventoryItems(); // Refresh data grid
    } catch (error) {
      toast.error("Error adding inventory item");
      console.error("Error saving inventory item:", error);
    }
    handleDialogClose();
  };

  return (
    <div className="w-[calc(100%-20px)]">
      <div className="flex justify-between">
        <p className="block tracking-wide text-zinc-600 text-2xl font-bold mr-2 mb-4">
          All Items
        </p>
        <div>
          <CircleFadingPlus className="cursor-pointer size-7" onClick={handleAddItemClick} />
        </div>
      </div>
      <DataGrid
        rows={rows}
        checkboxSelection={false}
        style={{ fontSize: "0.9rem" }}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <AddInventory
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleSave={handleSaveItem}
      />
    </div>
  );
}
