import { DownloadIcon, MoreHorizontal, PenBox, Trash, View } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'sonner'
import { Howl, Howler } from 'howler';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

function ResumeCardItem({ resume, refreshData }) {
    const [loading, setLoading] = useState(false);
    const naviation = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    // const onMenuClick = (url) => {
    //     naviation(url);
    // }
    const { theme, setTheme } = useContext(ThemeContext);

    const onDelete = () => {
        setLoading(true);
        GlobalApi.DeleteResumeById(resume.documentId).then(res => {
            console.log(res);
            toast.error("Your resume has been deleted!😱");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
            refreshData();//calls getResumeList() to fetch latest data
            window.location.reload();//refreshes the page forcefully because refreshData() is not working properly
            setOpenAlert(false);
            setLoading(false);
        });
    }

    return (
        // <Link to={'/dashboard/resume/' + resume.documentId + '/edit'}>
        <div>
            <div className={(theme === 'light') ? 'p-14 bg-secondary flex flex-col sm:flex-row justify-center gap-2 items-center h-[280px] border border-primary rounded-lg hover:scale-105 shadow-lg  hover:shadow-md shadow-primary transition-all cursor-pointer bg-gradient-to-r from-yellow-200 to-pink-400' : 'p-14 bg-secondary flex flex-col sm:flex-row justify-center gap-2 items-center h-[280px] border rounded-lg hover:scale-105 shadow-lg  hover:shadow-md shadow-[rgba(0,191,255,0.8)] transition-all cursor-pointer bg-gradient-to-r from-gray-600 to-gray-900'}>
                <div className='flex flex-col gap-2'>
                    <img src={(theme === 'light') ? "cardLogo.png" : "cardLogo2.png"} width={60} height={60} alt="card-logo" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className={(theme === 'light') ? 'bg-transparent shadow-primary shadow-sm' : 'bg-transparent shadow-[rgba(0,191,255,0.8)] shadow-sm'}>
                            <MoreHorizontal className='h-4 w-4 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => naviation('/dashboard/resume/' + resume.documentId + '/edit')}><PenBox />Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => naviation('/my-resume/' + resume.documentId + '/view')}><View />View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => naviation('/my-resume/' + resume.documentId + '/view')}><DownloadIcon />Download</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenAlert(true)}><Trash />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={openAlert}>
                        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDelete}
                                    className={(theme === 'dark') ? 'bg-[rgba(0,191,255,0.8)] hover:bg-[rgba(0,191,255,0.8)]' : ''}
                                    disabled={loading}>
                                    {loading ? 'Deleting...' : 'Continue'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <h2 className={(theme === 'light') ? 'text-center my-1 text-black' : 'text-center my-1 text-[rgba(0,191,255,0.8)]'}>{resume.title}</h2>
            </div>
        </div>
        // </Link>
    )
}

export default ResumeCardItem