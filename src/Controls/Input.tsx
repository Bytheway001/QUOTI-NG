import React from 'react'
import { FormControl, FormControlProps } from 'react-bootstrap'
export const Input:React.FC=()=>{
    return(
        <FormControl size='sm' type='text' className='custom-input'/>
    )
}
type InputProps=FormControlProps & {placeholder?:string,min?:number,max?:number}

export const RoundInput:React.FC<InputProps> = ({...props})=>{
    return(
        <FormControl {...props} className='custom-input text-center'/>
    )
}