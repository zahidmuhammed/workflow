"use client"

import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/_utils/hooks'
import { Button } from './ui/button'
import { increment, decrement } from '../_redux/slices/counterSlice'
import axios from 'axios'

const Dummy = () => {

    const count = useAppSelector((state) => state.counter?.value);
    const dispatch = useAppDispatch()

    return (
        <div className='flex flex-col items-center justify-center'>{count}
            <Button size={"icon"} onClick={() => dispatch(increment())} className='bg-red-500' />
            <Button size={"icon"} onClick={() => dispatch(decrement())} className='bg-red-500' />
        </div>
    )
}

export default Dummy