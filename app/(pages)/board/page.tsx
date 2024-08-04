
import React from 'react'
import Image from 'next/image';
import {
    CirclePlus, CircleHelp, Sparkles,
    Calendar,
    Filter,
    Share2
} from "lucide-react"

import TaskCreation from './task-creation';
import BoardWrapper from './board-wrapper';
import { Input } from '@/app/_components/ui/input';
import Greetings from '@/app/_components/greetings';
import { Button } from '@/app/_components/ui/button';
import LayoutWrapper from '@/app/_components/layoutWrapper';



const Board = async () => {

    /*  ######################################################################################## */

    return (
        <LayoutWrapper content={
            <div className='bg-[#F7F7F7] flex flex-col gap-4 h-screen'>
                <div className='flex items-center  justify-between mt-6 h-14 ml-4 mr-8'>
                    <Greetings />
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
                <BoardWrapper />
            </div>
        } />
    )
}



export default Board