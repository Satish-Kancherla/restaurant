import React, { useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'
import Payroll from './Payroll/Index'
import UserWelcome from '../pages/UserWelcome'
import { cn } from '../lib/utils'
import { Menu, MenuItem } from '@mui/material'
import { Bell, LayoutDashboard, LogOut, MenuIcon, UserRound } from 'lucide-react'
import Button from '../components/ui/Button'
import { useAuthContext } from '../contexts/AuthContext'
import acqlogo from "../assets/logo.svg"
import useLoacationArray from '../hooks/useLoacationArray'
import Settings from './Setttings'
import Calendar from "./Calendar/index"
import EditEmployee from './EditEmployee/index'


const Profile = () => {

    const isLargeScreen = useMediaQuery('(max-width: 1024px)');
    const { user, dispatch } = useAuthContext();
    let admin = user.admin;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sidebar, setSidebar] = useState(false)
    const open = Boolean(anchorEl);
    const urlArray = useLoacationArray();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <div className="flex ">
                <>
                    <div
                        className={cn(
                            "fixed inset-0 z-30 duration-200  pointer-events-none",
                            sidebar
                            && " pointer-events-auto"
                        )}
                        onClick={() => setSidebar(false)}
                    ></div>
                    <div
                        className={cn(
                            "h-[calc(100vh)] fixed flex bg-white z-30 duration-150 lg:-translate-x-full ",
                            sidebar && "lg:translate-x-0 shadow-2xl shadow-black/35"
                        )}
                    >
                        <div className="fixed-panel w-60  bg-theme-2 bg-opacity-70 text-white">
                            <div className=' grid place-items-center my-8 mb-5  logo select-none' >
                                <img className='h-10 text-start  ' src={acqlogo} alt='' />
                                <div className="font-semibold text-theme-text">Accentiqa</div>
                            </div>
                            <div className="flex flex-col  text-theme-text font-[400] ">
                                <NavLink to='/profile/home' onClick={()=>{setSidebar(false)}} className={({ isActive}) => cn("p-4 flex items-start justify-start duration-200",isActive&&"bg-white font-semibold")}>Home</NavLink>
                                <NavLink to='/profile/settings' onClick={()=>{setSidebar(false)}} className={({ isActive}) => cn("p-4 flex items-start justify-start duration-200",isActive&&"bg-white font-semibold")}>Settings</NavLink>
                                {/* <NavLink to='/profile/edit' onClick={()=>{setSidebar(false)}} className={({ isActive}) => cn("p-4 flex items-start justify-start duration-200",isActive&&"bg-white font-semibold")}>Edit</NavLink> */}
                                <NavLink to='/profile/payroll' onClick={()=>{setSidebar(false)}} className={({ isActive}) => cn("p-4 flex items-start justify-start duration-200",isActive&&"bg-white font-semibold")}>Payroll</NavLink>
                                <NavLink to='/profile/holiday-list' onClick={()=>{setSidebar(false)}} className={({ isActive}) => cn("p-4 flex items-start justify-start duration-200",isActive&&"bg-white font-semibold")}>Holiday List</  NavLink>
                            </div>
                        </div>

                    </div>
                </>
                <div className={cn("routeswrapper  w-full  ", !isLargeScreen && "ml-[240px]")}>
                    <div className="navbar">
                        <div className={cn('fixed left-15rem lg:left-0 h-20 flex justify-between w-[calc(100%-15rem)] lg:w-full  items-center z-10  bg-white bg-opacity-90 backdrop-blur-sm font-medium py-4  border-b')}>
                            <div className='flex items-center  mx-2 lg:ml-1 logo select-none box-border' >
                                <MenuIcon className='hidden lg:grid min-w-6 mx-4 cursor-pointer' onClick={() => { setSidebar(true) }} />
                                <div className='text-theme-1 text-xl capitalize flex items-center'>
                                    {urlArray[1]?.split('-').map((str) => str[0].toUpperCase() + str.slice(1) + ' ')}
                                </div>
                            </div>
                            <div className='flex items-center gap-4 text-2xl text-zinc-700 box-border mr-2'>
                                <Bell className="cursor-pointer" />
                                <div onClick={handleClick} className="cursor-pointer uppercase h-9 w-9 m-1 text-lg bg-orange-700 select-none flex items-center justify-center rounded-full text-white ">
                                    {user && user.name.split(' ').map((str, i) => { if (i < 2) return str[0] })}
                                </div>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <div className='flex w-full items-center px-4 ' >
                                        <div className="uppercase h-6 w-6 text-xs bg-theme-1 select-none flex items-center justify-center rounded-full text-white">
                                            {user && user.name.split(' ').map((str, i) => { if (i < 2) return str[0] })}
                                        </div>
                                        {user && <div className='mx-2 max-w-24 truncate capitalize text-theme-1 font-semibold text-lg'>{user.name}</div>}
                                    </div >
                                    <hr className='my-2' />
                                    {admin===true&&<Link to='/dashboard'>
                                        <MenuItem onClick={handleClose} >
                                            <LayoutDashboard className='text-theme-text w-5 mr-2 ' />
                                            Admin Dashboard
                                        </MenuItem>
                                    </Link>}
                                    <MenuItem onClick={() => { dispatch({ type: 'LOGOUT' }) }}><LogOut className='text-theme-text w-5 mr-2 cursor-pointer' />Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[100px] px-4 pb-4">
                        <Routes>
                            <Route path='*' element={<Profile404 />} />
                            <Route path="/" element={<Navigate to='home' />} />
                            <Route path="/home" element={<UserWelcome />} />
                            <Route path="/settings" element={ <Settings/>}/>
                            <Route path="/edit" element={ <EditEmployee />}/>
                            <Route path='/holiday-list' element={<Calendar />} />
                            <Route path='/payroll/*' element={<Payroll />} />
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile




function Profile404() {

    return (
        <div className='container'>
            Profile 404
        </div>
    )
}