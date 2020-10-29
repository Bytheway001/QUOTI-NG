import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, ButtonGroup, Card, Col, Image, Row, Table } from 'react-bootstrap';
import { APIURL } from '../../ducks/quoteReducer';

import { formatMoney } from '../../utils/formatMoney';
import BD from '../../assets/img/icons/BD.png';
import VU from '../../assets/img/icons/VU.png';
import BU from '../../assets/img/icons/BU.png';
import AL from '../../assets/img/icons/AL.png';
import { StatCard } from './components/StatCard';


type Itype={
	[key:string]:string,

}
const images:Itype = {
	"Allianz Care":AL,
	"Bupa Salud":BU,
	'Best Doctors Insurance':BD,
	"Vumi Group":VU
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
                stats.map((stat,key:number)=>(
                    <Col sm={3}>
                      <StatCard stat={stat}/>
                    </Col>
                ))
            }
        </Row>
    )
}