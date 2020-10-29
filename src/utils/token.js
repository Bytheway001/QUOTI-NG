import Axios from "axios";
import {store} from '../index';
export function setToken (jsontoken,session){
    localStorage.setItem('jwt',jsontoken);
    localStorage.setItem('session',session);
}

export const setInterceptors=(token,session)=>{
    if(token){
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.defaults.headers.common["session"] = session;
        Axios.interceptors.response.use(res=>res,error=>{
            if(error.response && error.response.status === 403){
                
              removeToken();
              store.dispatch({type:"SET_CURRENT_USER",payload:{}})
            }
        })
    } else{
        delete Axios.defaults.headers.common['Authorization'];
    }
}

export const removeToken=()=>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('session');
}
export function getToken(){
    return localStorage.getItem('jwt');
}

export function getSession(){
    return localStorage.getItem('session');
}

export function setupInterceptors(){
    
}