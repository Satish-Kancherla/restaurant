import React, {
  useState
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as FormElements from "../../components/ui/FormElements";
import AddItemDialog from "./AddItemDialog";
import { CircleFadingPlus, MessageSquarePlusIcon } from "lucide-react";
// import { SquarePlus } from 'lucide-react';


const columns = [
  { field: "itemname", headerName: <b>Item Name</b>,  width: 200,flex:0.5 },
  {
    field: "type",
    headerName: <b>Type</b>,
    type: "text",
    width: 150,
  },
  { field: "image", headerName: <b>Image</b>, width: 150 },
  {
    field: "price",
    headerName: <b>Price</b>,
    type: "text",
    width:100,
    
  },
  {
    field: "status",
    headerName: <b>Status</b>,
    type: "text",
    width: 100,
  },
];

const initialRows = [
  {
    id:"1",
    itemname: "Employee 1",
    type: "Veg",
    image: "...",
    price: "10",
    status: "Awailable",
  },

];

export default function MenuItems() {
  const [rows, setRows] = useState(initialRows);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddItemClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveItem = (newItem) => {
    setRows([...rows, { id: rows.length + 1, ...newItem }]);
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
      <CircleFadingPlus className="cursor-pointer text-orange-600 size-7" onClick={handleAddItemClick}/> 
      </div>
      </div>
      <DataGrid
        rows={rows}
        checkboxSelection={false}
        style={{ fontSize: "0.8rem" }}
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
