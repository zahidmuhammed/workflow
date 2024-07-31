"use client"

import { cn } from '@/app/_utils/utils'
import React, { useEffect, useState } from 'react'
import ColumnCard from './column-card'
import { ElementDragPayload, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import axios from 'axios';
import Urls from '@/app/_utils/urls';
import { initTasks } from '@/app/_redux/slices/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/app/_utils/hooks';

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

    const getTasks = async () => {
        const res = await axios.get(Urls.domain + "/api" + Urls.tasks)
        dispatch(initTasks(res?.data?.data || []))
    }

    const updateTaskStatus = async (source: ElementDragPayload, location: DragLocationHistory) => {

        if (source?.data?.status === location?.current?.dropTargets?.[0]?.data?.code) return;

        const res = await axios.patch(Urls.domain + "/api" + Urls.tasks + "/" + source?.data?._id,
            { status: location?.current?.dropTargets?.[0]?.data?.code })
        if (res?.status === 200) {
            getTasks()
        }
    }


    const getTasksByStatus = (status: string) => {
        return tasksList?.filter((task) =>
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