import React from 'react';

const MaintenancePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
            <div className="max-w-md">
                <h1 className="text-4xl font-bold text-yellow-600 mb-4">🚧 Scheduled Maintenance</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Kenshi Resumes is currently undergoing scheduled maintenance. <br />
                    We’ll be back by <span className="font-semibold">Sunday, August 11th</span>, better and faster!
                </p>

                {/* 🌐 Link to temporary service */}
                <a
                    href="https://old-strapi-b-ased-full-stack-resume-app-code.vercel.app/" //temporary service link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition"
                >
                    Access Temporary Resume Service
                </a>

                <p className="text-sm text-gray-500 mt-6">
                    Thank you for your patience and support. 💙 <br />
                    — Team Kenshi Resumes
                </p>
            </div>
        </div>
    );
};

export default MaintenancePage;
