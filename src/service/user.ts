import { TUser } from "@/interface";
import axios from "axios";
import axiosJWT from "./axiosJWT";



const Base_URL = "http://localhost:7004/api/user"

export const getUsers = async () => {
    const url = `${Base_URL}/all`;
    return axios.get(url)
}

export const userRegister = async (user:TUser)=>{
    const url = `${Base_URL}/register`;
    return axios.post(url,user)
}

export const UserLogin = async (user:TUser)=>{
    const url = `${Base_URL}/login`;
    return axiosJWT.post(url,user)
}

export const userLogout =async ()=>{
    const url = `${Base_URL}/logout`;
    return axiosJWT.get(url)
}

 