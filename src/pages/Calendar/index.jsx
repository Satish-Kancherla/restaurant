import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { instance } from '../../components/Url'
import { useAuthContext } from '../../contexts/AuthContext'
import Loading from '../../components/ui/Loading'
import { Dialog, DialogTitle, Menu, MenuItem } from '@mui/material'
import { Input, Textarea } from '../../components/ui/FormElements'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'
import { useFormValidation } from '../../hooks/useFormValidation'
import { ChevronDown, ChevronLeft, ChevronRight, Download, LoaderIcon, Plus } from 'lucide-react'
import axios from 'axios'

export default function Calender() {
    const { user } = useAuthContext()
    const [calender, setCalender] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [param, setParam] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false)

    const { formData, errors, cleanup, handleSubmit, changeHandle, setFormData } = useFormValidation(
        {
            date: '',
            title: '',
            description: ''
        },
        (values) => {

        },
        (values) => {
            const errors = {};
            if (!values.date.trim()) {
                errors.date = "Date is required";
            }
            if (!values.title.trim()) {
                errors.title = "Title is required";
            }
            return errors;
        }
    )
    useEffect(() => {
        if (param) {
            setFormData(prev => {
                return {
                    ...prev,
                    date: param.date,
                    title: param.title,
                    description: param.description
                }
            })
        }
    }, [param])

    const [year, setYear] = useState(new Date().getFullYear());

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    function getYears() {
        let years;
        for (let i = new Date().getFullYear() - 1; i <= 2030; i++) {
            years.push(i)
        }
        return years;
    }


    function fetchCalender() {
        instance.get(`/api/v1/cal/all?year=${year}`)
            .then((response) => {
                setCalender(response.data)
                // setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
                // setIsLoading(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleOpen = (data) => {
        setParam(data)
        setDialogOpen(true)
    }

    const handleClose = () => {
        setDialogOpen(false)
        cleanup()
        setParam(null)
    }

    const handleAdd = () => {
        instance.post('/api/v1/cal/add', formData)
            .then((response) => {
                fetchCalender()
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setParam(null)
                cleanup()
                setDialogOpen(false)
            })
    }
    const handleUpdate = () => {
        instance.put(`/api/v1/cal/update/${param?.id}`, formData)
            .then((response) => {
                fetchCalender()

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setParam(null)
                cleanup()
                setDialogOpen(false)
            })
    }

    const handleDelete = (data) => {
        instance.delete(`/api/v1/cal/delete/${data.id}`)
            .then((response) => {
                fetchCalender()
                toast.success('Event Removed from Calender')
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setParam(null)
                cleanup()
                setDialogOpen(false)
            })
    }
    useLayoutEffect(() => {
        setIsLoading(true)
        fetchCalender()
    }, [year])


    // bulk up cal

    const [fileData, setFileData] = useState()
    const filedataInputRef = useRef()
    const [fileMenu, setFileMenu] = useState(false)
    const [fileMenuAnchor, setFileMenuAnchor] = useState(false)
    const handleChangeFileData = (e) => {
        if (e.target.files[0]) {
            setFileData(e.target.files[0])
        }
    }

    function handleMenuOpen(e) {
        e.preventDefault();
        setFileMenuAnchor(e.currentTarget);
        setFileMenu(true);
    }
    const handleDownload = async () => {
        try {
            const userToken = user?.token;

            const response = await instance.get(
                '/api/public/admin/calendar.xlsx',
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'blob'
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'calendar.xlsx');
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            // Handle any errors here
            console.error('Error downloading file:', error);
        }
    };

    const handleFileUpload = () => {
        if (!fileData) {
            console.warn('Please select an excel file');
            return;
        }

        const formData = new FormData();
        formData.append('excel', fileData);
        instance.post(
            '/api/v1/cal/bulk',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 1000 * 60 * 2  //milliseconds*seconds*minutes
            }
        )
            .then((response) => {
                if (fileData) setFileData()
                toast.success(response.data.message)
                filedataInputRef.current.value = null
                fetchCalender()
                formData.delete('excel')
            })
            .catch((error) => {
                filedataInputRef.current.value = null
                toast.error(error.response.data.message)
                formData.delete('excel')
                setFileData()
            })

    }
    useEffect(() => {
        handleFileUpload()
    }, [fileData])






    if (isLoading) {
        return <Loading className={'inset-y-0 absolute inset-x-0 w-full m-0'} />
    }
    else
        return (
            <div className='bg-white p-4 rounded-lg'>
                <Dialog
                    open={Boolean(dialogOpen)}
                    onClose={handleClose}
                >
                    <div className="p-8 min-w-96">
                        <div className='text-lg font-normal py-4 '>
                            Event Title: &nbsp;
                            <span className='text-theme-1'>

                                {param?.title}
                            </span>
                        </div>
                        <Input
                            type='date'
                            name='date'
                            label={<span>Date <i className='text-theme-danger'>*</i></span>}
                            value={formData.date}
                            onChange={changeHandle}
                            error={errors.date}
                        />
                        <Input
                            name='title'
                            label={<span>Title <i className='text-theme-danger'>*</i></span>}
                            value={formData.title}
                            onChange={changeHandle}
                            error={errors.title}
                        />
                        <Textarea
                            className='min-h-32 max-h-96'
                            label={<span>Description</span>}
                            name='description'
                            value={formData.description}
                            onChange={changeHandle}
                            error={errors.description}
                        />
                        <div className="flex justify-between items-center">
                            {
                                param ?
                                    <>
                                        <Button variant='danger' onClick={() => { handleDelete(param) }}>Delete</Button>
                                        <Button variant='' onClick={handleUpdate}>Save</Button>
                                    </>
                                    :
                                    <Button variant='' onClick={handleAdd}>Add</Button>


                            }
                        </div>
                    </div>

                </Dialog>
                <div className="">
                    <span className='text-xl'>Company Holidays for year <span className='text-theme-1 font-medium'>{year}</span>   </span>
                    <div className="flex items-center gap-2 py-4">

                        <Button size='icon' className='rounded-full' onClick={() => { setYear(year - 1) }}><ChevronLeft /></Button>
                        <Button size='icon' className='rounded-full' onClick={() => { setYear(year + 1) }}><ChevronRight /></Button>
                        <div className="flex ml-auto">
                            <label htmlFor="upload-file" className=" flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-opacity-90 active:bg-opacity-60 active:scale-95  rounded-s-md flex-col bg-theme-2 text-theme-text h-10 px-4 min-w-10 py-2 ml-auto" title="Add Excel file to bulk Add employees">
                                {
                                    fileData ?
                                        <div className=" truncate max-w-64">{fileData?.name} <LoaderIcon className="animate-spin" /></div>
                                        :
                                        <>
                                            <div className="h-4">Upload Holiday List</div>
                                            <div className="text-xs text-zinc-700">(.xlsx)</div>
                                        </>
                                }
                            </label>
                            <input type="file" ref={filedataInputRef} id="upload-file" className="hidden" onChange={handleChangeFileData}
                                accept=" application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            />
                            <div className="bg-theme-2/20 w-0.5"></div>
                            <Button className='rounded-none rounded-e' size='icon' onClick={handleMenuOpen} ><ChevronDown /></Button>
                            <Menu
                                open={Boolean(fileMenu)}
                                onClose={() => { setFileMenu(false) }}
                                anchorEl={fileMenuAnchor}
                            >
                                <MenuItem onClick={handleDownload}><Download className="pr-2" />Download Template</MenuItem>
                            </Menu>
                        </div>
                        <Button size='icon' className='rounded-full ' onClick={() => { setDialogOpen(true) }}><Plus /></Button>
                    </div>
                </div>
                <Table className='w-full relative'>
                    <TableHeader className='hover:bg-none ' >
                        <TableRow className='text-theme-text font-medium text-base'>
                            <TableHead className=''>Date</TableHead>
                            <TableHead>Day</TableHead>
                            <TableHead>Event</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className='mt-20 '>
                        {
                            calender.length === 0
                                ?
                                <div className="mx-auto">No Event in Year {year}</div>
                                :
                                calender?.map((data) => {
                                    return (
                                        <TableRow key={data.id} onClick={() => { handleOpen(data) }} className='cursor-pointer  active:bg-theme-1/30 '>
                                            <TableCell className=''><span className='text-theme-1 font-medium'>{data.date.split('-').reverse()[0]}</span> {months[new Date(data.date).getMonth()]}</TableCell>
                                            <TableCell>{days[new Date(data.date).getDay()]}</TableCell>
                                            <TableCell className='capitalize'>{data?.title}</TableCell>
                                            {/* <TableCell className='truncate max-w-64 md:max-w-32'>{data?.description ? data?.description : "No description"}</TableCell> */}
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                    <TableFooter>

                    </TableFooter>
                </Table>
            </div>
        )
}
