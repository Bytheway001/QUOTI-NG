import Axios from "axios"
import { setToken,removeToken, setInterceptors } from "../utils/token"
import jwt from 'jsonwebtoken';
import { APIURL } from "./quoteReducer"

const SET_CURRENT_USER = "SET_CURRENT_USER";


export const login = (email,password)=>{
   return dispatch =>{
       return Axios.post(APIURL+'/login',{email,password}).then(res=>{
           let jsontoken = res.data.jwt;
           let sessiontoken = res.data.refresh_token;
           console.log(sessiontoken)
           setToken(jsontoken,sessiontoken);
           setInterceptors(jsontoken,sessiontoken);
           dispatch({type:SET_CURRENT_USER,payload:jwt.decode(jsontoken)})
        })
   }
}


export const logout = ()=>{
    removeToken();
    return dispatch =>{
        dispatch({type:SET_CURRENT_USER,payload:{}})
    }
}

const initialState={
    isAuthenticated:false,
    user:{}
}
export const authReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated:Object.keys(payload).length>0,
                user:payload.data
            }
        default:
            return state
    }
}