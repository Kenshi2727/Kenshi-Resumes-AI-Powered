import React from 'react'

function ExperiencePreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor || "#3357FF" }}>
                Professional Experience
            </h2>

            <hr style={{
                borderColor: resumeInfo?.themeColor || "#3357FF"
            }} />

            {/*using () does not need return keyword */}
            {resumeInfo?.Experience?.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'
                        style={{
                            color: resumeInfo?.themeColor || "#3357FF"
                        }}>
                        {experience?.title}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        {experience?.companyName} , {experience?.city} , {experience?.state}
                        <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience.endDate}</span>
                    </h2>
                    {/* <p className='text-xs my-2'>
                        {experience?.workSummery}
                    </p> */}
                    {/* dangerouslySetInnerHTML is used to render the html tags */}
                    {/*A single div is used */}
                    <div dangerouslySetInnerHTML={{ __html: experience?.workSummery }} />
                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview