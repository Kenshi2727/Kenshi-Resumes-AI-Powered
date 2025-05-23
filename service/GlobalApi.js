import axios from 'axios';
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY

const axiosClient = axios.create({
    //base url from strapi admin localhost(or localhost:3000 for custom node bacekend)
    baseURL: import.meta.env.VITE_BASE_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
})

//creating new endpoints 


const CreateNewResume = (data) => axiosClient.post('/user-resumes', data)

// const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes?filters[userEmail][$eq]=' + userEmail)//fetching resumes based on user email
const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes?userEmail=' + userEmail)


const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data)

const GetUserResumeById = (id) => axiosClient.get('/user-resumes/' + id + "?populate=*")//'?populate=*' to fetch entire details of all components and not just basic details

const DeleteResumeById = (id) => axiosClient.delete('/user-resumes/' + id)

const UploadResumeById = (id, formData, teleUser) => axiosClient.post(
    `/user-resumes/upload/${id}/${teleUser}`,
    formData,
    {
        headers: {
            'Content-Type': undefined // Let the browser set it
        }
    }
);

const UploadResumeForAts = (id, formData) => axiosClient.post(`/user-resumes/ats/${id}`, formData,
    {
        headers: {
            'Content-Type': undefined // Let the browser set it
        }
    })

const GetAtsScore = (id) => axiosClient.get(`/user-resumes/fetchScore/${id}`)

const GetAtsRecommendations = (id) => axiosClient.get(`/user-resumes/fetchRecommendations/${id}`)

const SendFeedback = (data) => axiosClient.post('/feedbacks', data)

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetUserResumeById,
    DeleteResumeById,
    UploadResumeById,
    UploadResumeForAts,
    GetAtsScore,
    GetAtsRecommendations,
    SendFeedback
}