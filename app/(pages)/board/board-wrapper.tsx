"use client"

import { cn } from '@/app/_utils/utils'
import React, { useEffect, useState } from 'react'
import ColumnCard from './column-card'
import { ElementDragPayload, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import axios from 'axios';
import Urls from '@/app/_utils/urls';

export interface Task {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    is_deleted: boolean;
    is_favorite: boolean;
    user_id: string;
    title: string;
    description: string;
    priority: "urgent" | "medium" | "low";
    deadline: Date;
    status: "todo" | "in_progress" | "review" | "completed";
}

const BoardWrapper = () => {

    const taskColumns = [
        { _id: 1, title: 'To-Do', code: 'todo', order: 1 },
        { _id: 2, title: 'In Progress', code: 'in_progress', order: 2 },
        { _id: 3, title: 'Under Review', code: 'review', order: 3 },
        { _id: 4, title: 'Completed', code: 'completed', order: 4 },
    ]

    const [tasks, setTasks] = useState<Task[]>([])


    const updateTaskStatus = (source: ElementDragPayload, location: DragLocationHistory) => {
        console.log("source : ", source)
        console.log("location : ", location)
    }

    const getTasks = async () => {
        const res = await axios.get(Urls.domain + "/api" + Urls.tasks)
        setTasks(res?.data?.data || [])
    }

    const getTasksByStatus = (status: string) => {
        return tasks?.filter((task) =>
            task?.status === status);
    };

    useEffect(() => {
        getTasks()
        return monitorForElements({
            onDragStart: () => { },
            onDrop: ({ source, location }) => { updateTaskStatus(source, location) }
        });
    }, []);

    return (
        <div className={cn("flex overflow-auto ml-4 mr-6 rounded-lg bg-white")}>
            {taskColumns.map((column) => (
                <div key={column._id} className='first:pl-4 px-2 last:pr-4'>
                    <ColumnCard key={column._id} column={column} tasks={getTasksByStatus(column?.code) || []} />
                </div>
            ))}
        </div>
    )
}

export default BoardWrapper