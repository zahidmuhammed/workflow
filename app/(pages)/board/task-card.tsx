"use client"

import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import React, { useEffect, useRef } from 'react'
import { Clock3, PencilIcon, Trash2Icon } from 'lucide-react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import Urls from '@/app/_utils/urls'
import { Task } from './board-wrapper'
import TaskCreation from './task-creation'
import { Badge } from '@/app/_components/ui/badge'
import { useAppDispatch } from '@/app/_utils/hooks'
import AlertWrap from '@/app/_components/alert-wrap'
import { Card, CardContent } from '@/app/_components/ui/card'
import { deleteTask, initTasks } from '@/app/_redux/slices/tasksSlice'

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
    const dispatch = useAppDispatch()

    /* ######################################################################################### */

    const getTasks = async () => {
        const res = await axios.get(Urls.domain + "/api" + Urls.tasks)
        dispatch(initTasks(res?.data?.data || []))
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(Urls.baseUrl + '/tasks/' + task._id)
            if (response.status === 200) {
                toast.success("Task deleted successfully")
                dispatch(deleteTask(task))
                getTasks()
            }
        } catch (error) {
            toast.error("Error deleting task")
        }
    }

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

    /* ######################################################################################### */



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
                        <Clock3 className='w-4 h-4 mr-2' />{dayjs(task.deadline).format('DD-MM-YYYY')}
                    </div>
                }
                <div className="text-xs font-medium text-[#667085]">
                    <div className="flex  justify-between items-center">
                        {getTimeAgo(task.updatedAt)}
                        <div className='flex gap-3'>
                            <TaskCreation
                                button={
                                    <PencilIcon className='w-3 h-3 cursor-pointer' />
                                }
                                defaultData={{
                                    _id: task?._id,
                                    title: task?.title,
                                    status: task?.status,
                                    priority: task?.priority,
                                    deadline: task?.deadline,
                                    description: task?.description
                                }}
                                isEdit={true}
                            />
                            <AlertWrap
                                title="Are you sure?"
                                onAction={handleDelete}
                                description="This action cannot be undone."
                                button={<Trash2Icon className='w-3 h-3 cursor-pointer' />}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard