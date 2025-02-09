import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner";
import { useRef } from 'react';
import { Howl, Howler } from 'howler';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: ''
};

function Experience() {
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [experienceList, setExperienceList] = useState([formField]);

    {/*index of the particular experience div and name and value of a particular experience role 
    newEntries now holds:
        [
        { title: 'Software Engineer', companyName: 'Tech Co.' },
        { title: 'Data Scientist', companyName: 'Data Inc.' }
        ]
    */}

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }

    useEffect(() => {
        if (resumeInfo === null || undefined) setExperienceList([formField]);
        else (resumeInfo) && setExperienceList(resumeInfo?.Experience)
    }, []);

    useEffect(() => {
        console.log(experienceList);
        setResumeInfo({
            ...resumeInfo,
            Experience: experienceList
        });
    }, [experienceList]);

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: ''
        }]);
        console.log(experienceList);

    }

    const RemoveExperience = () => {
        {/*
            array.slice(1, 3) returns [2, 3] (starts at index 1, ends before index 3).
            array.slice(0, -1) returns [1, 2, 3, 4] (all elements except the last one).
        */}
        setExperienceList(experienceList => experienceList.slice(0, -1));
        console.log(experienceList);
    }

    const handleRichTextEditorChange = (event, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = event.target.value;
        setExperienceList(newEntries);
    }

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                Experience: experienceList.map(({ id, ...rest }) => rest)
            }
        }

        console.log(experienceList)

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast('Details updated !')
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
        }, (error) => {
            setLoading(false);
        })

    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Please add your previous Job Experience</p>
                <div>
                    {experienceList?.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title" defaultValue={item?.title} onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName" defaultValue={item?.companyName} onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city" defaultValue={item?.city} onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state" defaultValue={item?.state} onChange={(event) => handleChange(index, event)} />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                        type="date"
                                        ref={startDateRef}
                                        onClick={() => startDateRef.current?.showPicker()}
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate} />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                        type="date"
                                        ref={endDateRef}
                                        onClick={() => endDateRef.current?.showPicker()}
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate} />
                                </div>
                                <div className='col-span-2'>
                                    {/*Work Summary */}
                                    <RichTextEditor
                                        defaultValue={item?.workSummery}
                                        key={index}
                                        index={index}
                                        onRichTextEditorChange={(event) => handleRichTextEditorChange(event, 'workSummery', index)}
                                    />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary">+ Add More Experience</Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-primary">- Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={() => onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Experience