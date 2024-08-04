"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../_utils/hooks";
import { clearTasks } from "../_redux/slices/tasksSlice";
import { Power } from "lucide-react";

const LogoutBtn = () => {
    const navigate = useRouter();
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        localStorage.removeItem('workflow_token')
        navigate.push('/login')
        dispatch(clearTasks())
    }
    return <Button onClick={handleLogout} variant={"secondary"} className='bg-[#F4F4F4]' size={"sm"}>
        <Power className="w-4 h-4 flex md:hidden" />
        <span className="hidden md:flex">Logout</span>
    </Button>;
};

export default LogoutBtn;