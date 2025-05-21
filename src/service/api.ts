import { TUser } from "@/interface";
import axios from "axios";
import axiosJWT from "./axiosJWT";



const Base_URL = "http://localhost:7004/api/user";
export const API_BASE = "http://localhost:7004/api";

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

export const refreshToken = async ()=> {
    const url = `${Base_URL}/refresh-token`;
    return axiosJWT.post(url)
}

export const getCurrentUser = () => {
    const url = `${Base_URL}/me`;
    return axiosJWT.get(url, { withCredentials: true });
  };

  export const editUser = (user:TUser) => {
    const url = `${Base_URL}/edit`;
    return axiosJWT.put(url, user, { withCredentials: true });
    }

export const gendersValues = () => {
    const url = `${API_BASE}/genders`;
    return axios.get(url)
}

export const getCategories = () => {
    const url = `${API_BASE}/categories/allCategory`;
    return axios.get(url)
}


