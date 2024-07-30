"use client"

import React, { useEffect } from 'react'
import ColumnCard from './column-card'
import { cn } from '@/app/_utils/utils'
import Image from 'next/image';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import {
    ChartLine, House, BellDot, ChevronsRightIcon, ArrowDownToLine,
    Users, Settings, SquareKanban, CirclePlus, Sun, CircleHelp, Sparkles,
    Calendar,
    Filter,
    Share2
} from "lucide-react"
import LayoutWrapper from '@/app/_components/layoutWrapper';
import TaskCreation from './task-creation';
import axios from 'axios';
import Urls from '@/app/_utils/urls';
import { ElementDragPayload, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';


// async function getData() {
//     try {
//         const res = await axios.get(Urls.baseUrl + Urls.tasks, {
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("workflow_token")}`
//             }
//         })
//         return res
//     } catch (error) {
//         console.log("error : ", error)
//     }
// }


const Board = () => {

    // const data = await getData();

    // console.log("data : ", data)
    // console.log("data emp: ")



    const taskColumns = [
        { _id: 1, title: 'To-Do', code: 'todo', order: 1 },
        { _id: 2, title: 'In Progress', code: 'in_progress', order: 2 },
        { _id: 3, title: 'Under Review', code: 'under_review', order: 3 },
        { _id: 4, title: 'Completed', code: 'completed', order: 4 },
    ]


    const updateTaskStatus = (source: ElementDragPayload, location: DragLocationHistory) => {
        console.log("source : ", source)
        console.log("location : ", location)
    }
    /*  ######################################################################################## */

    useEffect(() => {
        return monitorForElements({
            onDragStart: () => { },
            onDrop: ({ source, location }) => { updateTaskStatus(source, location) }
        });
    }, []);

    /*  ######################################################################################## */

    return (
        <LayoutWrapper content={
            <div className='bg-[#F7F7F7] flex flex-col gap-4 h-screen'>
                <div className='flex items-center  justify-between mt-6 h-14 ml-4 mr-8'>
                    <div className='text-4xl font-semibold'>
                        {(() => {
                            const hour = new Date().getHours();
                            if (hour < 12) return "Good morning";
                            if (hour < 18) return "Good afternoon";
                            return "Good evening";
                        })()}, Joe!
                    </div>
                    <div className='text-base flex items-center gap-2'>Help & feedback <CircleHelp className='size-4' /></div>
                </div>

                <div className='ml-4 mr-8 flex gap-2'>
                    <div className='bg-white px-4 py-4 rounded-lg flex w-full items-center gap-5'>
                        <div className='w-1/4'>
                            <Image src='/assets/images/dash_board_1.svg' alt='tags' width={77} height={61} />
                        </div>
                        <div className='w-3/4'>
                            <div className='text-sm text-[#757575] font-semibold'>Introducing tags</div>
                            <div className='text-[13px] text-[#868686]'>Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</div>
                        </div>
                    </div>
                    <div className='bg-white px-4 py-4 rounded-lg flex w-full items-center gap-5'>
                        <div className='w-1/4'>
                            <Image src='/assets/images/dash_board_2.svg' alt='tags' width={77} height={61} />
                        </div>
                        <div className='w-3/4'>
                            <div className='text-sm text-[#757575] font-semibold'>Share Notes Instantly</div>
                            <div className='text-[13px] text-[#868686]'>Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</div>
                        </div>
                    </div>
                    <div className='bg-white px-4 py-4 rounded-lg flex w-full items-center gap-5'>
                        <div className='w-1/4'>
                            <Image src='/assets/images/dash_board_3.svg' alt='tags' width={77} height={61} />
                        </div>
                        <div className='w-3/4'>
                            <div className='text-sm text-[#757575] font-semibold'>Access Anywhere</div>
                            <div className='text-[13px] text-[#868686]'>Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center ml-4 mr-8 '>
                    <div className='flex w-1/3'>
                        <Input placeholder='Search' className='w-1/2 text-[#797979]' />
                    </div>
                    <div className='flex flex-1 w-2/3 space-x-2'>
                        <Button variant={"secondary"} className='w-full text-[#797979] bg-[#F4F4F4]'>
                            Calendar view <Calendar className='ml-2 size-4' />
                        </Button>
                        <Button variant={"secondary"} className='w-full text-[#797979] bg-[#F4F4F4]'>
                            Automation <Sparkles className='ml-2 size-4' />
                        </Button>
                        <Button variant={"secondary"} className='w-full text-[#797979] bg-[#F4F4F4]'>
                            Filter <Filter className='ml-1 size-4' />
                        </Button>
                        <Button variant={"secondary"} className='w-full text-[#797979]  bg-[#F4F4F4]'>
                            Share <Share2 className='ml-1 size-4' />
                        </Button>

                        <TaskCreation
                            button={
                                <Button
                                    className='w-full mx-2 bg-gradient-to-b from-[#4C38C2] to-[#2F2188] hover:from-[#4C38C2] hover:to-[#2F2188] border-2 border-transparent bg-clip-border'
                                >
                                    Create new <CirclePlus className='ml-2 fill-white stroke-[#4C38C2]' />
                                </Button>
                            }
                        />

                    </div>
                </div>


                <div className={cn("flex overflow-auto ml-4 mr-6 rounded-lg bg-white")}>
                    {taskColumns.map((column) => (
                        <div key={column._id} className='first:pl-4 px-2 last:pr-4'>
                            <ColumnCard key={column._id} column={column} />
                        </div>
                    ))}
                </div>
            </div>
        } />
    )
}



export default Board