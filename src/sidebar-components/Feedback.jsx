import React from 'react'
import { useContext, useState } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Rating, ThinStar } from '@smastrom/react-rating'
import GlobalApi from '../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function Feedback() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [sendinng, setSending] = useState(false);
    const { theme } = useContext(ThemeContext);
    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: (theme === 'light') ? '#ffb700' : '#00A3CC',
        inactiveFillColor: (theme === 'light') ? '#fbf1a9' : '#B3EFFF'
    }

    function handleSubmit() {
        setSending(true);
        console.log('Feedback submitted:', { rating, feedback });
        GlobalApi.SendFeedback({
            rating: rating,
            feedback: feedback
        }).then((res) => {
            if (res.status === 200) {
                toast.success('Feedback submitted successfully');
            } else {
                toast.error('Failed to submit feedback');
            }
        }).catch((error) => {
            console.error('Error submitting feedback:', error);
            toast.error('Error submitting feedback');
        });

        // Reset the form
        setRating(0);
        setFeedback('');
        setSending(false);
    }
    return (
        <div className={(theme === 'light') ? 'min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 to-yellow-200' : 'min-h-screen flex items-center justify-center'}>
            <div className={(theme === 'light') ? 'bg-white p-7 rounded-lg shadow-lg my-4 md:w-full md:max-w-7xl max-w-[21rem] md:h-[500px] flex flex-col sm:flex-row justify-center items-center gap-8 overflow-y-scroll border-l-4 border-primary' : 'p-7 rounded-lg shadow-lg my-4 shadow-[rgba(0,191,255,0.8)] md:w-full md:max-w-7xl max-w-[21rem] md:h-[500px] flex flex-col sm:flex-row justify-center items-center gap-8 overflow-y-scroll border-l-4 border-[rgba(0,191,255,0.8)]'}>

                <h1 className='text-center'>We Value Your Feedback</h1>
                <div className='flex flex-col gap-4'>
                    <Input className={`border-2 border-${(theme === 'dark') ? '[rgba(0,191,255,0.8)]' : 'primary'}`} placeholder="Please give us your feedback..." onChange={(e) => setFeedback(e.target.value)} value={feedback} />
                    <div className='flex flex-col sm:flex-row gap-8'>
                        <Rating
                            itemStyles={myStyles}
                            style={{ maxWidth: 120 }}
                            value={rating}
                            onChange={(value) => setRating(value)}
                        />
                        <Button onClick={handleSubmit} className={`bg-${(theme === 'dark') ? '[rgba(0,191,255,0.8)]' : 'primary'} hover:${(theme === 'dark') ? 'bg-white' : ''}`} >{(sendinng) ? <LoaderCircle className='animate-spin' /> : 'Submit'}</Button>
                    </div>
                    <hr className={`border-${(theme === 'dark') ? '[rgba(0,191,255,0.8)]' : 'primary'}`} />
                    <p>
                        At Kenshi Resumes, your voice shapes our evolution. Every feature, every improvement, and every design choice we make is driven by one thing — you. Whether you’ve just crafted your first resume or are a long-time user optimizing your professional brand, your experience matters to us.

                        We believe that the best products are built in collaboration with their users. That’s why we invite you to share your thoughts, suggestions, and ideas. What did you love? What could we do better? Is there a feature you’d like to see? No feedback is too small — your insights help us grow, and in return, we’re committed to giving you a better, smarter, and smoother resume-building journey.

                        Have a moment? Drop us a quick note below or reach out directly. Your feedback not only helps us improve — it helps countless others create resumes that change their lives.

                        Let’s build Kenshi Resumes together.

                        💬 "Your story deserves to be heard — and so does your feedback."
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Feedback