import axios from "axios"

const AUTH_REST_API_URL = "http://localhost:8080/api/auth";


export const registerApi=(registerObj)=> axios.post(AUTH_REST_API_URL+'/register',registerObj);

export const loginApi = (loginDto)=> axios.post(AUTH_REST_API_URL+'/login',loginDto);

export const storeToken =(token)=> localStorage.setItem("token",token);

export const getToken =()=> localStorage.getItem("token");

export const saveLoginUser = (username)=> {
    sessionStorage.setItem("authenticatedUser",username);
   
};

export const logout = ()=>{
    localStorage.clear();
    sessionStorage.clear();
   
}

export const getAllCategories=()=>axios.get(AUTH_REST_API_URL);

export const getLoggedInUser = ()=>{  
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}
