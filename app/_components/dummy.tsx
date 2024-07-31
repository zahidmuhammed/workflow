"use client"

import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/_utils/hooks'
import { Button } from './ui/button'
import { increment, decrement } from '../_redux/slices/counterSlice'
import axios from 'axios'
import { MinusIcon, PlusIcon } from 'lucide-react'

const Dummy = () => {

    const count = useAppSelector((state) => state.counter?.value);
    const dispatch = useAppDispatch()

    return (
        <div className='flex flex-col items-center justify-center'>
            {count}
            <div className='flex flex-row items-center justify-center gap-5'>
                <Button size={"icon"} onClick={() => dispatch(decrement())} className='bg-red-500' >
                    <MinusIcon className='w-4 h-4' />
                </Button>
                <Button size={"icon"} onClick={() => dispatch(increment())} className='bg-red-500' >
                    <PlusIcon className='w-4 h-4' />
                </Button>
            </div>
        </div>
    )
}

export default Dummy