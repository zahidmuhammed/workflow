"use client"

import { ScrollArea } from '@/app/_components/ui/scroll-area'
import React, { useEffect, useRef } from 'react'
import TaskCard from './task-card'
import { Button } from '@/app/_components/ui/button'
import { PlusIcon, ChartNoAxesColumnIncreasing } from 'lucide-react'
import TaskCreation from './task-creation'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Column, Task } from './board-wrapper'

interface ColumnCardProps {
    column: Column
    tasks: Task[]
}

const ColumnCard = ({ column, tasks }: ColumnCardProps) => {

    const ref = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const el = ref.current;
        if (!el) {
            throw new Error('ref not set correctly');
        }

        return dropTargetForElements({
            element: el,
            getData: () => ({ ...column })
        });
    }, []);

    return (
        <div className='text-center  min-w-[250px] w-[250px] mb-3' >
            <div className="flex justify-between items-center py-2 select-none">
                <div className="p-1 font-medium text-sm">{column.title}</div>
                <div className="">
                    <ChartNoAxesColumnIncreasing className='w-4 h-4 rotate-90' />
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-350px)]" ref={ref}>
                <div className="flex flex-col py-2 gap-3">
                    {tasks.map((task: any) => (
                        <TaskCard key={task._id} task={task} />
                    ))}


                    <TaskCreation
                        button={
                            <Button>
                                <div className='flex items-center justify-between w-full '>
                                    Add New
                                    <PlusIcon className='w-4 h-4' />
                                </div>
                            </Button>
                        }
                        defaultStatus={column?.code}
                    />
                </div>
            </ScrollArea>

        </div >
    )
}

export default ColumnCard