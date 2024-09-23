import React, {
  useEffect,
  useState
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as FormElements from "../../components/ui/FormElements";
import AddItemDialog from "./AddItemDialog";
import { CircleFadingPlus, MessageSquarePlusIcon } from "lucide-react";
import { instance } from "../../components/Url";
import toast from "react-hot-toast";

// import { SquarePlus } from 'lucide-react';


const columns = [
  { field: "itemname", headerName: <b>Item Name</b>,  width: 200,flex:1.0 },
  {
    field: "type",
    headerName: <b>Type</b>,
    type: "text",
    width: 150,flex:0.5
  },
  // { field: "image", headerName: <b>Image</b>, width: 150,flex:0.5 },
  {
    field: "price",
    headerName: <b>Price</b>,
    type: "text",
    width:100,flex:0.5
    
  },
  {
    field: "status",
    headerName: <b>Status</b>,
    type: "text",
    width: 100,
  },
];


export default function MenuItems() {
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

   // Fetch menu items when the component loads
   const fetchMenuItems = async () => {
    try {
      const response = await instance.get("http://localhost:5000/api/v1/menu");
      setRows(response.data); // Update state with fetched menu items
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

  // const handleSaveItem = (newItem) => {
  //   setRows([...rows, { id: rows.length + 1, ...newItem }]);
  // };

  const handleSaveItem = async (newItem) => {
    try {
      await instance.post("http://localhost:5000/api/v1/menu/create", newItem);
      toast.success("Menu Item Added Successfully");
    fetchMenuItems(); // Refresh the data grid after adding a new item
  } catch (error) {
    // Log the error in more detail
    console.error("Error saving item:", error);
    toast.error("Error adding menu item");
    }
    handleDialogClose();
};
  
  
  // if (isLoading) {
  //   return <Loading className="py-64" />;
  // }
  return (
    <div className="w-[calc(100%-20px)]">
      <div className="flex justify-between">
      <p className="block tracking-wide text-zinc-600 text-2xl font-bold mr-2 mb-4">
        All Items
      </p>
      <div>
      <CircleFadingPlus className="cursor-pointer text-green-700 size-7" onClick={handleAddItemClick}/> 
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
       <AddItemDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleSave={handleSaveItem}
      />
     
    </div>
  );
}

// export function BasicMenu({ rowData, onDelete, fetchEmp }) {
//   const [statusdialogOpen, setStatusDialogOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [alertDialogOpen, setAlertDialogOpen] = useState(false); 
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

  
//   return (
//     <div>
      
//       <StatusDialog
//         open={statusdialogOpen}
//         rowData={rowData}
//         setDialogOpen={setStatusDialogOpen}
//         fetchEmp={fetchEmp}
//       />     
//     </div>
//   );
// }
