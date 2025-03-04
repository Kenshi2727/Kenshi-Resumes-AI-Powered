import { useState, useEffect } from 'react';
import AddResume from './components/AddResume';
import GlobalApi from './../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';
import { SkeletonCard } from '@/components/custom/SkeletonCard';


function Dashboard() {
    //fetching user emaail using clerk
    const { user } = useUser();
    const [resumeList, setResumeList] = useState([]); //state to store resume list
    const { theme, setTheme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        user && GetResumesList(); //if user is present then get the resume list
    }, [user]);

    useEffect(() => {
        resumeList.length > 0 ? setLoading(false) : null;
    }, [resumeList]);

    //function to get resume list
    const GetResumesList = () => {
        GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(res => {
            console.log(res.data.data);
            setResumeList(res.data.data);
        })
    }

    return (
        <div className={(theme === 'light') ? 'bg-gradient-to-r from-red-200 to-yellow-200' : 'bg-[url("../../textures/grid.png")] '} >
            <div className={(theme === 'light') ? 'bg-[url("../../textures/diagonal-striped-brick.png")] h-screen overflow-y-scroll scroll-smooth p-10 md:px-20 lg:px-32' : 'h-screen overflow-y-scroll scroll-smooth p-10 md:px-20 lg:px-32'}>
                <h2 className='font-bold text-3xl'>My Resume</h2>
                <p>
                    "Craft your perfect resume effortlessly with AI-powered precision!"
                </p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
                    <AddResume />
                    {loading && Array(4).fill(null).map((_, index) => <SkeletonCard key={index} />)}
                    {/*&& operator is used to check if resumeList is present or not otherwise it will throw an error*/}
                    {resumeList.length > 0 && resumeList.map((resume, index) => {
                        return <ResumeCardItem key={index} resume={resume} refreshData={GetResumesList} />
                    })}
                </div>
            </div >
        </div>
    )
}

export default Dashboard;