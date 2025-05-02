import React from 'react'
import Component from "@/components/ui/chart-radial-text"
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'

function Score() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200 p-7 rounded-lg shadow-lg w-full h-full flex flex-col justify-center gap-4' : 'bg-[rgba(0,191,255,0.8)] p-7 rounded-lg shadow-lg w-full h-full flex flex-col justify-center gap-4'}>
            <Component />
        </div>
    )
}

export default Score