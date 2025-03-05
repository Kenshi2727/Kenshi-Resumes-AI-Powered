import React from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { BookMarked, ListStart } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { CarouselSize } from '@/components/custom/CarouselSize'


function Home() {
    const { isSignedIn } = useUser();
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200' : 'bg-[url("../home3.png")] bg-cover text-white'}>
            <Header />
            <div className={(theme === 'light') ? 'bg-[url("../textures/batthern.png")]' : ''}>
                <div className='min-h-screen flex justify-center items-center'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-serif text-center mb-10'>Welcome to <span className={(theme === 'light') ? 'bg-gradient-to-r from-violet-400 to-indigo-600 p-2 border rounded-xl text-white text-2xl sm:text-5xl whitespace-nowrap shadow-xl shadow-primary' : 'p-2 border-2 border-white rounded-xl text-white text-2xl sm:text-5xl whitespace-nowrap shadow-xl shadow-[rgba(0,191,255,0.8)]'}>Kenshi Resumes</span> </h1>
                        <h3 className={(theme === 'light') ? 'text-center font-medium text-xs sm:text-base' : 'text-center font-bold text-sm sm:text-base'}>"Leverage the potential of AI to set yourself apart from the competition."</h3>
                        <div className='flex justify-center'>
                            <Link to={isSignedIn ? '/dashboard' : '/auth/sign-in'}>
                                <Button className={(theme === 'light') ? "my-3 text-center bg-gradient-to-r from-violet-400 to-indigo-600 shadow-lg shadow-primary" : 'text-white text-center my-3 bg-gradient-to-r from-slate-900 to-slate-700 shadow-lg shadow-[rgba(0,191,255,0.8)] hover:text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]'}>
                                    {isSignedIn ? 'Go to Dashboard' : 'Sign In / Sign Up'} {isSignedIn ? <BookMarked /> : <ListStart />}
                                </Button>
                            </Link>
                        </div>

                        <div className='my-5 flex justify-center items-center'>
                            <CarouselSize />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home