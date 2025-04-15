import axios from "axios";

const axiosJWT = axios.create({
    baseURL: "http://localhost:7004/api/user",
     withCredentials: true,
})

axiosJWT.interceptors.request.use;
export default axiosJWT;