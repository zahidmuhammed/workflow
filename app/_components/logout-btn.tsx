"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAppDispatch } from "../_utils/hooks";
import { clearTasks } from "../_redux/slices/tasksSlice";

const LogoutBtn = () => {
    const navigate = useRouter();
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        localStorage.removeItem('workflow_token')
        navigate.push('/login')
        dispatch(clearTasks())
    }
    return <Button onClick={handleLogout} variant={"secondary"} className='bg-[#F4F4F4]' size={"sm"}>
        Logout
    </Button>;
};

export default LogoutBtn;