import React from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { BookMarked, ListStart } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { CarouselSize } from '@/components/custom/CarouselSize'
import { useEffect, useState } from 'react'
import Footer from '@/components/custom/Footer'
import Visits from './Visits'

function Home() {
    const fullText = '"Leverage the potential of AI to set yourself apart from the competition."';
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 18); // Adjust speed as needed

        return () => clearInterval(interval);//clean up function to clear interval returned in useEffect
    }, []);

    const { isSignedIn } = useUser();
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200' : 'bg-[url("../home3.png")] bg-cover bg-no-repeat bg-center text-white'}>
            <Header />
            <div className={(theme === 'light') ? 'bg-[url("../textures/batthern.png")] p-10' : 'p-10'}>
                <div className='min-h-screen flex justify-center items-center'>
                    <div className='flex flex-col gap-2 place-items-center'>
                        <div className='flex flex-col gap-2 mt-10 place-items-center'>
                            <h1 className='font-serif text-center mb-10'>Welcome to <span className={(theme === 'light') ? 'bg-gradient-to-r from-violet-400 to-indigo-600 p-2 border rounded-xl text-white text-2xl sm:text-5xl whitespace-nowrap shadow-xl shadow-primary' : 'bg-black p-2 border-2 border-white rounded-xl text-white text-2xl sm:text-5xl whitespace-nowrap shadow-xl shadow-[rgba(0,191,255,0.8)]'}>Kenshi Resumes</span> </h1>
                            <div>
                                <h3 className={(theme === 'light') ? 'text-center font-medium text-xs sm:text-base' : 'text-center font-medium text-xs sm:text-base bg-black'}>{displayedText}</h3>
                            </div>
                        </div>
                        <div className='flex justify-center gap-6'>
                            <Link to={isSignedIn ? '/dashboard' : '/auth/sign-in'}>
                                <Button className={(theme === 'light') ? "my-3 text-center bg-gradient-to-r from-violet-400 to-indigo-600 shadow-lg shadow-primary" : 'text-white text-center my-3 bg-gradient-to-r from-slate-900 to-slate-700 shadow-lg shadow-[rgba(0,191,255,0.8)] hover:text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]'}>
                                    {isSignedIn ? 'Go to Dashboard' : 'Sign In / Sign Up'} {isSignedIn ? <BookMarked /> : <ListStart />}
                                </Button>
                            </Link>

                            {!isSignedIn &&
                                (<Link to='/'>
                                    <Button onClick={() => alert("Under development------->\nparty popper animation\nConvert it into a Progressive Web App\ncomplete the remaining backend-encryption etc.\ntelegram bot feedback system and rating---->\n<<<Map tele user name with documentId>>>\nanalytics dashboard--download history,site visit and resume creation frequency charts\nATS SCORE PROMPT AND ATS PIECHART\nPrompt-->\nGive ats score for the resume returning a json structure as follows and do not say anything else.\n{\nats_score:ats score in percentage\n}\nresume automatic sharing on telegram\nreconfiguring ai prompts\nbuilding new footer\ntemp mail and temp user for trial functionality\nresolve dashboard overflow issue")} className={(theme === 'light') ? "my-3 text-center bg-gradient-to-r from-violet-400 to-indigo-600 shadow-lg shadow-primary" : 'text-white text-center my-3 bg-gradient-to-r from-slate-900 to-slate-700 shadow-lg shadow-[rgba(0,191,255,0.8)] hover:text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]'}>
                                        Start your Trial ! <ListStart />
                                    </Button>
                                </Link>)
                            }
                        </div>

                        <div className='my-5 flex justify-center items-center'>
                            <CarouselSize />
                        </div>

                        <div className='my-5 w-screen flex justify-center items-center'>
                            <Visits />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
