import { useEffect, useLayoutEffect, useState } from "react";
import { instance } from "../../components/Url"
import { useAuthContext } from "../../contexts/AuthContext"
import Button from "../../components/ui/Button";
import { Card, Dialog, emphasize } from "@mui/material";
import { useLocation } from "react-router-dom";
import * as FormElements from "../../components/ui/FormElements";
import { useFormValidation } from "../../hooks/useFormValidation";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Plus, Trash, Trash2 } from "lucide-react";
import Loading from "../../components/ui/Loading";

export default function HikesTable() {
    const { user } = useAuthContext();
    const [empHikes, setEmpHikes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editData,setEditData] = useState()
    const { state } = useLocation();
    
    function fetchEmpHikes() {
        instance.get(`/api/v1/emp/emphikes/one/${state.data.id}`)
            .then((response) => {
                setEmpHikes(response.data)
                console.log("hikes",response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false)

            })
    }

    useLayoutEffect(() => {
        fetchEmpHikes()
    }, [])

    const handleDelete = (id) => {
        instance
            .delete(`/api/v1/emp/emphikes/${id}`)
            .then((response) => {
                const newData = empHikes.filter((obj) => (obj.id !== response.data.id))
                toast.success('Deleted salary hike');
                setEmpHikes((prev)=>{
                    return prev.filter((obj) => (obj.id !== response.data.id))
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (isLoading)
        return <Loading className='min-h-32'/>
    else
        return (
            <div >
                <Button onClick={() => { setAddDialogOpen(true) }}>
                    <Plus className="mr-3"/>
                    <div className=" text-start">
                        <div className="text-sm">Hike</div>
                        <div className="text-xs -mt-1">This employee</div>
                    </div>
                </Button>
                <div className=" p-4">
                    All Hikes Of <span className="text-theme-1 font-medium">{state?.data?.name}</span>
                </div>
                {
                    empHikes.length > 0
                        ?
                        <DataGrid
                            rows={empHikes}
                            checkboxSelection={false}
                            style={{ fontSize: '0.8rem' }}
                            columns={[
                                { field: "empNo", headerName: <b>ID</b>, width: 100 },
                                { field: "newSalary", headerName: <b>Salary</b>, width: 120 ,
                                    valueFormatter:(params)=>{
                                        return 'Rs.'+params.value
                                    }
                                },
                                {
                                    field: "date",
                                    headerName: <b>Date</b>,
                                    width: 120,
                                    valueFormatter: (params) => {
                                        return params.value.split('-').reverse().join(' - ');
                                    },
                                },
                                {
                                    field: "edit",
                                    headerName: <b>Edit</b>,
                                    width: 50,
                                    sortable: false,
                                    renderCell: (params) => (
                                        <Button variant='ghost'size='icon' className='scale-75' onClick={()=>{setEditDialogOpen(true); setEditData(params.row)}}><Edit className="text-theme-1 mx-2"/></Button>
                                    ),
                                },
                                {
                                    field: "delete",
                                    headerName: <b>Delete</b>,
                                    width: 60,
                                    sortable: false,
                                    renderCell: (params) => (
                                        <Button variant='ghost'size='icon' className='scale-75' onClick={()=>{
                                            handleDelete(params?.row?.id);
                                        }}><Trash2 className="text-theme-danger"/></Button>
                                    ),
                                },
                            ]}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                        />
                        :
                        <div className="flex items-center justify-center min-h-32">Employee has no hikes</div>
                }
                <AddHikes dialogOpen={addDialogOpen} setDialogOpen={setAddDialogOpen} data={state?.data} setEmpHikes={setEmpHikes}  />
                <EditHikes dialogOpen={editDialogOpen} setDialogOpen={setEditDialogOpen} data={state?.data} setEmpHikes={setEmpHikes} editData={editData} />
            </div>
        )
}




function AddHikes({ dialogOpen, setDialogOpen, setEmpHikes, data }) {

    const closeDialog = () => {
        setDialogOpen(false);
    }

    const { user } = useAuthContext();

    function validate(values) {
        const errors = {};
        if (!values.newSalary) {
            errors.newSalary = "salary is required";
        } else if (!values.date.trim()) {
            errors.date = "salary is required";
        }
        return errors;
    }
    const { formData, errors, handleSubmit, cleanup, changeHandle } = useFormValidation(
        {
            newSalary: 0,
            date: ''
        },
        (values) => {
            let status = 400
            console.log();
            instance.post(`/api/v1/emp/emphikes/${data?.id}`, formData,)
                .then((response) => {
                    setEmpHikes(prev => ([...prev, response.data]));
                    setDialogOpen(prev => !prev)
                    toast.success(`hiked salary of ${data?.name} to ${response.data.newSalary}`);
                    status = 200;
                    cleanup()
                })
                .catch((error) => {
                    status = 400;

                })
            return { status }
        },
        validate
    )
    return (
        <Dialog
            open={dialogOpen}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Card >
                <div className="form p-8 ">
                    <div className="text-xl mb-2">Give a Hike to <span className="text-theme-1 font-medium capitalize">{data?.name}</span></div>
                    <FormElements.Input
                        label={<span>New Salary <span className="text-theme-danger">*</span></span>}
                        value={formData.newSalary}
                        error={errors.newSalary}
                        name={'newSalary'}
                        onChange={changeHandle}
                    />
                    <FormElements.Input
                        label={<span>Date <span className="text-theme-danger">*</span></span>}
                        value={formData.date}
                        error={errors.date}
                        name={'date'}
                        onChange={changeHandle}
                        type='date'
                    />
                    <Button onClick={handleSubmit}>
                        Hike
                    </Button>
                </div>
            </Card>
        </Dialog>
    )
}
function EditHikes({ dialogOpen, setDialogOpen, setEmpHikes, data,editData }) {

    useEffect(()=>{
        if(editData?.date){
            setFormData(prev=>({
                ...prev,
                newSalary:editData?.newSalary,
                date:editData?.date
            }))
        }
    },[editData])
    const closeDialog = () => {
        setDialogOpen(false);
    }

    const { user } = useAuthContext();

    function validate(values) {
        const errors = {};
        if (!values.newSalary) {
            errors.newSalary = "salary is required";
        } else if (!values.date.trim()) {
            errors.date = "salary is required";
        }
        return errors;
    }
    const { formData, errors, handleSubmit, cleanup, changeHandle,setFormData } = useFormValidation(
        {
            newSalary: 0,
            date: ''
        },
        (values) => {
            let status = 400
            instance.put(`/api/v1/emp/emphikes/${editData?.id}`, formData)
                .then((response) => {
                    setEmpHikes(prev=>{
                        return prev.map((obj) => (
                            obj.id === response.data.id
                                ?
                                response.data
                                :
                                obj
                        ))
                    });

                    setDialogOpen(prev => !prev)
                    toast.success(`Edited salary of ${data?.name} to ${response.data.newSalary}`);
                    cleanup()
                    status = 200;
                })
                .catch((error) => {
                    status = 400;

                })
            return { status }
        },
        validate
    )
    return (
        <Dialog
            open={dialogOpen}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Card >
                <div className="form p-8 ">
                    <div className="text-xl mb-2">Edit this Hike for <span className="text-theme-1 font-medium capitalize">{data?.name}</span></div>
                    <FormElements.Input
                        label={<span>New Salary <span className="text-theme-danger">*</span></span>}
                        value={formData.newSalary}
                        error={errors.newSalary}
                        name={'newSalary'}
                        onChange={changeHandle}
                    />
                    <FormElements.Input
                        label={<span>Date <span className="text-theme-danger">*</span></span>}
                        value={formData.date}
                        error={errors.date}
                        name={'date'}
                        onChange={changeHandle}
                        type='date'
                    />
                    <Button onClick={handleSubmit}>
                        Update
                    </Button>
                </div>
            </Card>
        </Dialog>
    )
}