import React from 'react'
import Recommendations from './Recommendations'

function ATS_Score() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 to-yellow-200'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[500px] grid grid-cols-2 gap-4'>
                <div> ATS Score </div>
                <Recommendations />
            </div>
        </div>
    )
}

export default ATS_Score