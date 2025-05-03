import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext, useState } from 'react'
import GlobalApi from "../../../service/GlobalApi"
import { useParams } from 'react-router'
import { ScoreContext } from '@/context/ScoreContext'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Howl, Howler } from 'howler';

function Recommendations() {
    const { theme } = useContext(ThemeContext);
    const { score, setScore } = useContext(ScoreContext);
    const [recommendations, setRecommendations] = useState('');
    const [fetching, setFetching] = useState(false);
    const [recFetching, setRecFetching] = useState(false);
    const { documentId } = useParams();
    const getScore = async () => {
        setFetching(true);
        const response = await GlobalApi.GetAtsScore(documentId);
        if (response.status === 200) {
            setScore(response.data.score);
            console.log('ATS score:', response.data.score);
            toast("ATS score fetched successfully!");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
        } else {
            console.error('Error fetching ATS score:', response.statusText);
        }
        setFetching(false);
    }

    const getRecommendations = async () => {
        setRecFetching(true);
        const response = await GlobalApi.GetAtsRecommendations(documentId);
        if (response.status === 200) {
            setRecommendations(response.data.recommendations);
            toast("Here are your recommendations!");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
        }
        else {
            console.error('Error fetching ATS recommendations:', response.statusText);
        }
        setRecFetching(false);
    }

    return (
        <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200 p-7 rounded-lg shadow-lg w-full h-full flex flex-col justify-center gap-4' : 'bg-[rgba(0,191,255,0.8)] p-7 rounded-lg shadow-lg w-full h-full flex flex-col justify-center gap-4'}>
            <Textarea value={recommendations} className={(theme === 'light') ? "resize-none h-[90%]" : 'resize-none h-[90%] border-white border-2'} placeholder="Get recommendations from AI!" disabled />
            <Button onClick={getRecommendations} className={(theme === 'dark') ? 'bg-white hover:bg-[rgba(0,191,255,0.8)]' : ''}>{(recFetching) ? <LoaderCircle className='animate-spin' /> : 'Generate Recommendations'}</Button>
            <Button onClick={getScore} className={(theme === 'dark') ? 'bg-white hover:bg-[rgba(0,191,255,0.8)]' : ''}>{(fetching) ? <LoaderCircle className='animate-spin' /> : 'Check ATS Score'}</Button>
        </div>
    )
}

export default Recommendations
