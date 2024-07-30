"use client"

import { Badge } from '@/app/_components/ui/badge'
import { Card, CardContent } from '@/app/_components/ui/card'
import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { Clock3 } from 'lucide-react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';


// {
//     "_id": "66a522x7bd1d424f4a9072ff8",
//     "user_id": "66a4f439442e898a54772234",
//     "title": "Task - #001",
//     "description": "Description 1",
//     "status": "todo",
//     "is_deleted": false,
//     "createdAt": "2024-07-27T16:38:19.128Z",
//     "updatedAt": "2024-07-27T16:43:46.836Z",
// "priority"
//     "__v": 0
// }

const TaskCard = ({ task }: any) => {
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
                <Badge
                    className={`rounded-md text-[10px] max-w-min 
                        ${task.priority === 'urgent'
                            ? 'bg-[#FF6B6B]' :
                            task.priority === 'medium'
                                ? 'bg-[#FFA235]'
                                : 'bg-[#0ECC5A]'}`
                    }>
                    {task.priority}
                </Badge>
                {task?.deadline &&
                    <div className="text-xs font-semibold flex items-center text-[#667085]">
                        <Clock3 className='w-5 h-5 mr-2' />{dayjs(task.deadline).format('DD-MM-YYYY')}
                    </div>
                }
                <div className="text-xs font-medium text-[#667085]">
                    {dayjs().diff(dayjs(task.updatedAt), 'hour') < 24
                        ? `${dayjs().diff(dayjs(task.updatedAt), 'hour')} hours ago`
                        : `${dayjs().diff(dayjs(task.updatedAt), 'day')} days ago`}
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard