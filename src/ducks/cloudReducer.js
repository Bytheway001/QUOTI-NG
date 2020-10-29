import Axios from "axios";
import { APIURL } from "./quoteReducer";

export const FILES_REQUESTED = "FILES_REQUESTED";
export const FILES_SUCCEEDED = "FILES_SUCCEEDED";
export const FILES_FAILED = "FILES_FAILED";
export const FILTER_CHANGED = "FILTER_CHANGED";

export function getFiles(){
    return dispatch=>{
        dispatch({type:FILES_REQUESTED})
        Axios.get(APIURL+'/cloud').then(res=>{
            
            dispatch({type:FILES_SUCCEEDED,payload:res.data})
        })
    }
}

export function setFilter(filter,value){
    return dispatch=>{
        dispatch({type:"FILTER_CHANGED",payload:{filter:filter,value:value}})
    }
  
}

const initialState={
    files:[],
    filters:{
        category:"",
        year:"",
        company:""
    }
}
export const cloudReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case FILES_REQUESTED:
            return {
                ...state,
                loading:true
            }
        case FILES_SUCCEEDED:
            return{
                ...state,
                loading:false,
                files:payload
            }
        case FILES_FAILED:
            return{
                ...state,
                loading:false,
                files:[]
            }
        case FILTER_CHANGED:
            return{
                ...state,
                filters:{
                    ...state.filters,
                    [payload.filter]:payload.value
                }
            }
        default:
            return state
    }
}