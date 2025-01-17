"use client";

import React, { useEffect, useState } from 'react'
import {
    ChartLine, House, BellDot, ChevronsRightIcon, ArrowDownToLine,
    Users, Settings, SquareKanban, CirclePlus, Sun,
} from "lucide-react"

import { Nav } from './nav';
import { cn } from '../_utils/utils';
import LogoutBtn from './logout-btn';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useAppSelector } from '../_utils/hooks';
import TaskCreation from '../(pages)/board/task-creation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/app/_components/ui/resizable';
import { TooltipProvider } from './ui/tooltip';

interface LayoutProp {
    content: React.ReactNode;
}

const LayoutWrapper = ({ content }: LayoutProp) => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const { name } = useAppSelector((state) => state.user)

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className='h-full'>
            <TooltipProvider>
                <ResizablePanelGroup
                    direction="horizontal"
                    className="h-full items-stretch"
                >
                    <ResizablePanel
                        defaultSize={20}
                        collapsedSize={4}
                        collapsible={true}
                        minSize={15}
                        maxSize={20}
                        onCollapse={() => {
                            setIsCollapsed(true)
                        }}
                        onResize={() => {
                            setIsCollapsed(false)
                        }}
                        className={cn(
                            isCollapsed &&
                            "min-w-[50px] transition-all duration-300 ease-in-out"
                        )}
                    >
                        <div className='flex flex-col justify-between h-full'>
                            <div className=''>
                                <div
                                    className={cn(
                                        "flex lg:h-[80px] mb-3 md:mb-0 mt-5 flex-col gap-1 justify-evenly",
                                        isCollapsed ? "lg:h-[80px] px-3" : "px-3"
                                    )}
                                >
                                    <div className='flex items-center justify-center md:justify-start gap-2 text-xl' >
                                        <Avatar className='rounded-lg size-8 mx-1'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>-</AvatarFallback>
                                        </Avatar>
                                        <span className='hidden md:flex'>{isClient && name}</span>
                                    </div>
                                    <div className='flex flex-col lg:flex-row items-center justify-between gap-2'>
                                        <div className='flex flex-col lg:flex-row items-center'>
                                            <Button size={"icon"} variant={"ghost"} className=''>
                                                <BellDot className='size-4' />
                                            </Button>
                                            <Button size={"icon"} variant={"ghost"}>
                                                <Sun className='size-4' />
                                            </Button>
                                            <Button size={"icon"} variant={"ghost"} onClick={() => setIsCollapsed(!isCollapsed)}>
                                                <ChevronsRightIcon className='size-4' />
                                            </Button>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <LogoutBtn />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className='flex'>
                                    <Button variant={"secondary"}
                                        className='w-full mx-2 mt-2 flex justify-center md:justify-start px-3 bg-[#F4F4F4]'
                                    >
                                        <House className='size-4 md:mr-2' /> <span className='hidden md:flex'>Home</span>
                                    </Button>
                                </div>
                                <Nav
                                    isCollapsed={isCollapsed}
                                    links={[
                                        {
                                            title: "Boards",
                                            label: "",
                                            icon: SquareKanban,
                                            variant: "ghost",
                                        },
                                        {
                                            title: "Settings",
                                            label: "",
                                            icon: Settings,
                                            variant: "ghost",
                                        },
                                        {
                                            title: "Teams",
                                            label: "",
                                            icon: Users,
                                            variant: "ghost",
                                        },
                                        {
                                            title: "Analytics",
                                            label: "",
                                            icon: ChartLine,
                                            variant: "ghost",
                                        },

                                    ]}
                                />
                                <div className='flex justify-center items-center'>
                                    <TaskCreation button={
                                        <Button
                                            className='w-full  mx-2 mt-1 bg-gradient-to-b from-[#4C38C2] to-[#2F2188] hover:from-[#4C38C2] hover:to-[#2F2188] border-2 border-transparent bg-clip-border'
                                        >
                                            <span className='hidden md:flex'>Create new task </span> <CirclePlus className='md:ml-2 h-4 w-4 fill-white stroke-[#4C38C2]' />
                                        </Button>
                                    } />
                                </div>
                            </div>

                            <div className='flex justify-center items-center mb-5 mt-5 text-xs'>
                                <Button
                                    variant={"secondary"}
                                    className='w-full px-2 md:px-0 mx-2 text-[#666666] min-h-[46px] border border-[#DEDEDE] flex justify-center md:justify-between gap-5 bg-[#F3F3F3]'
                                >
                                    <div>
                                        <ArrowDownToLine className='md:ml-2 ' />
                                    </div>
                                    <div className='hidden md:flex text-xs flex-1 flex-col items-start'>
                                        <div>Download the app</div>
                                        <div>Get the full experience</div>
                                    </div>

                                </Button>
                            </div>
                        </div>

                    </ResizablePanel>
                    <ResizableHandle disabled />
                    <ResizablePanel
                        defaultSize={80}
                        maxSize={80}
                    >

                        {content}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </TooltipProvider>
        </div>
    )
}

export default LayoutWrapper