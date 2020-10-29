import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import { Button, Col, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { ComparePDF } from '../../pdf/Compare';

interface ISidebarProps {
	plans: Array<any>;
	getCompare: Function;
	getters: any;
	setters: any;
	selectedPlans: any;
}
export const Sidebar: React.FC<ISidebarProps> = ({ plans, getCompare, setters, getters, selectedPlans }) => {
	var options = Array.from(new Set(plans.map((x: any) => x.name)));

	return (
		<div className="comparador-sidebar">
			<FormGroup size="sm" as={Row}>
				<FormLabel column xs={3}>
					Plan 1
				</FormLabel>
				<Col xs={9}>
					<Typeahead selected={getters.p1} onChange={(data) => setters.setPlan1(data)} id="plan2" options={options} labelKey="name" />
				</Col>
			</FormGroup>
			<FormGroup size="sm" as={Row}>
				<FormLabel column xs={3}>
					Plan 2
				</FormLabel>
				<Col xs={9}>
					<Typeahead selected={getters.p2} onChange={(data) => setters.setPlan2(data)} id="plan2" options={options} labelKey="name" />
				</Col>
			</FormGroup>
			<FormGroup size="sm" as={Row}>
				<FormLabel column xs={3}>
					Plan 3
				</FormLabel>
				<Col xs={9}>
					<Typeahead selected={getters.p3} onChange={(data) => setters.setPlan3(data)} id="plan3" options={options} labelKey="name" />
				</Col>
			</FormGroup>
			<Row className="mt-5">
				{selectedPlans && (
					<Col xs={12}>
						<PDFDownloadLink className="btn btn-primary btn-block btn-sm" document={<ComparePDF selectedPlans={selectedPlans} />} fileName="comparativo.pdf">
							{({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar (PDF)')}
						</PDFDownloadLink>
					</Col>
				)}

				
			</Row>
		</div>
	);
};
