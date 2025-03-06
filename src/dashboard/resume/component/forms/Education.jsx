import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useContext } from 'react';
import { useParams } from 'react-router';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from "sonner";
import { useRef } from 'react';
import { Howl, Howler } from 'howler';
import { ThemeContext } from '@/context/ThemeContext';

function Education({ enabledNext }) {
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { theme } = useContext(ThemeContext);
    const [educationalList, setEducationalList] = useState([{
        university: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
    }]);

    const handleChange = (index, event) => {
        const newEntries = educationalList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    }

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            university: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1));
    }

    const onSave = (e) => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList.map(({ id, ...rest }) => rest)
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast("Your details have been saved successfully");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
        }, (err) => {
            console.log(err);
            toast("Something went wrong!Please try again...");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
            setLoading(false);
        });
        enabledNext(true);
    }

    useEffect(() => enabledNext(false), []);

    useEffect(() => {
        console.log(educationalList);
        setResumeInfo({
            ...resumeInfo,
            education: educationalList
        });
    }, [educationalList])

    useEffect(() => {
        if (resumeInfo === null || undefined) {
            setEducationalList([{
                university: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: ''
            }])
        }
        else {
            setEducationalList(resumeInfo?.education);
        }
    }, []);

    return (
        <div className={(theme === 'light') ? 'bg-white p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10' : 'bg-gray-900 p-5 shadow-lg shadow-[rgba(0,191,255,0.8)] rounded-lg border-t-[rgba(0,191,255,0.8)] border-t-4 mt-10'}>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Please add your educational details</p>

            <div>
                {educationalList.map((education, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input name="university" defaultValue={education?.university} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input name="degree" defaultValue={education?.degree} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input name="major" defaultValue={education?.major} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input name="startDate" ref={startDateRef}
                                    onClick={() => startDateRef.current?.showPicker()} type="date" defaultValue={education?.startDate} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input name="endDate" ref={endDateRef}
                                    onClick={() => endDateRef.current?.showPicker()} type="date" defaultValue={education?.endDate} onChange={(event) => handleChange(index, event)} />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea name="description" defaultValue={education?.description} onChange={(event) => handleChange(index, event)} />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className='flex justify-between'>
                <div className='sm:flex-row gap-2 flex flex-col'>
                    <Button variant="outline" onClick={AddNewEducation} className={(theme === 'light') ? "text-primary" : "text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]"}>+ Add</Button>
                    <Button variant="outline" onClick={RemoveEducation} className={(theme === 'light') ? "text-primary" : "text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]"}>- Remove</Button>
                </div>

                <Button type="submit"
                    className={(theme === 'dark') ? 'bg-[rgba(0,191,255,0.8)] hover:bg-white' : ''}
                    disabled={loading}
                    onClick={() => onSave()}
                > {loading ? <LoaderCircle className='animate-spin' /> : "Save"}</Button>

            </div>
        </div>
    )
}

export default Education