import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Home } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router';
import ThemeColor from './ThemeColor';

function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    const { resumeId } = useParams();

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5'>
                    <Link to={"/dashboard"}>
                        <Button><Home /></Button>
                    </Link>
                    <ThemeColor />
                </div>

                <div className='flex gap-2'>
                    {activeFormIndex > 1 && <Button size="sm"
                        onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                    >
                        <ArrowLeft />
                    </Button>}
                    <Button
                        disabled={!enableNext}
                        className="flex gap-2" size="sm"
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
                        Next
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            {/* Personal Detail */}
            {
                activeFormIndex == 1 ?
                    <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
                    /*Summary */
                    : activeFormIndex == 2 ?
                        <Summary enabledNext={(v) => setEnableNext(v)} />
                        /*Experience */
                        : activeFormIndex == 3 ?
                            <Experience enabledNext={(v) => setEnableNext(v)} />
                            /*Education */
                            : activeFormIndex == 4 ?
                                <Education enabledNext={(v) => setEnableNext(v)} />
                                /*Skills */
                                : activeFormIndex == 5 ?
                                    <Skills enabledNext={(v) => setEnableNext(v)} />
                                    : activeFormIndex == 6 ?
                                        <Navigate to={'/my-resume/' + resumeId + '/view'} />
                                        : null}
        </div>
    )
}

export default FormSection