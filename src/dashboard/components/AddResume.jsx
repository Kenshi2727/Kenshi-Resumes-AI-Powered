import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
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

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const [loading, setLoading] = useState(false);

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
            console.log(res);
            if (res) {//if the response is successful
                setLoading(false);
                setOpenDialog(false);
            }
        }, (err) => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
                onClick={() => setOpenDialog(true)}>
                <PlusSquare />
            </div>

            <Dialog open={openDialog}> {/* if openDialog is true dialog will open and vice-versa */}
                {/* <DialogTrigger>Open</DialogTrigger> */} {/* This is the button that will trigger open the dialog */}
                <DialogContent>
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
                            <Button disabled={!resumeTitle || loading} onClick={onCreate}>
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