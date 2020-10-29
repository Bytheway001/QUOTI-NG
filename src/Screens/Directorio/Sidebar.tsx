import React from 'react';
import { Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Select } from '../../Controls/Select';
import { fakeData } from '../../fakeData';
import { ICloudFile } from '../../types/directorio';

export const Sidebar: React.FC<{filters:{company:string,category:string,year:string},files:Array<ICloudFile>,setFilter:Function}> = ({files,setFilter,filters}) => {
	const handleFilterChange=(filter:string,value:string)=>{
		setFilter(filter,value)
	}
	return (
		<div className="cloud-sidebar">
			<FormGroup as={Row}>
				<FormLabel className="py-0 d-flex align-items-center" column xs={3}>
					Compañia
				</FormLabel>
				<Col xs={9}>
					<Select as="select" value={filters.company} onChange={({target})=>handleFilterChange('company',target.value)} options={Array.from(new Set(files.map(x=>x.company))).map((j)=>({label:j,value:j}))} />
				</Col>
			</FormGroup>
			<FormGroup as={Row}>
				<FormLabel className="py-0 d-flex align-items-center" column xs={3}>
					Categoria
				</FormLabel>
				<Col xs={9}>
                <Select as="select"  value={filters.category} onChange={({target})=>handleFilterChange('category',target.value)} options={Array.from(new Set(files.map(x=>x.category))).map((j)=>({label:j,value:j}))} />
				</Col>
			</FormGroup>
			<FormGroup as={Row}>
				<FormLabel className="py-0 d-flex align-items-center" column xs={3}>
					Año
				</FormLabel>
				<Col xs={9}>
                <Select as="select"  value={filters.year} onChange={({target})=>handleFilterChange('year',target.value)} options={Array.from(new Set(files.map(x=>x.year.toString()))).map((j)=>({label:j,value:j}))} />
				</Col>
			</FormGroup>
		</div>
	);
};
