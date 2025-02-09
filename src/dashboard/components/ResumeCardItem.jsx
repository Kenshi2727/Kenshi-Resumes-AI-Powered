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

function ResumeCardItem({ resume, refreshData }) {
    const [loading, setLoading] = useState(false);
    const naviation = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    // const onMenuClick = (url) => {
    //     naviation(url);
    // }

    const onDelete = () => {
        setLoading(true);
        GlobalApi.DeleteResumeById(resume.documentId).then(res => {
            console.log(res);
            toast("Your resume has been deleted!😱");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
            refreshData();//calls getResumeList() to fetch latest data
            setOpenAlert(false);
            setLoading(false);
        });
    }

    return (
        // <Link to={'/dashboard/resume/' + resume.documentId + '/edit'}>
        <div>
            <div className='p-14 bg-secondary flex justify-center gap-2 items-center h-[280px] border border-primary rounded-lg hover:scale-105 shadow-lg  hover:shadow-md shadow-primary transition-all cursor-pointer bg-gradient-to-r from-yellow-200 to-pink-400'>
                <div className='flex flex-col gap-2'>
                    <img src="cardLogo.png" width={60} height={60} alt="card-logo" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className='bg-transparent shadow-primary shadow-sm'>
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
                                    disabled={loading}>
                                    {loading ? 'Deleting...' : 'Continue'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <h2 className='text-center my-1 text-black'>{resume.title}</h2>
            </div>
        </div>
        // </Link>
    )
}

export default ResumeCardItem