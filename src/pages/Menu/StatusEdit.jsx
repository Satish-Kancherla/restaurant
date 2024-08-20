import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import { Grid, TextField, Card, CardContent, Box } from "@mui/material";
import * as FormElements from "../../components/ui/FormElements";
import { useFormValidation } from "../../hooks/useFormValidation";
// import { statusValidate } from "./StatusValidator.js";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Button from "../../components/ui/Button";
import { instance } from "../../components/Url";
import { statusValidate } from "./StatusValidator";
import { useAuthContext } from "../../contexts/AuthContext";
import { cn } from "../../lib/utils";
export default function StatusDialog({ open, rowData, setDialogOpen,fetchEmp }) {
    const navigate = useNavigate();

    const { user } = useAuthContext();
    const { formData, errors, changeHandle, handleSubmit, cleanup, setFormData } = useFormValidation(
        {
            empStatus: "",
            resignDate: "",
            exitDate: "",

        },
        (values) => {
            instance.put(`/api/v1/emp/employee/empseperation/${rowData.id}`, values)
                .then((res) => {
                    setDialogOpen(false);
                    // navigate("/dashboard/employee-status", {
                    //     state: { data: { ...formData } }
                    // })
                    fetchEmp()
                    cleanup()
                })

        },
        statusValidate
    );

    useEffect(() => {
        if (rowData) {
            setFormData({
                empStatus: rowData.active,
                resignDate: rowData.resignDate,
                exitDate: rowData.exitDate,
            })
        }
    }, [rowData])
    useEffect(() => {
        if (formData.empStatus === "active") {
            setFormData({
                ...formData,
                resignDate: "",
                exitDate: "",
            })
        }
    },[formData.empStatus])
    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="p-4  ">
                <Button variant='ghost' size='icon' className="ml-auto" onClick={closeDialog}>
                    <X />
                </Button>
                <div className="min-w-64">
                    <FormElements.Select
                        label="Active Status"
                        optionsArray={[
                            { id: "", name: "Select an Option" },
                            { id: "active", name: "Yes" },
                            { id: "notactive", name: "No" },
                        ]}
                        name="empStatus"
                        value={formData.empStatus}
                        onChange={changeHandle}
                        error={errors.empStatus}
                    />
                    <div className={cn(formData.empStatus==='active'&&"hidden")}>

                    <FormElements.Input
                        label="Resignation Date"
                        type="date"
                        className="w-full"
                        name="resignDate"
                        value={formData.resignDate}
                        onChange={changeHandle}
                        error={errors.resignDate}
                        />
                    <FormElements.Input
                        label="Exit Date"
                        type="date"
                        className="w-full"
                        name="exitDate"
                        value={formData.exitDate}
                        onChange={changeHandle}
                        error={errors.exitDate}
                    />
                    </div>
                    <Button
                        className="m-2 ml-auto "
                        onClick={() => { handleSubmit() }}

                    >
                        Update
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
