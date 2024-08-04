import React from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel } from '@/app/_components/ui/alert-dialog'

interface AlertWrapProps {
    button: React.ReactNode;
    title: string;
    description?: string;
    cancelButton?: string;
    actionButton?: string;
    onAction?: () => void;
}

const AlertWrap = ({ button, title, description, cancelButton = "Cancel", actionButton = "Continue", onAction }: AlertWrapProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {button}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelButton}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>{actionButton}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertWrap;