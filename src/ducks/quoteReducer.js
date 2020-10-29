import Axios from "axios"

import { groupBy } from "../utils/utils";
import { LOADER_OFF, LOADER_ON } from "./appReducer";

export const APIURL = 'https://api.quotiapp.com/api'
export const QUOTE_REQUESTED = 'QUOTE_REQUESTED';
export const QUOTE_SUCCEEDED = 'QUOTE_SUCCEEDED';
export const QUOTE_FAILED = 'QUOTE_FAILED';

export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
export const REMOVE_FROM_COMPARE = "REMOVE_FROM_COMPARE";
export const CLEAN_QUOTE = "CLEAN_QUOTE";

export function getQuote(data){
    return dispatch =>{
        dispatch({type:QUOTE_REQUESTED});
        dispatch({type:LOADER_ON});
        Axios.post(APIURL+'/get_quote_comparison',data).then(res=>{
            console.log(res.data)
            dispatch({type:QUOTE_SUCCEEDED,payload:res.data})
            dispatch({type:LOADER_OFF});
        })
        .catch(err=>{
            console.log(err);
            dispatch({type:QUOTE_FAILED,payload:err.response});
            dispatch({type:LOADER_OFF});
        })
    }
}

export function addToCompare(plan,name,ded,deductible_out){
    console.log(plan);
    
    let data={
        name:name,
        deductible:ded,
        coverage:plan.coverage,
        company:plan.company,
        deductible_out:deductible_out,
        rates:[plan.rates.find(x=>x.deductible===ded)],
        riders:plan.riders
    }
    return dispatch=>{
        dispatch({type:ADD_TO_COMPARE,payload:data})
    }
}

export function removeFromCompare(name,ded){
    return dispatch=>{
        dispatch({type:REMOVE_FROM_COMPARE,payload:{name,ded}})
    }
}

export function cleanData(){
    return dispatch =>{
        dispatch({type:CLEAN_QUOTE});
    }
}
/*
const initialState={
    plans:fakeQuote.plans,
    params:fakeQuote.params,
    compare:fakeQuote.compare
}
*/
const initialState={
    plans:{},
    params:{},
    compare:[],
    errors:""
}

export const quoteReducer = (state=initialState,{type,payload})=>{
  
    switch(type){
        case QUOTE_REQUESTED:
            return {
                ...state,
                loading:true
            }
        case QUOTE_SUCCEEDED:
            return {
                ...state,
                params:payload.params,
                plans:groupBy(payload.plans,'name'),
                errors:""
            }
        case QUOTE_FAILED:
            return{
                ...state,
                
            }
        case ADD_TO_COMPARE:
            return{
                ...state,
                compare:[...state.compare,payload]
            }
        case REMOVE_FROM_COMPARE:
            return{
                ...state,
                compare:state.compare.filter(x=>!(payload.name===x.name && payload.ded===x.deductible) )
            }
            case CLEAN_QUOTE:
                return initialState
        default:
            return state
    }
}