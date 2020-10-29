import Axios from "axios";
import { reduceBenefits } from "../utils/utils";
import { LOADER_OFF, LOADER_ON } from "./appReducer";
import { APIURL } from "./quoteReducer";

export const PLAN_LIST_REQUESTED = "PLAN_LIST_REQUESTED";
export const PLAN_LIST_SUCCEEDED = "PLAN_LIST_SUCCEEDED";
export const PLAN_LIST_FAILED = "PLAN_LIST_FAILED";

export const COMPARE_REQUESTED = "COMPARE_REQUESTED";
export const COMPARE_SUCCEEDED = "COMPARE_SUCCEEDED";
export const COMAPRE_FAILED = "COMPARE_FAILED";

export const ADD_PLAN_TO_COMPARE = "ADD_PLAN_TO_COMPARE";

export const getPlanList=()=>{
    return dispatch =>{
        dispatch({type:LOADER_ON});
        dispatch({type:PLAN_LIST_REQUESTED})
        Axios.get(APIURL+'/plans').then(res=>{
            dispatch({type:PLAN_LIST_SUCCEEDED,payload:res.data})
            dispatch({type:LOADER_OFF});
        })
        .catch(err=>{
            dispatch({type:LOADER_OFF});
        })
       
    }
}

export const getCompare=(plans)=>{
    return dispatch =>{
        dispatch({type:LOADER_ON})
        dispatch({type:COMPARE_REQUESTED})
        Axios.post(APIURL+'/plans/comparenew',plans).then(res=>{
            let reduced = reduceBenefits(res.data.data.filter(x=>x.plan_name!==""));
            console.log(reduced)
            dispatch({type:COMPARE_SUCCEEDED,payload:reduced})
            dispatch({type:LOADER_OFF});
        })
    }
}




const initialState={
    planList:[],
    selectedPlans:null
}


export const compareReducer = (state=initialState,{type,payload})=>{
   
    switch(type){
        case PLAN_LIST_REQUESTED:
            return{
                ...state,
                planList:[],
                selectedPlans:null
            }
        case PLAN_LIST_SUCCEEDED:
            return{
                ...state,
                planList:payload
            }
        case COMPARE_REQUESTED:
            return {
                ...state,
                selectedPlans:null
            }
        case COMPARE_SUCCEEDED:
            return {
                ...state,
                selectedPlans:payload
            }
        default:
            return state;
    }
}