import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { ChevronDown, UserCog } from "lucide-react";
import * as FormElements from "../../components/ui/FormElements";
import axios from "axios";
import { getUrl, instance } from "../../components/Url";
import { useAuthContext } from "../../contexts/AuthContext";
import { Edit } from "lucide-react";
import Button from "../../components/ui/Button";
import { v4 } from "uuid";
const OrderDetails = ({ form, statusInp = true }) => {
    const { formData, errors, changeHandle, handleSubmit, setFormData } = form
    const [reportingManager, setReportingManager] = useState([]);
    const [autoEmp, setAutoEmp] = useState('');
    const autoEmpId = useRef()
    const [latch, setLatch] = useState(false)
    const url = getUrl();
    // if(user){}

   
    
  

    const [open, setOpen] = useState();
    const [dialogUrl, setDialogUrl] = useState('')
    const handleClose = () => {
        setOpen(false)
        setDialogUrl('')
    }
    return (
        <div className="container mx-auto employee-details  ">

            <div className="employee-form"  >
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    {statusInp && <FormElements.Select
                        label={<span>Category <span className="text-red-500">*</span></span>}
                        optionsArray={[
                            { id: "", name: "Select an Option" },
                            { id: "auto", name: "Automatic" },
                            { id: "manual", name: "Manual" },
                        ]}
                        name="empSeries"
                        value={formData.empSeries}
                        onChange={changeHandle}
                        error={errors.empSeries}
                    />}
                    {/* <div className="flex items-center gap-2"> */}

                    <FormElements.Select
                        label={<span>Item Name <span className="text-red-500">*</span></span>}
                        optionsArray={[
                            { id: '', title: "Select an Option" },
                            { value: "Confirmed", title: "Confirmed" },
                            { value: "Consultant", title: "Consultant" },
                            { value: "Probation", title: "Probation" },
                        ]}
                        name="status"
                        value={formData.status}
                        onChange={changeHandle}
                        error={errors.status}
                    />
                        
                    {/* </div> */}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label={<span>Notes <span className="text-red-500">*</span></span>}
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={changeHandle}
                        error={errors.fname}
                    />
                    <FormElements.Input
                        label={<span>Quantity <span className="text-red-500">*</span></span>}
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={changeHandle}
                        error={errors.lname}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Input
                        label={<span>Unit Price <span className="text-red-500">*</span></span>}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandle}
                        error={errors.email}
                    />
                    <FormElements.Input
                        label={<span>Total <span className="text-red-500">*</span></span>}
                        type="date"
                        name="doj"
                        value={formData.doj}
                        onChange={changeHandle}
                        error={errors.doj}
                    />

                </div>
                
               
            </div>
        </div>
    );
};
export default OrderDetails;
