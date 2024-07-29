'use client'

import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Signup = () => {

    const navigate = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate.push('/board')
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-gradient-to-b from-white to-[#AFA3FF]'>
            <Card className='w-full max-w-[400px] p-5'>
                <CardHeader>
                    <CardTitle className='text-center'>Welcome to <span className='text-[#4534AC]'>Workflo!</span></CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-6'>
                            <Input placeholder='Full Names' type='text' required />
                            <Input placeholder='Your Email ' type='email' required />
                            <Input placeholder='Password' type='password' required />
                            <div className='flex justify-center'>
                                <Button type='submit' className='w-full bg-gradient-to-b bg-[#4C38C2] to-[#4C38C2] via-[#2F2188] from-[#FFFFFF4D]'>Signup</Button>
                            </div>
                            <div className='text-xs text-center'>Already have an account?
                                <Link className='text-[#0054A1] px-1' href='/login'>Log in</Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Signup