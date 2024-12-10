import axios from "axios";

const COURSE_URL = `${import.meta.env.VITE_API_URL}/api/courses`;
const STUDENT_URL = `${import.meta.env.VITE_API_URL}/api/students`;
const TRAINING_URL = `${import.meta.env.VITE_API_URL}/api/schedules`;

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    }
});

export const getCourses = () => axios.get(COURSE_URL, getAuthHeaders());
export const getCourse = (id) => axios.get(`${COURSE_URL}/${id}`, getAuthHeaders());
export const createCourse = (data) => axios.post(COURSE_URL, data, getAuthHeaders());
export const updateCourse = (id, data) => axios.put(`${COURSE_URL}/${id}`, data, getAuthHeaders());
export const deleteCourse = (id) => axios.delete(`${COURSE_URL}/${id}`, getAuthHeaders());
export const getStudents = () => axios.get(STUDENT_URL, getAuthHeaders());
export const getStudent = (id) => axios.get(`${STUDENT_URL}/${id}`, getAuthHeaders());
export const createStudent = (data) => axios.post(STUDENT_URL, data, getAuthHeaders());
export const updateStudent = (id, data) => axios.put(`${STUDENT_URL}/${id}`, data, getAuthHeaders());
export const deleteStudent = (id) => axios.delete(`${STUDENT_URL}/${id}`, getAuthHeaders());
export const getTrainingSchedules = () => axios.get(TRAINING_URL, getAuthHeaders());
export const getTrainingSchedule = (id) => axios.get(`${STUDENT_URL}/${id}`, getAuthHeaders());
export const createTrainingSchedule = (data) => axios.post(TRAINING_URL, data, getAuthHeaders());
export const updateTrainingSchedule = (id, data) => axios.put(`${TRAINING_URL}/${id}`, data, getAuthHeaders());
export const deleteTrainingSchedule = (id) => axios.delete(`${TRAINING_URL}/${id}`, getAuthHeaders());