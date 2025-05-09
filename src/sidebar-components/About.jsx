import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

function About() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={(theme === 'light') ? 'min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 to-yellow-200' : 'min-h-screen flex items-center justify-center'}>
            <div className={(theme === 'light') ? 'bg-white p-7 rounded-lg shadow-lg my-4 md:w-full md:max-w-7xl max-w-[21rem] md:h-[500px] flex flex-col sm:flex-row justify-center items-center gap-8 overflow-y-scroll border-l-4 border-primary' : 'p-7 rounded-lg shadow-lg my-4 shadow-[rgba(0,191,255,0.8)] md:w-full md:max-w-7xl max-w-[21rem] md:h-[500px] flex flex-col sm:flex-row justify-center items-center gap-8 overflow-y-scroll border-l-4 border-[rgba(0,191,255,0.8)]'}>

                <h1 className='text-center'>About Kenshi Resumes</h1>
                <p>
                    Kenshi Resumes is your intelligent career companion, redefining the way modern professionals present themselves to the world. In today’s fast-paced, competitive job market, your resume isn’t just a document — it’s your personal brand, your first handshake, and often, your only chance to leave a lasting impression. At Kenshi Resumes, we understand this deeply. That’s why we built a platform that merges cutting-edge technology with elegant design to help you craft resumes that don’t just meet expectations — they exceed them.

                    Our mission is simple yet powerful: empower individuals to tell their professional stories with clarity, confidence, and creativity. Whether you're a fresh graduate seeking your first opportunity, a seasoned expert pivoting into a new domain, or a freelancer showcasing a dynamic portfolio, Kenshi Resumes equips you with the right tools to express your unique value.

                    We harness the power of AI-driven content generation, real-time suggestions, and modern, customizable templates that adapt to your industry, goals, and experience level. The platform is tailored to guide you step-by-step, transforming blank pages into impactful resumes that resonate with hiring managers and applicant tracking systems (ATS) alike. You don’t just fill out fields; you shape a narrative that reflects who you are and where you’re headed.

                    But we don’t stop there.

                    Kenshi Resumes also supports you with intelligent formatting, keyword optimization, and grammar refinements — so that you can focus on your journey while we ensure your resume speaks volumes. Each resume you create is export-ready, mobile-responsive, and stored securely in your personalized dashboard. From dynamic live previews to instant PDF downloads, everything is designed to be seamless, beautiful, and fast.

                    Beyond technology, we’re building a community. A space where job-seekers, students, professionals, and career changers can connect, share insights, and grow. Kenshi Resumes isn’t just about writing a better resume — it’s about building a better future. One opportunity at a time.

                    Welcome to Kenshi Resumes — where your story begins with strength, style, and strategy.


                </p>
            </div>
        </div>
    )
}

export default About