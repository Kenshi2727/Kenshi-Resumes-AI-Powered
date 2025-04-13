import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router'
import GlobalApi from '../../../../service/GlobalApi'
import { toast } from 'sonner'
import { Howl, Howler } from 'howler';
import { ThemeContext } from '@/context/ThemeContext'

function ThemeColor() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const { documentId } = useParams();
    const { theme } = useContext(ThemeContext);
    const onColorSelect = (color) => {
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })
        // console.log(resumeInfo);
        const data = {
            data: {
                themeColor: color
            }
        }
        GlobalApi.UpdateResumeDetail(documentId, data).then(res => {
            console.log(res);
            toast("Theme Color Updated🎨🖌️");
            var sound = new Howl({
                src: ['/notif.mp3']
            });
            sound.play();
        })
    }

    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className={(theme === 'light') ? "flex gap-2" : "flex gap-2 hover:border-[rgba(0,191,255,0.8)]"}><LayoutGrid />Theme</Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='mb-4 text-sm font-bold'>Select Theme Color:</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onColorSelect(item)}
                            className='h-5 w-5 rounded-full hover:border-0 active:border-gray-700 border-4 cursor-pointer'
                            style={{
                                background: item
                            }}>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>

    )

}

export default ThemeColor