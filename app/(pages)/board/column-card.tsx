import { ScrollArea } from '@/app/_components/ui/scroll-area'
import React from 'react'
import TaskCard from './task-card'
import { Input } from '@/app/_components/ui/input'
import { Button } from '@/app/_components/ui/button'
import { PlusIcon, ChartNoAxesColumnIncreasing } from 'lucide-react'
import TaskCreation from './task-creation'

const ColumnCard = ({ column }: any) => {
    const tasks = [
        {
            "_id": "66a5227bd1d424f4a9072ff8",
            "user_id": "66a4f439442e898a54772234",
            "title": "Task - #001",
            "status": "todo",
            "is_deleted": false,
            "priority": "low",
            "description": "Description 1",
            "createdAt": "2024-07-27T16:38:19.128Z",
            "updatedAt": "2024-07-29T16:43:46.836Z",
            "deadline": "2024-07-30T16:43:46.836Z",
            "__v": 0
        },
        {
            "_id": "66a5227bd1d424f4a9072ff8",
            "user_id": "66a4f439442e898a54772234",
            "title": "Task - #002",
            "status": "in_progress",
            "is_deleted": false,
            "priority": "medium",
            "description": "Description 2",
            "createdAt": "2024-07-27T16:38:19.128Z",
            "updatedAt": "2024-07-27T16:43:46.836Z",
            "deadline": "2024-07-27T16:43:46.836Z",
            "__v": 0
        },
        {
            "_id": "66a5227bd1d424f4a9072ff8",
            "user_id": "66a4f439442e898a54772234",
            "title": "Task - #003",
            "status": "done",
            "is_deleted": false,
            "priority": "urgent",
            "description": "Description 3",
            "createdAt": "2024-07-27T16:38:19.128Z",
            "updatedAt": "2024-07-27T16:43:46.836Z",
        }

    ]

    return (
        <div className='text-center  min-w-[250px] w-[250px] mb-3' >
            <div className="flex justify-between items-center py-2 select-none">
                <div className="p-1 font-medium text-sm">{column.title}</div>
                <div className="">
                    <ChartNoAxesColumnIncreasing className='w-4 h-4 rotate-90' />
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-240px)]">
                <div className="flex flex-col py-2 gap-3">
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}


                    <TaskCreation button={
                        <Button>
                            <div className='flex items-center justify-between w-full '>
                                Add New
                                <PlusIcon className='w-4 h-4' />
                            </div>
                        </Button>
                    } />
                </div>
            </ScrollArea>

        </div >
    )
}

export default ColumnCard