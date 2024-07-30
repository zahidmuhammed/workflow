"use client";

import React from 'react'
import { useState } from "react";
import {
    ChartLine, House, BellDot, ChevronsRightIcon, ArrowDownToLine,
    Users, Settings, SquareKanban, CirclePlus, Sun, CircleHelp, Sparkles,
    Calendar,
    Filter,
    Share2
} from "lucide-react"
import { Nav } from './nav';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/app/_components/ui/resizable';
import { Separator } from './ui/separator';
import { cn } from '../_utils/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';
import { Input } from './ui/input';
import TaskCreation from '../(pages)/board/task-creation';
import { useRouter } from 'next/navigation';

interface LayoutProps {
    content: React.ReactNode;
}

const Layout = ({ content }: LayoutProps) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigate = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('workflow_token')
        navigate.push('/login')
    }

    return (
        <div className='h-full'>
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
                                    "flex h-[80px] mt-5 flex-col gap-1 justify-evenly",
                                    isCollapsed ? "h-[80px]" : "px-3"
                                )}
                            >
                                <div className='flex items-center gap-2 text-xl'>
                                    <Avatar className='rounded-lg size-8 mx-1'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>-</AvatarFallback>
                                    </Avatar>
                                    Joe Gardner
                                </div>
                                <div className='flex items-center justify-between gap-2'>
                                    <div className='flex items-center'>
                                        <Button size={"icon"} variant={"ghost"} className=''>
                                            <BellDot className='size-4' />
                                        </Button>
                                        <Button size={"icon"} variant={"ghost"}>
                                            <Sun className='size-4' />
                                        </Button>
                                        <Button size={"icon"} variant={"ghost"}>
                                            <ChevronsRightIcon className='size-4' />
                                        </Button>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Button onClick={handleLogout} variant={"secondary"} className='bg-[#F4F4F4]' size={"sm"}>
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className='flex'>
                                <Button variant={"secondary"}
                                    className='w-full mx-2 mt-2 flex justify-start px-3 bg-[#F4F4F4]'
                                >
                                    <House className='size-4 mr-2' /> Home
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
                                        className='w-full mx-2 mt-1 bg-gradient-to-b from-[#4C38C2] to-[#2F2188] hover:from-[#4C38C2] hover:to-[#2F2188] border-2 border-transparent bg-clip-border'
                                    >
                                        Create new task <CirclePlus className='ml-2 fill-white stroke-[#4C38C2]' />
                                    </Button>
                                } />
                            </div>
                        </div>

                        <div className='flex justify-center items-center mb-5 text-xs'>
                            <Button
                                variant={"secondary"}
                                className='w-full mx-2 text-[#666666] min-h-[46px] border border-[#DEDEDE] flex justify-between gap-5 bg-[#F3F3F3]'
                            >
                                <div>
                                    <ArrowDownToLine className='ml-2 ' />
                                </div>
                                <div className='text-xs flex flex-1 flex-col items-start'>
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
        </div>
    )
}

export default Layout