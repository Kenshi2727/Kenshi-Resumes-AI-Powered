import axios from 'axios';
const API_KEY = window.__env.VITE_STRAPI_API_KEY || import.meta.env.VITE_STRAPI_API_KEY

const axiosClient = axios.create({
    //base url from strapi admin localhost
    baseURL: window.__env.VITE_BASE_URL + '/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
})

//creating new endpoints 


const CreateNewResume = (data) => axiosClient.post('/user-resumes', data)

const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes?filters[userEmail][$eq]=' + userEmail)//fetching resumes based on user email

const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data)

const GetUserResumeById = (id) => axiosClient.get('/user-resumes/' + id + "?populate=*")//'?populate=*' to fetch entire details of all components and not just basic details

const DeleteResumeById = (id) => axiosClient.delete('/user-resumes/' + id)

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetUserResumeById,
    DeleteResumeById
}