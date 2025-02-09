import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {
    return (
        <div>
            <h2 className='font-bold text-xl text-center'
                style={{
                    color: resumeInfo?.themeColor || "#3357FF"
                }}>
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
            <h2 className='text-center font-normal text-xs'
                style={{
                    color: resumeInfo?.themeColor || "#3357FF"
                }}>
                {resumeInfo?.address}
            </h2>

            <div className='flex justify-between'>
                <h2 className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor || "#3357FF"
                    }}>
                    {resumeInfo?.phone}
                </h2>
                <h2 className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor || "#3357FF"
                    }}>
                    {resumeInfo?.email}
                </h2>
            </div>

            <hr className='border-[1.5px] my-2'
                style={{
                    borderColor: resumeInfo?.themeColor || "#3357FF"
                }}
            />
        </div>
    )
}

export default PersonalDetailPreview