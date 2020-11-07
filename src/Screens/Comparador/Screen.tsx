import React,{useState,useEffect} from 'react';
import { Button, ButtonGroup, Card, FormControl, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getCompare, getPlanList } from '../../ducks/compareReducer';
import { SideBarScreen } from '../../Layouts/SideBarScreen';
import { Sidebar } from './Sidebar';

interface IProps{
	plans:any,
	getPlans:any,
	getCompare:any,
	selectedPlans:any
}
const Comparador: React.FC<IProps> = ({ plans, getPlans, getCompare, selectedPlans }) => {
	const [p1, setPlan1] = useState<any[]>([]);
	const [p2, setPlan2] = useState<any[]>([]);
	const [p3, setPlan3] = useState<any[]>([]);
	const [category, setCategory] = useState('');

	const plan1 = p1[0];
	const plan2 = p2[0];
	const plan3 = p3[0]
	useEffect(() => {
		getCompare([plan1, plan2, plan3]);
	}, [getCompare, p1, plan1, plan2, plan3]);

	useEffect(() => {
		getPlans();
	}, [getPlans]);


	return (
		<SideBarScreen Sidebar={() => <Sidebar setters={{ setPlan1, setPlan2, setPlan3 }} selectedPlans={selectedPlans} getters={{ p1, p2, p3 }} plans={plans} getCompare={getCompare} />}>
			<Card>
				<Card.Header>Comparativo de Beneficios</Card.Header>
				<Card.Body className="with-buttons">
					{selectedPlans && Object.keys(selectedPlans).length > 0 && (
						<>
							<FormControl onChange={({ target }) => setCategory(target.value)} as="select" className="w-100 d-block d-xl-none">
								<option value="">Todos los Beneficios</option>
								{Object.keys(selectedPlans).map((categoryName: string, index: number) => {
									return <option value={categoryName}>{categoryName}</option>;
								})}
							</FormControl>
							<ButtonGroup className="w-100 d-none d-xl-block" style={{ flexWrap: 'wrap',flex:1 }}>
								<Button className="tab-button" size="sm" onClick={()=>setCategory("")}>
									Todos
								</Button>
								{Object.keys(selectedPlans).map((categoryName: string, index: number) => {
									return (
										<Button onClick={()=>setCategory(categoryName)} className="tab-button" size="sm">
											{categoryName}
										</Button>
									)
								})}
							</ButtonGroup>
							<div style={{ padding: 10 }}>
								<Table variant="striped" responsive className="benefits-table">
									<thead>
										<tr>
											<th style={{ width: '25%' }}>Beneficio</th>
											{plan1 && <th style={{ width: '25%' }}>{plan1}</th>}
											{plan2 && <th style={{ width: '25%' }}>{plan2}</th>}
											{plan3 && <th style={{ width: '25%' }}>{plan3}</th>}
										</tr>
									</thead>
									<tbody>
										{Object.keys(selectedPlans).map((categoryName: string, index: number) => {
											if (categoryName === category || category === '') {
												return Object.keys(selectedPlans[categoryName]).map((benefitName: string, index: number) => {
													return (
														<tr>
															<td>
																<b>{benefitName}</b>
															</td>
															{selectedPlans[categoryName][benefitName].map((benefit: string, i: number) => {
																return (
																	<td>
																		<p style={{whiteSpace:'pre-line'}}>{benefit}</p>
																		
																	</td>
																);
															})}
														</tr>
													);
												});
											} else return null;
										})}
									</tbody>
								</Table>
							</div>
						</>
					)}
				</Card.Body>
			</Card>
		</SideBarScreen>
	);
};

const mapStateToProps = (state: any) => ({
	plans: state.compare.planList,
	selectedPlans: state.compare.selectedPlans,
});
const mapDispatchToProps = (dispatch: any) => ({
	getPlans: () => dispatch(getPlanList()),
	getCompare: (plans: Array<any>) => dispatch(getCompare(plans)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comparador);
