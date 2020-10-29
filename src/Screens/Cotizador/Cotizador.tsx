import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCompare, cleanData, getQuote, removeFromCompare } from '../../ducks/quoteReducer';
import { SideBarScreen } from '../../Layouts/SideBarScreen';
import {  QuoteProps } from '../../types/cotizador';
import { IQuote } from '../../types/store';
import PlanCard from './components/PlanCard';
import Sidebar from './components/Sidebar';

interface ICotizadorProps extends IQuote {
	addToCompare: Function;
	getQuote: Function;
	cleanData: Function;
	removeFromCompare: Function;
}

const Cotizador: React.FC<ICotizadorProps> = ({ plans, addToCompare, compare, getQuote, cleanData, removeFromCompare, params }) => {
	const [selectedCompany, setSelectedCompany] = useState('');
	const company_names: string[] = Array.from(new Set(Object.keys(plans).map((p: any) => plans[p].company)));
	const plan_names: string[] = Object.keys(plans);

	return (
		<SideBarScreen Sidebar={() => <Sidebar compare={compare} plans={plans} getQuote={getQuote} cleanData={cleanData} params={params} removeFromCompare={removeFromCompare} />}>
			<Card className="cotizador-content">
				<Card.Header>Resultados de Busqueda</Card.Header>
				<Card.Body>
					<div className="btn-group btn-group-block w-100 plansTab">
						{company_names.map((name: string, index) => (
							<Button onClick={() => setSelectedCompany(name)} key={index}>
								{name}
							</Button>
						))}
					</div>
					<div className="cards-space">
						<Row>
							<Col sm={12}>
								<Row>
									{plan_names.map((name, index) => {
										if (plans[name].company === selectedCompany || selectedCompany === '') {
											return (
												<Col key={index} md={6} xl={4} className="mb-5">
													<PlanCard data={plans[name]} name={name} addToCompare={addToCompare} />
												</Col>
											);
										} else return null; 
									})}
								</Row>
							</Col>
						</Row>
					</div>
				</Card.Body>
			</Card>
		</SideBarScreen>
	);
};

const mapStateToProps = (state: any) => ({
	plans: state.quote.plans,
	params: state.quote.params,
	compare: state.quote.compare,
});

const mapDispatchToProps = (dispatch: any) => ({
	addToCompare: (plan: any, name: string, ded: number, deductible_out: number) => dispatch(addToCompare(plan, name, ded, deductible_out)),
	getQuote: (data: any) => dispatch(getQuote(data)),
	cleanData:() => dispatch(cleanData()),
	removeFromCompare: (name: any, ded: any) => dispatch(removeFromCompare(name, ded)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cotizador);
