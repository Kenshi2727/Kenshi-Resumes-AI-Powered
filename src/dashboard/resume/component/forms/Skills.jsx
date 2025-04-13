import { Input } from '@/components/ui/input';
import React from 'react'
import { Rating, ThinStar } from '@smastrom/react-rating'
import { useState } from 'react'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from "sonner";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useContext } from 'react';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router';
import { Howl, Howler } from 'howler';
import { ThemeContext } from '@/context/ThemeContext';



function Skills({ enabledNext }) {
    const { documentId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }]);
    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: (theme === 'light') ? '#ffb700' : '#00A3CC',
        inactiveFillColor: (theme === 'light') ? '#fbf1a9' : '#B3EFFF'
    }
    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }]);
    }

    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1));
    }


    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            },
            section: "skills"
        }
        GlobalApi.UpdateResumeDetail(documentId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast("Your details have been saved successfully");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
        }, (err) => {
            console.log(err);
            toast("Server Error, please try again!");
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
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        });
    }, [skillsList]);//every time skillsList changes, update the resumeInfo

    useEffect(() => {
        // if (resumeInfo === null || undefined) {
        //     setSkillsList([{
        //         name: '',
        //         rating: 0
        //     }])
        // }
        if (resumeInfo?.skills) {
            setSkillsList(resumeInfo?.skills);
        }
    }, []);
    return (
        <div>
            <div className={(theme === 'light') ? 'bg-white p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10' : 'bg-gray-900 p-5 shadow-lg shadow-[rgba(0,191,255,0.8)] rounded-lg border-t-[rgba(0,191,255,0.8)] border-t-4 mt-10'}>
                <h2 className='font-bold text-lg'>Skills</h2>
                <p>Add Your Top Skills</p>

                <div>
                    {skillsList.map((skill, index) => (
                        <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                            <div>
                                <label className='text-xs'>Skill Name</label>
                                <Input className="w-full" defaultValue={skill?.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                                {/*rating must be converted to 0 to 5 for value and must be passed between 0 to 100 for display */}
                            </div>
                            <Rating
                                itemStyles={myStyles}
                                style={{ maxWidth: 120 }}
                                value={(skill.rating) / 20}
                                defaultValue={(skill?.rating) / 20}
                                onChange={(value) => handleChange(index, 'rating', value * 20)} />
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='sm:flex-row gap-2 flex flex-col'>
                        <Button variant="outline" onClick={AddNewSkills} className={(theme === 'light') ? "text-primary" : "text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]"}>+ Add</Button>
                        <Button variant="outline" onClick={RemoveSkills} className={(theme === 'light') ? "text-primary" : "text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]"}>- Remove</Button>
                    </div>

                    <Button type="submit"
                        className={(theme === 'dark') ? 'bg-[rgba(0,191,255,0.8)] hover:bg-white' : ''}
                        disabled={loading}
                        onClick={() => onSave()}
                    > {loading ? <LoaderCircle className='animate-spin' /> : "Save"}</Button>

                </div>
            </div>
        </div>
    )
}

export default Skills