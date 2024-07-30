"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const LogoutBtn = () => {
    const navigate = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('workflow_token')
        navigate.push('/login')
    }
    return <Button onClick={handleLogout} variant={"secondary"} className='bg-[#F4F4F4]' size={"sm"}>
        Logout
    </Button>;
};

export default LogoutBtn;