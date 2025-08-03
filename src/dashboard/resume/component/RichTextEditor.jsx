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
   Act as a professional resume writer. Write 5-7 bullet points in **plain, natural language** based on the title "{positionTitle}" for use in a resume. 

⚠️ VERY IMPORTANT:
- Do NOT use quotation marks, brackets, braces, or colons
- Do NOT use keys like "bullets", "experience_level", or JSON-like structures
- ONLY return each bullet point on its own line
- Each bullet must begin with an action verb and contain measurable achievements where possible

✅ Example output:
Developed and maintained applications using Python and Django.
Led a team of 5 engineers to launch a new fintech product ahead of schedule.
...

❌ Do NOT return this:
{
  "bullets": [
    "Managed teams...",
    ...
  ]
}
    `


const filterPrompt = `
Convert the following response into clean, semantically valid HTML suitable for rendering in a rich text editor.

    Use < ol > and < li > tags properly

If items are numbered, use < ol > instead.

Make sure every point is wrapped inside proper list tags — not just line breaks or paragraphs.

Wrap all items inside < ol > and < li > tags.(HIGHEST PRIORITY)
    + Prefer < ol > over < ul > when the points are sequential tasks or achievements.

Avoid inline styles, just clean, valid HTML.

Preserve all bold headings as <strong>

Keep line breaks and paragraph structure clear

Avoid external styles, inline CSS, or JavaScript

Only return the HTML inside the < body > (no < html > or < head > tags)

The result must be pasteable into a rich text editor that expects HTML
`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [editorKey, setEditorKey] = useState(0);
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
        // const filteredResponse = await chatSession.sendMessage(filterPrompt + result.response.text());
        const filteredResponse = await chatSession.sendMessage(filterPrompt + '\n' + `<ol ol >\n` + result.response.text() + `\n</ol > `);
        console.log(filteredResponse.response.text());
        const res = filteredResponse.response.text();

        let resFilter = res
            .replace('[', '')
            .replace(']', '')
            .replace('{', '')
            .replace('}', '')
            .replace("undefined", '')
            .replace(/^.*?["']?\s*/, '')
            .replace(/^"html":\s*/i, '')
            .replace(/\\n/g, '')    // literal \n
            .replace(/\r?\n/g, '')  // actual newlines
            .trim();

        // Remove wrapping quotes around the whole string
        if (resFilter.startsWith('"') && resFilter.endsWith('"')) {
            resFilter = resFilter.slice(1, -1);
        }

        setvalue(resFilter);

        onRichTextEditorChange(
            { target: { value: resFilter } },  // fake “event”
            'workSummery',                 // the field name your parent expects
            index                          // the index prop you passed in
        );

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
                    key={editorKey}
                    className={(theme === 'dark') ? 'bg-gray-950 text-white text-base md:text-sm' : 'text-base md:text-sm'}
                    value={value}
                    onChange={(e) => {
                        setvalue(e.target.value);
                        setEditorKey(prev => prev + 1); // force re-mount by changing key
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