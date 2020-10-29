import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

const ButtonStyle={
    borderRadius:50,
    boxShadow:'1px 1px 5px gray'
}
interface IBP extends ButtonProps{
    form?:string
}

export const RoundButton:React.FC<IBP> = ({children,...props})=>{
    return(
        <Button style={{...ButtonStyle,...props.style}} {...props}>{children}</Button>
    )
}