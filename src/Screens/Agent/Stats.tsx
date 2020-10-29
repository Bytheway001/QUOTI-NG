import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { APIURL } from '../../ducks/quoteReducer';

import { StatCard } from './components/StatCard';


type Itype={
	[key:string]:string,

}

export const StatsScreen:React.FC = ()=>{
    const [stats,setStats]=useState([]);
    useEffect(()=>{
        Axios.get(APIURL+'/stats').then(res=>{
            setStats(res.data.data)
        })
    },[])
    return (
        <Row className='pt-3'>
            <Col sm={12}>
                <h1 className="text-center">Mis Cotizaciones</h1>
            </Col>
            {
                stats.map((stat)=>(
                    <Col sm={3}>
                      <StatCard stat={stat}/>
                    </Col>
                ))
            }
        </Row>
    )
}