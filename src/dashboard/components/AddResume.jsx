import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState, useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../../service/GlobalApi'
import { useNavigate } from 'react-router'
import { ThemeContext } from '@/context/ThemeContext'

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();//useNavigate hook to navigate to different routes
    const { theme, setTheme } = useContext(ThemeContext);
    const { user } = useUser();

    const onCreate = () => {
        setLoading(true);//set loading to true to show loading spinner
        const uuid = uuidv4();  // generate a unique id for the resume
        // console.log(resumeTitle, uuid);
        const data = {
            //data fields to be sent to the backend
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        GlobalApi.CreateNewResume(data).then((res) => {
            console.log(res.data.data.documentId);//get the document id from the response as strapi requires the document id to be passed in the url

            console.log(res);
            if (res) {//if the response is successful
                setLoading(false);
                setOpenDialog(false);
                // navigation('/dashboard/resume/' + uuid + '/edit');//navigate to the edit page of the resume
                navigation('/dashboard/resume/' + res.data.data.documentId + '/edit');//navigate to the edit page of the resume
            }
        }, (err) => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <div>
            <div className={'p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all shadow-md hover:shadow-lg cursor-pointer border-dashed'}
                onClick={() => setOpenDialog(true)}>
                <PlusSquare />
            </div>

            {/*onOpenChange={setOpenDialog} dialog will automatically pass false */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}> {/* if openDialog is true dialog will open and vice-versa */}
                {/* <DialogTrigger>Open</DialogTrigger> */} {/* This is the button that will trigger open the dialog */}
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add a title for you resume
                            <Input className="mt-2 my-2" placeholder="Enter your job title here" onChange={
                                (e) => setResumeTitle(e.target.value)
                            } />
                        </DialogDescription>

                        {/*editing dialog box*/}
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost" className="text-white">Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={onCreate}
                                className={(theme === 'dark') ? 'bg-[rgba(0,191,255,0.8)] hover:bg-[rgba(0,191,255,0.8)]' : ''}
                            >
                                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                            </Button>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume