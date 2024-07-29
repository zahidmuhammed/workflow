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

const TaskCreation = ({ button = <Button variant="outline">Open</Button> }: any) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>()

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
                <div className='mt-7 text-[#666666]'>
                    <Input className='border-0 text-5xl px-0 placeholder:text-[#CCCCCC] ' placeholder='Title' />
                    <div className='grid grid-cols-2 w-2/3 items-center gap-2 mt-8 text-sm'>
                        <div className='w-1/2 flex items-center gap-2'>
                            <Sun className='size-4' />Status</div>
                        <div className='w-1/2'>
                            <Select>
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
                            </Select></div>
                        <div className='flex items-center gap-2'>
                            <OctagonAlert className='size-4' />Priority
                        </div>
                        <div>
                            <Select>
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
                            <DatePicker date={date} setDate={setDate} />
                        </div>
                        <div className='align-top flex h-full gap-2 pt-2'>
                            <PencilIcon className='size-4' /> Description
                        </div>
                        <div className='w-full'>
                            <Textarea className='w-[280px] border-0 placeholder:text-[#64758B] placeholder:text-xs ' placeholder='Not Selected' rows={1} />
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
                    <Button className='flex items-center justify-end w-full max-w-min gap-2 text-xs'>
                        Save Changes
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default TaskCreation