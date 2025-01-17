"use client"

import axios from 'axios';
import React, { useEffect } from 'react'
import { ElementDragPayload, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';

import Urls from '@/app/_utils/urls';
import ColumnCard from './column-card'
import { cn } from '@/app/_utils/utils'
import { useAppDispatch, useAppSelector } from '@/app/_utils/hooks';
import { initTasks, updateTaskStatus } from '@/app/_redux/slices/tasksSlice';

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


export interface Column {
    _id: number;
    title: string;
    code: string;
    order: number;
}

const BoardWrapper = () => {

    const dispatch = useAppDispatch();
    const tasksList = useAppSelector((state) => state.tasks);

    const taskColumns: Column[] = [
        { _id: 1, title: 'To-Do', code: 'todo', order: 1 },
        { _id: 2, title: 'In Progress', code: 'in_progress', order: 2 },
        { _id: 3, title: 'Under Review', code: 'review', order: 3 },
        { _id: 4, title: 'Completed', code: 'completed', order: 4 },
    ]

    /*  ######################################################################################## */


    const getTasks = async () => {
        const res = await axios.get(Urls.domain + "/api" + Urls.tasks)
        dispatch(initTasks(res?.data?.data || []))
    }

    const handleStatusChange = async (source: ElementDragPayload, location: DragLocationHistory) => {

        if (source?.data?.status === location?.current?.dropTargets?.[0]?.data?.code) return;

        dispatch(updateTaskStatus({
            _id: source?.data?._id as string,
            status: location?.current?.dropTargets?.[0]?.data?.code as "todo" | "in_progress" | "review" | "completed"
        }))

        const res = await axios.patch(Urls.domain + "/api" + Urls.tasks + "/" + source?.data?._id,
            { status: location?.current?.dropTargets?.[0]?.data?.code })

    }

    const getTasksByStatus = (status: string) => {
        return tasksList?.filter((task) =>
            task?.status === status);
    };


    /*  ######################################################################################## */

    useEffect(() => {
        getTasks()
        return monitorForElements({
            onDragStart: () => { },
            onDrop: ({ source, location }) => handleStatusChange(source, location)
        });
    }, []);

    /*  ######################################################################################## */


    return (
        <div className={cn("flex overflow-auto ml-4 mr-8 rounded-lg bg-white")}>
            {taskColumns.map((column) => (
                <div key={column._id} className='first:pl-4 px-2 last:pr-4'>
                    <ColumnCard key={column._id} column={column} tasks={getTasksByStatus(column?.code) as Task[] || []} />
                </div>
            ))}
        </div>
    )
}

export default BoardWrapper