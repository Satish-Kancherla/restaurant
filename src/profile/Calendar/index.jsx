import React, { useLayoutEffect, useState } from 'react'
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
import Button from '../../components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Calendar() {
    const { user } = useAuthContext()
    const [calender, setCalender] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [year, setYear] = useState(new Date().getFullYear());

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]




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





    useLayoutEffect(() => {
        setIsLoading(true)
        fetchCalender()
    }, [year])


    if (isLoading) {
        return <Loading className={'h-64'} />
    }
    else
        return (
            <div>

                <div className="">
                    <span className='text-xl'>Company Holidays for year <span className='text-theme-1 font-medium'>{year}</span>   </span>
                    <div className="flex items-center gap-2 py-4">

                        <Button size='icon' className='rounded-full' onClick={() => { setYear(year - 1) }}><ChevronLeft /></Button>
                        <Button size='icon' className='rounded-full' onClick={() => {
                            if (new Date().getFullYear() > year) {
                                setYear(year + 1)
                            }
                        }}
                            disabled={!(new Date().getFullYear() > year)}
                        ><ChevronRight /></Button>
                    </div>
                </div>
                <Table className='w-full'>
                    <TableHeader className='hover:bg-none ' >
                        <TableRow className='text-theme-text font-medium text-base'>
                            <TableHead className=''>Date</TableHead>
                            <TableHead>Day</TableHead>
                            <TableHead>Event</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className=''>
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
