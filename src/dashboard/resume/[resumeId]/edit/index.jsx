import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FormSection from '../../component/FormSection'
import ResumePreview from '../../component/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../../service/GlobalApi';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

function EditResume() {
    const params = useParams();//useParams is a hook that allows you to access the URL parameters from a current route in react-router
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();
    const { theme } = useContext(ThemeContext);

    useEffect(
        () => {
            console.log(params.resumeId);
            // setResumeInfo(dummy);//set the resumeInfo to the dummy data
            GetResumeInfo();
        }, []);//[] so that it will be looaded on every render

    const GetResumeInfo = () => {
        GlobalApi.GetUserResumeById(resumeId).then(res => {
            console.log(res.data.data);
            setResumeInfo(res.data.data);
        })
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className={(theme === 'light') ? 'min-h-screen overflow-y-scroll scroll-smooth grid grid-cols-1 md:grid-cols-2 p-10 gap-10 bg-gradient-to-r from-red-200 to-yellow-200' : 'h-screen overflow-y-scroll scroll-smooth grid grid-cols-1 md:grid-cols-2 p-10 gap-10'}>
                {/*Form section */}
                <FormSection />
                {/*Preview section */}
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume