// Tao api interceptor / gan token jwt vao header moi yeu cau gui di
import axios from 'axios'
// import axios-interceptor from 'axios-interceptor'

const api = axios.create({
    // baseURL: 'http://localhost:5713',
    // baseURL: 'https://wedding-planner-backend.up.railway.app',
    baseURL: 'https://wedding-planner-backend.vercel.app',
    
    withCredentials: true
})

// api.interceptors.request.use(
//     (config)=>{
//         const token = localStorage.getItem('jwt')
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
// )

export default api