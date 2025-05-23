import React, { useContext } from 'react'
import Recommendations from './Recommendations'
import Score from './Score'
import { ThemeContext } from '@/context/ThemeContext'

function ATS_Score() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={(theme === 'light') ? 'min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 to-yellow-200' : 'min-h-screen flex items-center justify-center'}>
            <div className={(theme === 'light') ? 'bg-white p-7 rounded-lg shadow-lg md:w-full md:max-w-4xl max-w-[21rem] md:h-[500px] flex flex-col md:grid md:grid-cols-2 gap-4' : 'p-7 rounded-lg shadow-lg shadow-[rgba(0,191,255,0.8)] w-full max-w-4xl md:h-[500px] flex flex-col md:grid md:grid-cols-2 gap-4'}>
                <Score />
                <Recommendations />
            </div>
        </div>
    )
}

export default ATS_Score