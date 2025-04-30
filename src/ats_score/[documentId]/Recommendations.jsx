import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'

function Recommendations() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200 p-7 rounded-lg shadow-lg w-full h-full flex flex-col justify-center gap-4' : 'bg-[rgba(0,191,255,0.8)] p-7 rounded-lg shadow-lg w-full h-full flex flex-col justify-center gap-4'}>
            <Textarea className={(theme === 'light') ? "resize-none h-[90%]" : 'resize-none h-[90%] border-white border-2'} placeholder="Get recommendations from AI!" disabled value='' />
            <Button className={(theme === 'dark') ? 'bg-white hover:bg-[rgba(0,191,255,0.8)]' : ''}>Generate Recommendations</Button>
            <Button className={(theme === 'dark') ? 'bg-white hover:bg-[rgba(0,191,255,0.8)]' : ''}>Check ATS Score</Button>
        </div>
    )
}

export default Recommendations