import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { React, useContext, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useEffect } from 'react';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner";
import { Brain } from 'lucide-react';
import { chatSession } from './../../../../../service/AIModel';
import { Howl, Howler } from 'howler';

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result = await chatSession.sendMessage(PROMPT);
        console.log(result.response.text());
        setAiGeneratedSummaryList(JSON.parse(result.response.text()));
        toast("Please check the suggestions from our AI model");
        var sound = new Howl({
            src: ['/notif.mp3']
        });
        sound.play();
        setLoading(false);
    }

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        });
    }, [summery]);

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: {
                summery: summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res);
            enabledNext(true);
            setLoading(false);
            toast("Your details have been saved successfully");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();

        }, (err) => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Please add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button type="button" onClick={() => GenerateSummaryFromAI()} className="border-primary text-primary flex gap-2" variant="outline" size="sm"><Brain className="h-4 w-4" />Generate using AI</Button>
                    </div>
                    <Textarea
                        placeholder="Write your own or can see the magic of AI"
                        className="mt-5"
                        value={summery ? summery : resumeInfo?.summery}
                        onChange={(e) => setSummery(e.target.value)}
                        required
                    />

                    <div className='mt-2 flex justify-end'>
                        <Button disabled={loading} type="submit">
                            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummaryList &&
                <div>
                    <h2 className='font-bold text-lg'>Suggestions:</h2>
                    {aiGeneratedSummaryList.map((item, index) => (
                        <div key={index}
                            onClick={() => setSummery(item?.summary)}
                            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default Summary