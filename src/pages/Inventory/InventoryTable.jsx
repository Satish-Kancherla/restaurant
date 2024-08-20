import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as FormElements from "../../components/ui/FormElements";
import AddItemDialog from "./AddInventory";
import { CircleFadingPlus, MessageSquarePlusIcon } from "lucide-react";
// import { SquarePlus } from 'lucide-react';

const columns = [
  { field: "itemcode", headerName: <b>Item Code</b>, width: 200 },
  {
    field: "itemname",
    headerName: <b>Item Name</b>,
    type: "text",
    width: 200,
  },
  {
    field: "unitofmeasure",
    headerName: <b>Unit Of Measure</b>,
    type: "text",
    width: 200,
  },
  {
    field: "availablestock",
    headerName: <b>Available Stock</b>,
    type: "text",
    width: 200,
  },
  {
    field: "reorderlevel",
    headerName: <b>Reorder Level</b>,
    type: "text",
    width: 100,
  },
  // {
  //   field: "isbillable",
  //   headerName: <b>Project Type</b>,
  //   type: "text",
  //   width: 100,
  //   flex: 0,
  // },
  // {
  //   field: "active",
  //   headerName: <b>Active</b>,
  //   type: "text",
  //   width: 100,
  //   flex: 0,
  //   renderCell: (params) => {
  //     return params?.value === "active" ? (
  //       <span className="text-theme-success">Yes</span>
  //     ) : (
  //       <span className="text-theme-danger">No</span>
  //     );
  //   },
  // },
];

const initialRows = [
  {
    id: "1",
    itemcode:"1",
    itemname: "tea",
    unitofmeasure: "Kg",
    availablestock: "8",
    reorderlevel: "2",
    
  },
];

export default function InventoryTable() {
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
          <CircleFadingPlus className="cursor-pointer" onClick={handleAddItemClick} />
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
