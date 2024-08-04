"use client"

import { useRouter } from 'next/navigation';
import { useAppSelector } from '../_utils/hooks';
import React, { useEffect, useState } from 'react'

const Greetings = () => {

    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { name } = useAppSelector((state) => state.user)


    useEffect(() => {
        setIsClient(true)
    }, [])

    let token
    if (typeof window !== "undefined") {
        token = localStorage.getItem("workflow_token") || ""
    }

    if (!token) {
        router.push('/login');
    }

    const getMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }

    return (
        <div className='text-xl sm:text-2xl md:text-4xl font-semibold'  >{getMessage()}, {isClient && name}!</div>
    )
}

export default Greetings