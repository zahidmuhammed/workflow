"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../_utils/hooks';

const Greetings = () => {

    const { name } = useAppSelector((state) => state.user)

    const router = useRouter()

    const [isClient, setIsClient] = useState(false)

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
        <div className='text-4xl font-semibold'  >{getMessage()}, {isClient && name}!</div>
    )
}

export default Greetings