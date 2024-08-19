import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import { cn } from '../lib/utils';
import * as FormElements from "./ui/FormElements";
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { useDeferredValue } from 'react';
import { X } from 'lucide-react';

export default function SearchModal({ children }) {
    const { isSearch, setIsSearch } = useGlobalContext();
    const searchRef = useRef();
    const locationList = [
        {
            name: "Add Employee",
            route: '/dashboard/add-employee',
        },
        {
            name: "Home",
            route: '/dashboard/home',
        },
        {
            name: "Payroll",
            route: '/dashboard/payroll',
        },
        {
            name: "View Employee",
            route: '/dashboard/view-employee',
        },
        {
            name: "Employee Table",
            route: '/dashboard/view-employee',
        },
    ]


    const [filteredList, setFilteredList] = useState(locationList);
    const filteredList_deferred = useDeferredValue(filteredList);
    const handleSearch = (e) => {
        const search = e.target.value
        if (search.length > 0) {
            setFilteredList(locationList.filter(data => data.name.toLowerCase().includes(search.toLowerCase())))
        } else {
            setFilteredList(locationList)
        }
    }
    useEffect(() => {
        if (isSearch) {
            console.log(searchRef.current)
            searchRef.current.focus();
        }
    }, [isSearch])

    return (
        <div className={cn('fixed z-30 inset-0 h-screen flex items-center justify-center opacity-0 pointer-events-none duration-150 ', isSearch && 'opacity-100 pointer-events-auto ')} >
            <div className={cn('z-10 p-4 shadow-xl bg-zinc-50 rounded-2xl w-8/12 h-4/6 max-w-2xl gap-1 relative overflow-hidden scale-90 translate-y-8 duration-150 ', isSearch && 'scale-100 translate-y-0')}>
                <div className="ml-auto w-min pb-2">
                    <Button variant="ghost" size="icon" className='h-5 w-5' onClick={()=>{setIsSearch(false)}}>
                        <X className='h-4'/>
                    </Button>
                </div>
                <FormElements.Input ref={searchRef} placeholder='Type to Search...' onChange={handleSearch} className="w-full h-min pb-2" />
                <div className="absolute bottom-0 h-8 w-full bg-gradient-to-b from-transparent to-white z-10 -translate-x-4 -translate-y-3"></div>
                <div className="list flex relative flex-col p-2 max-h-[calc(100%-3rem)] overflow-y-auto overflow-x-hidden ">
                    {
                        filteredList_deferred?.length === 0 ?
                                <div className=''>
                                    No results found
                                </div>
                        :
                        filteredList_deferred?.map((data,index) => {
                            return (
                                <Link to={data.route} key={index} className='py-2 px-2 rounded-md hover:bg-theme-1 hover:bg-opacity-80 hover:text-white font-semibold text-theme-text ' onClick={() => { setIsSearch(false) }}>{data.name}</Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className="absolute w-full h-full z-0 bg-theme-3/30" onClick={() => setIsSearch(false)}>
            </div>
        </div>
    )
}
