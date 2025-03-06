import React from 'react'
import { useState } from 'react'
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Toolbar,
    Editor,
    EditorProvider,
} from 'react-simple-wysiwyg';
import { Brain, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { useContext } from 'react';
import { chatSession } from './../../../../service/AIModel';
import { Howl, Howler } from 'howler';
import { ThemeContext } from '@/context/ThemeContext';

const PROMPT =
    `
    Based on the position "{positionTitle}", provide 5-7 bullet points for my resume experience for a word file.
    Do not include any JSON formatting, keys, or extra text or any special characters or quotes. 

    DO NOT GIVE RESPONSE LIKE A JSON OBJECT OR A JS OBJECT OR IN KEY VALUE PAIR JUST GIVE RESPONSE LIKE IN NARURAL LANGUAGE.

    Response format example(VERY STRICTLY FOLLOW!):

    Developed and maintained applications using Python, Django, and PostgreSQL.
    Collaborated with product managers and designers to define and implement user-friendly features. 
    Implemented RESTful APIs to integrate with various internal and external services.
    Automated testing using pytest and continuous integration/continuous deployment (CI/CD) pipelines.

    UNACCETABLE RESPONSE EXAMPLE:
    "bullets": [
    "Developed and maintained applications using Java Spring Boot and RESTful APIs",
    "Collaborated with cross-functional teams to design develop and deploy software solutions",
    "Implemented automated testing frameworks using JUnit and Mockito to ensure high code quality",
    "Troubleshooted and resolved production issues ensuring application stability and performance",
    "Contributed to the design and implementation of CI/CD pipelines for automated deployments using Jenkins",
    "Optimized application performance by identifying and resolving bottlenecks in code and database queries",
    "Participated in code reviews and provided constructive feedback to improve code quality and maintainability"
  ]

    `
function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [value, setvalue] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);
    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        if (!resumeInfo?.Experience[index]?.title) {
            console.log(index);
            toast("Please add a position title to generate the summary");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
            setLoading(false);
            return;//if the user has not selected a position title, show a toast message and return
        }
        const prompt = PROMPT.replace("{positionTitle}", resumeInfo?.Experience[index]?.title);
        console.log(PROMPT);
        const result = await chatSession.sendMessage(prompt);
        console.log(result.response.text());
        const res = result.response.text();
        setvalue(res.replace('[', '').replace(']').replace('{', '').replace('}'));
        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between items-center my-2'>
                <label className='text-xs'>Summery</label>
                <Button variant="outline" size="sm"
                    className={(theme === 'light') ? "sm:flex gap-2 border-primary text-primary hidden" : "sm:flex gap-2 hover:border-[rgba(0,191,255,0.8)] border-[rgba(0,191,255,0.8)] text-[rgba(0,191,255,0.8)] hidden"}
                    onClick={GenerateSummaryFromAI}>
                    {
                        loading ?
                            <LoaderCircle className='animate-spin' /> :
                            <>
                                <Brain className='h-4 w-4' />Generate from AI
                            </>
                    }
                </Button>
                <Button variant="outline" size="sm"
                    className={(theme === 'light') ? "flex gap-2 border-primary text-primary sm:hidden" : "flex gap-2 hover:border-[rgba(0,191,255,0.8)] border-[rgba(0,191,255,0.8)] text-[rgba(0,191,255,0.8)] sm:hidden"}
                    onClick={GenerateSummaryFromAI}>
                    {
                        loading ?
                            <LoaderCircle className='animate-spin' /> :
                            <>
                                <Brain className='h-4 w-4' />AI
                            </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor
                    className={(theme === 'dark') ? 'bg-gray-950' : ''}
                    value={value}
                    onChange={(e) => {
                        setvalue(e.target.value);
                        onRichTextEditorChange(e);//function to be called when the value of the editor changes
                    }}
                >
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <HtmlButton />
                        <Separator />
                        <BtnStyles style={{ color: '#333', backgroundColor: '#fff' }} />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div >
    )
}

export default RichTextEditor