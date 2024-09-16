import React, { startTransition, useCallback, useEffect, useLayoutEffect } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { cn } from "../lib/utils";
import { Eye, HandCoins, Home, UserPlus, Album, Calendar, HandPlatterIcon, NotebookPen, NotebookPenIcon, Landmark } from "lucide-react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link, NavLink, } from "react-router-dom";
import acqlogo from "../assets/logo2.png"
import useLoacationArray from "../hooks/useLoacationArray";

export default function Sidebar() {
    const { sidebar, setSidebar } = useGlobalContext();
    const isLargeScreen = useMediaQuery("(min-width:1023px)");
    const locArray = useLoacationArray()

    useEffect(() => {
        if (!isLargeScreen) setSidebar(false);
    }, [isLargeScreen]);


    return (
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
                <div className="fixed-panel w-60  bg-orange-600 text-white">
                    <div className=' grid place-items-center mt-5 mb-5  logo select-none' >
                        {/* <img className='h-10 text-start' src={acqlogo} alt='' /> */}
                        <div className="font-semibold">Restaurant</div>
                    </div>
                    <div className="flex flex-col  text-white font-[400] ">
                        <NavLink to='/dashboard/home' onClick={() => { setSidebar(false) }} className={({ isActive }) => cn("p-4 flex items-start justify-start duration-200 w-full gap-2", isActive && "bg-white text-zinc-800 font-semibold tracking-wider")}><Home/>Home</NavLink>
                        <NavLink to='/dashboard/orders' onClick={() => { setSidebar(false) }} className={({ isActive }) => cn("p-4 flex items-start justify-start duration-200 w-full gap-2", isActive && "bg-white text-zinc-800 font-semibold tracking-wider")}><HandPlatterIcon />Orders</NavLink>
                        <NavLink to='/dashboard/menus' onClick={() => { setSidebar(false) }} className={({ isActive }) => cn("p-4 flex items-start justify-start duration-200 w-full gap-2", isActive && "bg-white text-zinc-800 font-semibold tracking-wider")}><NotebookPen />Menu</NavLink>
                        <NavLink to='/dashboard/inventory' onClick={() => { setSidebar(false) }} className={({ isActive }) => cn("p-4 flex items-start justify-start duration-200 w-full gap-2", isActive && "bg-white text-zinc-800 font-semibold tracking-wider")}><Landmark />Inventory</NavLink>

                        {/* <NavLink to='/dashboard/payroll' onClick={() => { setSidebar(false) }} className={({ isActive }) => cn("p-4 flex items-start justify-start duration-200 w-full gap-2", isActive && "bg-white text-zinc-800 font-semibold tracking-wider")}><HandCoins />Payroll</NavLink> */}
                        {/* <NavLink to='/dashboard/holiday-list' onClick={() => { setSidebar(false) }} className={({ isActive }) => cn("p-4 flex items-start justify-start duration-200 w-full gap-2", isActive && "bg-white text-zinc-800 font-semibold tracking-wider")}><Calendar/>Holiday List</NavLink> */}
                    </div>

                </div>
            </div>
        </>
    );
}
