import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddEmployee from './Order/Index'
import useMediaQuery from '../hooks/useMediaQuery'
import { cn } from '../lib/utils'
import Welcome from './UserWelcome'
import Calendar from './Calendar'
import Inventory from './Inventory/Index'
import Menu from './Menu/Index'

export default function Dashboard() {
    const isLargeScreen = useMediaQuery('(max-width: 1024px)');
   
    return (
        <div className=''>
            <div className="flex bg-white w-full h-screen">
                <Sidebar />
                <div className={cn("routeswrapper  w-full  ", !isLargeScreen && "ml-[240px]")}>
                    <Navbar />
                    <div className="mt-[100px] px-4 pb-4">
                        <Routes>
                            <Route path='*' element={<Dashboard404 />} />
                            <Route path="/" element={<Navigate to='home' />} />
                            <Route path="/home" element={<Welcome />} />
                            <Route path='/orders' element={<AddEmployee />} />
                            <Route path='/menus' element={<Menu />} />
                            <Route path='/inventory' element={<Inventory />}/>
                            <Route path='/holiday-list' element={<Calendar/>} />
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