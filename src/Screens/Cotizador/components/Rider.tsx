import React from 'react';
import { FormCheck } from 'react-bootstrap';
import { formatMoney } from '../../../utils/formatMoney';

type RiderProps = {
    label:string,
    rider:any,
    ded:number,
    selected:boolean,
    onChange:Function
}
export const Rider: React.FC<RiderProps> = ({label,rider,ded,selected,onChange}) => {
    let labels={
        c:{lg:'Costo Administrativo',sm:'Costo Adm.'},
        t:{lg:"Transplante de Órganos",sm:"Transplante"},
        m:{lg:'Comp. de Maternidad',sm:'Maternidad'}
    }
    let tag=null

    if(label==="Costo Administrativo"){
        tag=labels.c
    }
    else if(label==='Complicaciones de Maternidad'){
        tag=labels.m
    }
    else{
        tag=labels.t
    }
    
    if(rider.avaliable.includes(ded)){
        return (
            <>
             <FormCheck className='d-none d-lg-block' label={tag.lg+' ( +'+formatMoney(rider.price,{decimalCount:0})+' )'} checked={selected} onChange={(e:any)=>onChange(e,label,ded)}/>
             <FormCheck className='d-block d-lg-none' label={tag.sm+' (+'+rider.price+')'} checked={selected} onChange={(e:any)=>onChange(e,label,ded)}/>
            </>
        )
       
    }
    else return null
   
};
