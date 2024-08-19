import React, { useEffect, useState } from "react";
import * as FormElements from "../../components/ui/FormElements";
import { useFormValidation } from "../../hooks/useFormValidation";
import { getUrl, instance } from "../../components/Url";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { Edit } from "lucide-react";
import EmpDialog from "./EmpDialog";
import Button from "../../components/ui/Button";

export default function Employeeposition({ form }) {
    const { formData, errors, changeHandle, handleSubmit } = form;

    const { user } = useAuthContext();
    const [department, setDepartment] = useState([]);
    const [division, setDivision] = useState([]);
    const [designation, setDesignation] = useState([]);
    const [project, setProject] = useState([]);
    const [locations, setLocations] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [empStatus, setEmpStatus] = useState([]);

    const [latch, setLatch] = useState(false)
    const url = getUrl();
    const fetchDept = async () => {
        instance.get('/api/v1/misc/departments')
            .then((response) => {
                setDepartment(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchDiv = async () => {
        instance.get('/api/v1/misc/divisions',)
            .then((response) => {
                setDivision(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchDesig = async () => {
        instance.get('/api/v1/misc/designations', {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            })
            .then((response) => {
                setDesignation(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchProj = async () => {
        instance.get('/api/v1/misc/projects')
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchLocations = async () => {
        instance.get(url + '/api/v1/misc/locations')
            .then((response) => {
                setLocations(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchAttendance = async () => {
        instance.get(url + '/api/v1/misc/attendance')
            .then((response) => {
                setAttendance(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchEmpStatus = async () => {
        instance.get('/api/v1/misc/empstatus')
            .then((response) => {
                setEmpStatus(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchDept()
        fetchDesig()
        fetchDiv()
        fetchProj()
        fetchLocations()
        fetchAttendance()
        fetchEmpStatus()
    }, [latch])
    const onSubmit = (data) => {
        console.log(data);
    };



    const [open, setOpen] = useState();
    const [dialogUrl, setDialogUrl] = useState('')
    const handleClose = () => {
        setOpen(false)
        setDialogUrl('')
    }


    return (
        <div className="container mx-auto  employee-details">
            {dialogUrl && <EmpDialog setLatch={setLatch} open={open} handleClose={handleClose} dialogUrl={dialogUrl} setDialogUrl={setDialogUrl} />}

            <div>
                {/* <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.Select
                        label="Grade"
                        optionsArray={[
                            { id: "", name: "Select an Option" },
                            { id: "audi", name: "Audi cars" },
                            { id: "merc", name: "Mercideez benz cars" },
                        ]}
                        name="grade"
                        value={formData.grade}
                        onChange={changeHandle}
                    // error={errors.grade}
                    />
                    <FormElements.Select
                        label="Cost Center"
                        optionsArray={[
                            { id: "", name: "Select an Option" },
                            { id: "audi", name: "Audi cars" },
                            { id: "merc", name: "Mercideez benz cars" },
                        ]}
                        name="costCenter"
                        value={formData.costCenter}
                        onChange={changeHandle}
                    // error={errors.costCenter}
                    />
                </div> */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                   
                    <FormElements.SearchableSelect
                        name="designationId"
                        value={formData.designationId}
                        onChange={changeHandle}
                         error={errors.designationId}

                        label={<span>Designation <span className="text-red-500">*</span></span>}
                        edit={
                            <Button secondary className='scale-[80%] p-1 mt-2' iconleft={<Edit />} onClick={() => { setDialogUrl(prev => ('/api/v1/misc/designations')); setOpen(true); }} />
                        }
                        options={[{ id: '', name: "Select an Option" }, ...designation]}
                    />
                    
                    <FormElements.SearchableSelect
                        label={<span>Location <span className="text-red-500">*</span></span>}
                        name="locationId"
                        value={formData.locationId}
                        onChange={changeHandle}
                         error={errors.locationId}
                        edit={
                            <Button secondary className='scale-[80%] p-1 mt-2' iconleft={<Edit />} onClick={() => { setDialogUrl(prev => ('/api/v1/misc/locations')); setOpen(true); }} />
                        }
                        options={[{ id: '', name: "Select an Option" }, ...locations]}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                   
                    <FormElements.SearchableSelect
                        label={<span>Division <span className="text-red-500">*</span></span>}
                        name="divisionId"
                        value={formData.divisionId}
                        onChange={changeHandle}
                         error={errors.divisionId}
                        edit={
                            <Button secondary className='scale-[80%] p-1 mt-2' iconleft={<Edit />} onClick={() => { setDialogUrl(prev => ('/api/v1/misc/divisions')); setOpen(true); }} />
                        }
                        options={[{ id: '', name: "Select an Option" }, ...division]}
                    />
                    <FormElements.SearchableSelect
                        label={<span>Department <span className="text-red-500">*</span></span>}
                        name="departmentId"
                        value={formData.departmentId}

                        onChange={changeHandle}
                         error={errors.departmentId}
                        edit={
                            <Button secondary className='scale-[80%] p-1 mt-2' iconleft={<Edit />} onClick={() => { setDialogUrl(prev => ('/api/v1/misc/departments')); setOpen(true); }} />
                        }
                        options={[{ id: '', name: "Select an Option" }, ...department]}
                    />


                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                
                    <FormElements.SearchableSelect
                        label={<span>Project <span className="text-red-500">*</span></span>}
                        name="projectId"
                        value={formData.projectId}
                        onChange={changeHandle}
                         error={errors.projectId}
                        edit={
                            <Button secondary className='scale-[80%] p-1 mt-2' iconleft={<Edit />} onClick={() => { setDialogUrl(prev =>('/api/v1/misc/projects')); setOpen(true); }} />
                        }
                        options={[{ id: '', name: "Select an Option" }, ...project]}
                    />


                    <FormElements.Input

                        label={<span>Project Allocation Date <span className="text-red-500">*</span></span>}
                        type='date'
                        name="projectDate"
                        value={formData.projectDate}
                        onChange={changeHandle}
                         error={errors.projectDate}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    
                    <FormElements.SearchableSelect
                        label={<span>Attendance Shift <span className="text-red-500">*</span></span>}
                        name="shiftId"
                        value={formData.shiftId}
                        onChange={changeHandle}
                         error={errors.shiftId}
                        edit={
                            <Button secondary className='scale-[80%] p-1 mt-2' iconleft={<Edit />} onClick={() => { setDialogUrl(prev => ('/api/v1/misc/attendance')); setOpen(true); }} />
                        }
                        options={[{ id: '', name: "Select an Option" }, ...attendance]}
                    
                    />



                    <FormElements.Select
                        label={<span>Project Type<span className="text-red-500">*</span></span>}
                        name="isBillable"
                        value={String(formData.isBillable)}
                        onChange={changeHandle}
                         error={errors.isBillable}
                        optionsArray={[
                            { id: "", name: "Select an Option" },
                            { id: "billable", name: "Billable" },
                            { id: "nonBillable", name: "Non Billable" },

                        ]}
                    />

                </div>
                {/* <div className="grid grid-cols-2 md:grid-cols-1 gap-5 ">
                    <FormElements.SearchableSelect
                        label={<span>Employee Status <span className="text-red-500">*</span></span>}
                        name="empStatusId"
                        value={formData.empStatusId}
                        onChange={changeHandle}
                         error={errors.empStatusId}
                        edit={
                            <Button secondary className='scale-[80%] p-1 mt-2' iconleft={<Edit />} onClick={() => { setDialogUrl(prev => ('/api/v1/misc/empstatus')); setOpen(true); }} />
                        }
                        options={[{ id: '', name: "Select an Option" }, ...empStatus]}
                    />
                </div> */}
            </div>
        </div>
    );
}
