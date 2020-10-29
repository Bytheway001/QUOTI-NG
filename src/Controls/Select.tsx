import React from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';

type OptionProps={
    value:string|number,
    label:string
}

type SelectProps=FormControlProps&{options:OptionProps[]}



export const Select:React.FC<SelectProps>=({options,value,onChange})=>{
    return(
        <FormControl size='sm' as='select' value={value} onChange={onChange}  className='custom-input'>
            <option value="">Seleccione...</option>
            {
                options.map((option,key)=><option key={key} value={option.value}>{option.label}</option>)
            }
        </FormControl>
    )
}
