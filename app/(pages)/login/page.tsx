'use client'

import { Button } from '@/app/_components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import React, { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import axios from 'axios'
import { toast } from "sonner"

import Urls from '@/app/_utils/urls'
import { setUser } from '@/app/_redux/slices/userSlice'
import { useAppDispatch } from '@/app/_utils/hooks'


const Login = () => {

    const navigate = useRouter();
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, getValues, formState: { errors }, } = useForm();


    const login = async (data: any) => {
        try {
            const res = await axios.post(Urls.domain + "/api" + Urls.authenticate, data);

            if (res?.status === 200) {
                localStorage.setItem("workflow_token", res?.data?.data?.token);
                // const userData = {
                //     id: res?.data?.data?.user?.id,
                //     name: res?.data?.data?.user?.name,
                //     email: res?.data?.data?.user?.email,
                //     role: res?.data?.data?.user?.role
                // };
                // dispatch(setUser(userData));
                toast.success("Login successful");
                navigate.push('/board');
            }
        } catch (error: any) {
            console.error("Login error :", error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-gradient-to-b from-white to-[#AFA3FF]'>
            <Card className='w-full max-w-[400px] p-5'>
                <CardHeader>
                    <CardTitle className='text-center'>Welcome to <span className='text-[#4534AC]'>Workflo!</span></CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(login)}>
                        <div className='flex flex-col gap-6'>
                            <Input placeholder='Your Email ' type='email' required  {...register("email")} />
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
                                <Button className='w-full bg-gradient-to-b bg-[#4C38C2] to-[#4C38C2] via-[#2F2188] from-[#FFFFFF4D]'>Login</Button>
                            </div>
                            <div className='text-xs text-center'>Don’t have an account?
                                <Link className='text-[#0054A1] px-1' href='/signup'>Create a new account.</Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login


