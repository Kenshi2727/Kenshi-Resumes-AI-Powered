import React, { useContext, useState } from 'react'
import { SignIn } from '@clerk/clerk-react'
import Header from '@/components/custom/Header'
import Footer from '@/components/custom/Footer'
import { useEffect } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { dark, light } from '@clerk/themes';

function SignInPage() {
    const [signIn, setSignIn] = useState(false);
    const { theme } = useContext(ThemeContext);
    useEffect(() => {
        setSignIn(true);
    }, []);

    return (
        <>
            <Header state={signIn} />
            <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200 overflow-clip' : 'overflow-clip'}>
                <div className={(theme === 'light') ? 'h-screen  bg-[url("../../textures/food.png")] overflow-y-scroll' : 'h-screen bg-[url("../../textures/cubes.png")] overflow-y-scroll'}>
                    <div className='h-full w-full flex justify-center items-center'>
                        <div className={(theme === 'light') ? 'my-20 shadow-xl shadow-primary transition-all rounded-lg' : ' my-20 shadow-xl shadow-[rgba(0,191,255,0.8)] transition-all rounded-lg'}>
                            <SignIn
                                fallbackRedirectUrl='/'
                                forceRedirectUrl='/'
                                signUpForceRedirectUrl='/'
                                signUpFallbackRedirectUrl='/'
                                withSignUp={true}
                                appearance={
                                    (theme === 'dark') ?
                                        {
                                            baseTheme: dark,
                                        }
                                        :
                                        {
                                            baseTheme: light,
                                        }}
                            />{/*provided by clerk*/}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignInPage