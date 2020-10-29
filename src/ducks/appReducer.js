export const LOADER_ON = "LOADER_ON";
export const LOADER_OFF = "LOADER_OFF";
const initialState={
    loading:false
}
export const appReducer = (state=initialState,{type,payload})=>{
    switch(type){
        case LOADER_ON:
            return {
                ...state,
                loading:true
            }
        case LOADER_OFF:
            return{
                ...state,
                loading:false
            }
        default:
            return state
    }
}