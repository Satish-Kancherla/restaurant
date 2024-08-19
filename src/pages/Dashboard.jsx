import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddEmployee from './AddEmployee/Index'
import useMediaQuery from '../hooks/useMediaQuery'
import { cn } from '../lib/utils'
import ViewEmployee from './ViewEmployee/Index'
import BreakUp from './Payroll/BreakUp'
import PaySlip from './Payroll/PaySlip'
import Welcome from './Welcome'
import EmployeeStatus from './ViewEmployee/EmployeeStatus'
import Payroll from './Payroll/Index'
import Calendar from './Calendar'
import Certificates from './Certificates/Index'
import Probation from './Certificates/Probation'
import EditEmployee from './EditEmployee/EditEmployee'
import SearchModal from '../components/SearchModal'
import { useAuthContext } from '../contexts/AuthContext'
import AdminsAccess from './AdminsAccess'
import OneTimeAccess from './OneTimeAccess'


export default function Dashboard() {
    const isLargeScreen = useMediaQuery('(max-width: 1024px)');
    const { user } = useAuthContext();
    if (user.admin === false)
        return (
            <Navigate to="/profile" replace />
        )
    else
    return (
        <div className=''>
            <div className="flex ">
                <Sidebar />
                <SearchModal />
                <div className={cn("routeswrapper  w-full  ", !isLargeScreen && "ml-[240px]")}>
                    <Navbar />
                    <div className="mt-[100px] px-4 pb-4">
                        <Routes>
                            <Route path='*' element={<Dashboard404 />} />
                            <Route path="/" element={<Navigate to='home' />} />
                            <Route path="/home" element={<Welcome />} />
                            <Route path='/add-employee' element={<AddEmployee />} />
                            <Route path='/edit-employee' element={<EditEmployee />} />
                            <Route path='/view-employee' element={<ViewEmployee />} />
                            <Route path='/admin-access' element={<AdminsAccess/>} />
                            <Route path='/holiday-list' element={<Calendar/>} />
                            <Route path='/payroll/*' element={<Payroll />} />
                            <Route path='/one-time-access' element={<OneTimeAccess />} />
                            <Route path='/employee-status' element={<EmployeeStatus />} />
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
    )
}

function Dashboard404() {
    useEffect(() => {

    })
    return (
        <div className='container'>
            dashboard 404
        </div>
    )
}