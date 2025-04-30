import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

function Recommendations() {
    return (
        <div className='bg-gradient-to-r from-red-200 to-yellow-200 p-7 rounded-lg shadow-lg w-full h-full flex flex-col justify-center gap-4'>
            <Textarea className="resize-none h-[90%]" placeholder="Get recommendations from AI!" />
            <Button>Generate Recommendations</Button>
            <Button>Check ATS Score</Button>
        </div>
    )
}

export default Recommendations