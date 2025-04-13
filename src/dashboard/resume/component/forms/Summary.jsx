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
import { ThemeContext } from '@/context/ThemeContext';

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
    const { theme } = useContext(ThemeContext);

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
        enabledNext(false);
        if (resumeInfo === null || undefined) setSummery("");
        else (resumeInfo.summery !== null) && setSummery(resumeInfo?.summery);
    }, []);

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
            },
            section: "summery"
        }
        GlobalApi.UpdateResumeDetail(params?.documentId, data).then(res => {
            console.log(res);
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
        enabledNext(true);
    }

    return (
        <div>
            <div className={(theme === 'light') ? 'bg-white p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10' : 'bg-gray-900 p-5 shadow-lg shadow-[rgba(0,191,255,0.8)] rounded-lg border-t-[rgba(0,191,255,0.8)] border-t-4 mt-10'}>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Please add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button type="button" onClick={() => GenerateSummaryFromAI()} className={(theme === 'light') ? "border-primary text-primary sm:flex gap-2 hidden" : "border-[rgba(0,191,255,0.8)] text-[rgba(0,191,255,0.8)] sm:flex gap-2 hidden"} variant="outline" size="sm"><Brain className="h-4 w-4" />Generate using AI</Button>
                        <Button type="button" onClick={() => GenerateSummaryFromAI()} className={(theme === 'light') ? "border-primary text-primary flex gap-2 sm:hidden" : "border-[rgba(0,191,255,0.8)] text-[rgba(0,191,255,0.8)] flex gap-2 sm:hidden"} variant="outline" size="sm"><Brain className="h-4 w-4" />AI</Button>
                    </div>
                    <Textarea
                        placeholder="Write your own or can see the magic of AI"
                        className="mt-5"
                        value={summery ? summery : resumeInfo?.summery}
                        onChange={(e) => setSummery(e.target.value)}
                        required
                    />

                    <div className='mt-2 flex justify-end'>
                        <Button disabled={loading} type="submit" className={(theme === 'dark') ? 'bg-[rgba(0,191,255,0.8)] hover:bg-white' : ''}>
                            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummaryList &&
                <div>
                    <h2 className='font-bold text-lg my-4'>🤖 Suggestions:</h2>
                    {aiGeneratedSummaryList.map((item, index) => (
                        <div key={index}
                            onClick={() => setSummery(item?.summary)}
                            className={(theme === 'light') ? 'p-5 shadow-lg my-4 rounded-lg cursor-pointer' : 'p-5 shadow-lg shadow-[rgba(0,191,255,0.8)] my-4 rounded-lg cursor-pointer'}>
                            <h2 className={(theme === 'light') ? 'font-bold my-1 text-primary' : 'font-bold my-1 text-[rgba(0,191,255,0.8)]'}>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default Summary