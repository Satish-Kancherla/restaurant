import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "./ui/Button";

const AlertDialog = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <span onClick={openDialog} className="py-2">Delete</span>
      <Dialog open={isOpen} onClose={closeDialog}>
        <div className="p-4 min-w-64 rounded-lg bg-white">
          <p className="font-medium py-2">Are you sure you want to delete this employee?</p>
          <div className="flex gap-2 justify-end mt-4">
            <Button onClick={closeDialog}>Cancel</Button>
            <Button
              variant="danger"
              onClick={async () => {
                await onDelete();
                closeDialog();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
