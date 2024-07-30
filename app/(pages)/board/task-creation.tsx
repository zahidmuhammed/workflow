"use client"

import React, { useState } from 'react'
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/_components/ui/sheet"
import { Calendar, MoveDiagonal2, OctagonAlert, PencilIcon, PlusIcon, Share2, Star, Sun, X } from 'lucide-react'
import { Textarea } from '@/app/_components/ui/textarea'
import { DatePicker } from '@/app/_components/ui/date-picker'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select'
import { Separator } from '@/app/_components/ui/separator'

import { useForm } from "react-hook-form";
import axios from 'axios'
import Urls from '@/app/_utils/urls'
import { toast } from 'sonner'


const TaskCreation = ({ button = <Button variant="outline">Open</Button> }: any) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>()

    const { register, handleSubmit, getValues, formState: { errors }, setValue } = useForm();

    const handleCreation = async (data: any) => {
        try {
            const response = await axios.post(Urls.baseUrl + Urls.tasks, data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("workflow_token")}`
                }
            });
            if (response.status === 201) {
                toast.success("Task created successfully");
                setOpen(false);
            }
        } catch (error) {
            console.log(error)
            toast.error("Error creating task");
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {button}
            </SheetTrigger>
            <SheetContent className='w-1/2'>

                <div className='flex justify-between '>
                    <div>
                        <Button size={"icon"} variant={"ghost"} onClick={() => setOpen(false)} >
                            <X className="h-4 w-4 text-[#797979]" />
                        </Button>
                        <Button size={"icon"} variant={"ghost"} onClick={() => { }} >
                            <MoveDiagonal2 className="h-4 w-4 text-[#797979]" />
                        </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button size={"sm"} variant={"ghost"} className='flex items-center gap-2 bg-[#F4F4F4] text-[#797979]' onClick={() => { }} >
                            Share <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size={"sm"} variant={"ghost"} className='flex items-center gap-2 bg-[#F4F4F4] text-[#797979]' onClick={() => { }} >
                            Favorite <Star className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(handleCreation)}>
                    <div className='mt-7 text-[#666666]'>
                        <Input required {...register("title")} className='border-0 text-5xl px-0 placeholder:text-[#CCCCCC] ' placeholder='Title' />
                        <div className='grid grid-cols-2 w-2/3 items-center gap-2 mt-8 text-sm'>
                            <div className='w-1/2 flex items-center gap-2'>
                                <Sun className='size-4' />Status</div>
                            <div className='w-1/2'>
                                <Select required onValueChange={(value) => setValue("status", value)}>
                                    <SelectTrigger className="w-[280px] placeholder:text-[#CCCCCC] text-xs">
                                        <SelectValue placeholder="Not Selected" />
                                    </SelectTrigger>
                                    <SelectContent className='text-xs'>
                                        <SelectGroup>
                                            <SelectItem className='text-xs' value="todo">Todo</SelectItem>
                                            <SelectItem className='text-xs' value="in_progress">In Progress</SelectItem>
                                            <SelectItem className='text-xs' value="review">Review</SelectItem>
                                            <SelectItem className='text-xs' value="completed">Completed</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='flex items-center gap-2'>
                                <OctagonAlert className='size-4' />Priority
                            </div>
                            <div>
                                <Select onValueChange={(value) => setValue("priority", value)}>
                                    <SelectTrigger className="w-[280px] placeholder:text-[#CCCCCC] text-xs">
                                        <SelectValue placeholder="Not Selected" />
                                    </SelectTrigger>
                                    <SelectContent className='text-xs'>
                                        <SelectGroup>
                                            <SelectItem className='text-xs' value="low">Low</SelectItem>
                                            <SelectItem className='text-xs' value="medium">Medium</SelectItem>
                                            <SelectItem className='text-xs' value="urgent">Urgent</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Calendar className='size-4' />Deadline
                            </div>
                            <div>
                                <DatePicker date={date} setDate={(date) => {
                                    setDate(date)
                                    setValue("deadline", date)
                                }} />
                            </div>
                            <div className='align-top flex h-full gap-2 pt-2'>
                                <PencilIcon className='size-4' /> Description
                            </div>
                            <div className='w-full'>
                                <Textarea className='w-[280px] border-0 placeholder:text-[#64758B] placeholder:text-xs ' placeholder='Not Selected' rows={1} {...register("description")} />
                            </div>
                        </div>
                        <Button variant={"ghost"} className='flex items-center gap-2 text-xs'>
                            <PlusIcon className='h-4 w-4' />
                            Add Custom property
                        </Button>
                    </div>
                    <Separator className='my-5' />

                    <div className='text-[#C0BDBD] text-xs'>Start writing, or drag your own files here.</div>

                    <div className='absolute bottom-0 right-0 w-full bg-white mb-5 py-5 pr-10 flex justify-end mt-10'>
                        <Button type="submit" className='flex items-center justify-end w-full max-w-min gap-2 text-xs'>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default TaskCreation