import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { instance } from '../../components/Url';
import { useAuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/ui/Loading';
import { Card, Dialog } from '@mui/material';
import { Edit } from 'lucide-react';
import { Checkbox } from '../../components/ui/FormElements';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminsAccess() {
    const { user } = useAuthContext()
    const [allUsers, setAllUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [dialog, setDialog] = useState(false)
    const [currentUser, setCurrentUser] = useState();

    async function fetchAllUsers() {
        await instance.get('/api/v1/auth/allusers/all')
            .then((response) => {
                setAllUsers(response.data);
                setIsLoading(false)
            })
            .catch((error) => {
                setAllUsers([]);
                setIsLoading(false)
            })
    }
    useLayoutEffect(() => {
        fetchAllUsers()
    }, [])
    useEffect(() => {
    }, [allUsers])

    const makeAdmin = async () => {
        await instance.post('/api/v1/auth/allusers/add', { email: currentUser.email })
            .then(() => {
                fetchAllUsers()
            })
            .catch((error) => {
                console.log(error);
                toast.error('An Error Occured')
            })
    }
    const makeUser = async () => {
        await instance.post(`/api/v1/auth/allusers/remove/`, { email: currentUser.email })
            .then(() => {
                fetchAllUsers()
            })
            .catch((error) => {
                console.log(error);
                toast.error('An Error Occured')
            })

    }

    return (
        <div>

            <div className="text-xl">Administior Access List</div>
            <Dialog
                open={dialog}
                onClose={() => { setDialog(false) }}
                currentUser={currentUser}
            >
                <div className='bg-white p-4 min-w-96 flex flex-col items-center justify-center gap-4'>
                    <div>Change Access of <span className='text-theme-1'>{currentUser?.name}</span> to <span className='text-theme-1'>{currentUser?.admin === true ? "User" : "Admin"}</span></div>

                    <div className=' w-fit' >
                        {
                            currentUser &&
                                currentUser?.admin === true
                                ?
                                <Button
                                    onClick={() => {
                                        makeUser()
                                        setDialog(false)
                                    }}
                                >Make User</Button>
                                :
                                <Button className='bg-theme-1 text-white'
                                    onClick={() => {
                                        makeAdmin()
                                        setDialog(false)
                                    }}
                                >Make Admin</Button>
                        }
                    </div>
                </div>

            </Dialog>

            {
                isLoading
                    ?
                    <Loading />
                    :
                    <DataGrid
                        rows={allUsers}
                        checkboxSelection={false}
                        style={{ fontSize: '0.8rem' }}
                        autoHeight={{ height: '100%' }}
                        disableSelectionOnClick
                        columns={[
                            {
                                field: "name",
                                headerName: <b>Name</b>,
                                width: 200,
                            },
                            {
                                field: "email",
                                width: 250,
                                headerName: <b>Email</b>,
                            },
                            {
                                field: "admin",
                                headerName: <b>Admin Access</b>,
                                width: 120,
                                renderCell: (params) => {
                                    return params.value ? <div className="text-theme-success">YES</div> : <div className="text-theme-danger">NO</div>
                                },
                            },
                            {
                                field: "edit",
                                width: 120,
                                headerName: <b>Change Access</b>,
                                sortable: false,
                                renderCell: (params) => {
                                    if (params.row.email === user.email) {
                                        return null
                                    }
                                    return <Button variant='ghost' size='icon' className='scale-75' onClick={() => { setDialog(true); setCurrentUser(params.row) }}><Edit /></Button>
                                },
                            },

                        ]}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />


            }

        </div>
    )
}
