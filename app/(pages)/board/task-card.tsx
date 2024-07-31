"use client"

import { Badge } from '@/app/_components/ui/badge'
import { Card, CardContent } from '@/app/_components/ui/card'
import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { Clock3 } from 'lucide-react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Task } from './board-wrapper'

const getTimeAgo = (date: string | Date) => {
    const now = dayjs()
    const updatedAt = dayjs(date)
    const diffSeconds = now.diff(updatedAt, 'second')

    if (diffSeconds < 60) return `${diffSeconds} seconds ago`
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`
    return `${Math.floor(diffSeconds / 86400)} days ago`
}

const TaskCard = ({ task }: { task: Task }) => {
    const ref = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const el = ref.current;
        if (el) {
            return draggable({
                element: el,
                canDrag: () => true,
                getInitialData: () => ({ ...task }),
                onDragStart: () => { }
            });
        }
    }, []);


    return (
        <Card ref={ref} className={`cursor-grab rounded`}>
            <CardContent className="p-3 gap-2 flex flex-col text-[#606060] text-start bg-[#F9F9F9] rounded">
                <div className="text-sm font-medium">{task.title}</div>
                <div className="text-sm text-[#667085]">{task.description}</div>
                {task?.priority && <Badge
                    className={`rounded-md text-[10px] max-w-min 
                        ${task.priority === 'urgent'
                            ? 'bg-[#FF6B6B]' :
                            task.priority === 'medium'
                                ? 'bg-[#FFA235]'
                                : 'bg-[#0ECC5A]'}`
                    }>
                    {task.priority}
                </Badge>}
                {task?.deadline &&
                    <div className="text-xs font-semibold flex items-center text-[#667085]">
                        <Clock3 className='w-5 h-5 mr-2' />{dayjs(task.deadline).format('DD-MM-YYYY')}
                    </div>
                }
                <div className="text-xs font-medium text-[#667085]">
                    {getTimeAgo(task.updatedAt)}
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard