import React from 'react'
import { Link } from 'react-router-dom'
import Signin from './Auth/Signin'
import Button from '../components/ui/Button'

export default function Landing() {
    return (
        <div>
            {/* <div className="w-screen h-28 absolute backdrop-blur-md"></div> */}
            <Link to="/dashboard" className='absolute right-36 top-6 hover:bg-lime-400 hover:rounded-lg '><Button varient='default'>go to dashboard</Button></Link>
            {/* <iframe src="https://www.accentiqa.com/" frameborder="0" className='h-screen w-screen'></iframe> */}
            
        </div>
    )
}
