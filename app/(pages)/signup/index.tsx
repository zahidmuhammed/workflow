'use client'

import axios from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

import Urls from '@/app/_utils/urls'
import { Input } from '@/app/_components/ui/input'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'


const SignupClient = () => {

    const navigate = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, getValues, formState: { errors }, } = useForm();


    const signup = async (data: any) => {
        setIsLoading(true)
        try {
            const res = await axios.post(Urls.domain + "/api" + Urls.register, data);
            if (res?.status === 201) {
                localStorage.setItem("workflow_token", res?.data?.data?.token);
                toast.success("Signup successful");
                navigate.push('/board')
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div >
            <Card className='w-full max-w-[400px] p-5'>
                <CardHeader>
                    <CardTitle className='text-center'>Welcome to <span className='text-[#4534AC]'>Workflo!</span></CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(signup)}>
                        <div className='flex flex-col gap-6'>
                            <Input placeholder='Full Names' type='text' required {...register("name")} />
                            <Input placeholder='Your Email ' type='email' required {...register("email")} />
                            <div className="flex items-center dark:bg-card rounded px-2 border dark:border-[#FFFFFF1A] border-border">
                                <Input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    minLength={4}
                                    placeholder="- - - - - - - -"
                                    {...register("password")}
                                    className="outine-0 ring-0 focus-visible:ring-0 px-1 focus-visible:ring-offset-0 dark:bg-card border-0 dark:border-[#FFFFFF1A]"
                                />
                                {showPassword
                                    ? <HiOutlineEyeOff className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => !prev)} />
                                    : <HiOutlineEye className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => !prev)} />
                                }
                            </div>
                            <div className='flex justify-center'>
                                <Button type='submit' className='w-full bg-gradient-to-b bg-[#4C38C2] to-[#4C38C2] via-[#2F2188] from-[#FFFFFF4D]' disabled={isLoading}>{isLoading ? "Loading..." : "Signup"}</Button>
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

export default SignupClient