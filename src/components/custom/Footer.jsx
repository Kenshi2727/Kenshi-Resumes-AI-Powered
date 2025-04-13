// import React from 'react'
// import { useContext } from 'react'
// import { ThemeContext } from '@/context/ThemeContext'

// function Footer() {
//     const { theme } = useContext(ThemeContext);

//     return (
//         <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' : 'bg-black shadow-[0_-4px_6px_4px_rgba(0,191,255,0.8)]'}>
//             <div className={(theme === 'light') ? 'p-3 px-5 flex justify-center items-center bg-[url("../../textures/food.png")]' : 'p-3 px-5 flex justify-center items-center'}>
//                 <div className='my-5 flex flex-col justify-center items-center gap-2'>
//                     <p>All Rights Reserved</p>
//                     <p>© {new Date().getFullYear()} Kenshi Resumes, Inc</p>
//                 </div>
//             </div >
//         </div>
//     )
// }

// export default Footer

import React, { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    const { theme } = useContext(ThemeContext);

    return (
        <footer
            className={
                theme === 'light'
                    ? 'bg-gradient-to-r from-red-200 to-yellow-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'
                    : 'bg-black shadow-[0_-4px_6px_4px_rgba(0,191,255,0.8)]'
            }
        >
            <div className="max-w-7xl mx-auto px-5 py-8">
                {/* Upper Section: Branding & Navigation */}
                <div
                    className={
                        theme === 'light'
                            ? 'bg-[url("../../textures/food.png")] p-5 flex flex-col md:flex-row justify-between items-center'
                            : 'p-5 flex flex-col md:flex-row justify-between items-center'
                    }
                >
                    {/* Branding */}
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-2xl font-bold">Kenshi Resumes, Inc</h2>
                        <p className="text-sm mt-1">Crafting professional resumes with passion.</p>
                    </div>
                    {/* Navigation Links */}
                    <nav className="mt-4 md:mt-0">
                        <ul className="flex gap-6">
                            <li>
                                <a href="#about" className="text-sm hover:underline">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="text-sm hover:underline">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-sm hover:underline">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-sm hover:underline">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#blog" className="text-sm hover:underline">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Horizontal Line for Visual Separation */}
                <hr className={`border-t ${(theme === 'dark') ? 'border-gray-300' : 'border-black'} my-4`} />
                {/* Bottom Section: Social Icons & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Social Media Icons */}
                    <div className="flex gap-6 mb-4 md:mb-0">
                        <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-600">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-400">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" className="hover:text-pink-600">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-blue-700">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                    {/* Copyright */}
                    <div className="text-center text-sm">
                        <p>All Rights Reserved</p>
                        <p>© {new Date().getFullYear()} Kenshi Resumes, Inc</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
