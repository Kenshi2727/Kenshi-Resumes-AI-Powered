import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import { UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { ThemeContext } from '../../context/ThemeContext'
import { useContext } from 'react'
import { ModeToggle } from '../ui/mode-toggle'
import { light, dark } from '@clerk/themes'
import { BookMarked } from 'lucide-react'

function Header({ state }) {
    const { user, isSignedIn, isLoaded } = useUser();
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200 relative' : 'bg-[#000] relative'}>
            <div className={(theme === 'light') ? 'bg-[url("../../textures/subtle-zebra-3d.png")] p-3 px-5 flex justify-between items-center shadow-md' : 'p-3 px-5 flex justify-between items-center shadow-lg shadow-[rgba(0,191,255,0.8)]'}>
                <Link to={'/'}>
                    <img src={(theme === 'light') ? "../../../logo2.png" : "../../../logo.png"} alt="logo" width={180} height={100} />
                </Link>
                {
                    isSignedIn ?
                        <div className='flex gap-2 items-center'>
                            <ModeToggle />
                            <Link to={'/dashboard'}>
                                <Button variant="outline" className={(theme === 'dark') ? 'hidden sm:block text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]' : 'hidden sm:block'}>Dashboard Button</Button>
                                <Button variant="outline" size="icon" className={(theme === 'dark') ? 'sm:hidden flex justify-center items-center text-[rgba(0,191,255,0.8)] hover:border-[rgba(0,191,255,0.8)]' : 'flex justify-center items-center sm:hidden'}> <BookMarked /></Button>
                            </Link>
                            <UserButton
                                appearance={
                                    (theme === 'dark') ?
                                        {
                                            baseTheme: dark,
                                        }
                                        :
                                        {
                                            baseTheme: light,
                                        }}
                            />
                        </div> :
                        <div className='flex gap-2 items-center'>
                            <ModeToggle />
                            <Link to={state ? '/' : '/auth/sign-in'}>    {/*from react router*/}
                                <Button className={(theme === 'light') ? "bg-gradient-to-r from-violet-400 to-indigo-600" : "bg-white hover:bg-[rgba(0,191,255,0.8)]"}>{state ? 'Go back to Home' : 'Get Started'}</Button>
                            </Link>
                        </div>
                }
            </div >
        </div>
    )
}

export default Header