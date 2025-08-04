import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner"
import { Howl, Howler } from 'howler';
import { ThemeContext } from '@/context/ThemeContext';

function PersonalDetails({ enabledNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        console.log(params);
        enabledNext(false);
    }, []);

    //set data from resumeInfo when fetched
    useEffect(() => {
        if (resumeInfo) {
            setFormData(resumeInfo);
        }
    }, [resumeInfo]);


    const handleInputChange = (e) => {
        // enabledNext(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });
    }

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: formData,
            section: "personalDetails"
        };
        GlobalApi.UpdateResumeDetail(params?.documentId, data).then(res => {
            console.log(res);
            // enabledNext(true);
            setLoading(false);
            toast("Your details have been saved successfully");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();

        }, (err) => {
            console.log(err);
            toast("Some error occured, please  try again...");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
            setLoading(false);
        });
        enabledNext(true);
    }

    return (
        <div className={(theme === 'light') ? 'bg-white p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10' : ' bg-gray-900 p-5 shadow-lg shadow-[rgba(0,191,255,0.8)] rounded-lg border-t-[rgba(0,191,255,0.8)] border-t-4 mt-10'}>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get started with basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
                    </div>


                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
                    </div>

                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" type="tel" onInvalid="this.setCustomValidity('Enter a valid 10-digit phone number')" onInput="this.setCustomValidity('haha')" pattern="[0-9]{10}" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" type="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                </div>

                <div className='mt-3 flex justify-end'>
                    <Button type="submit"
                        disabled={loading}
                        className={(theme === 'dark') ? 'bg-[rgba(0,191,255,0.8)] hover:bg-white' : ''}
                    > {loading ? <LoaderCircle className='animate-spin' /> : "Save"}</Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetails