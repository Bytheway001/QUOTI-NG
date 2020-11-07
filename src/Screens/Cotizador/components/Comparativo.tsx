import { PDFDownloadLink } from '@react-pdf/renderer';
import Axios from 'axios';
import React, { useState } from 'react';
import { Button, FormControl, FormGroup, InputGroup, Modal, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { RoundButton } from '../../../Controls/Buttons';
import { APIURL } from '../../../ducks/quoteReducer';
import { QuotePDF } from '../../../pdf/Quote';
import { IComparePlan } from '../../../types/store';

import { formatMoney } from '../../../utils/formatMoney';
import { downloadXls } from '../../../utils/utils';

const Header: React.FC<{plan:IComparePlan}> = ({ plan }) => {
	return (
		<div className="compare-table-header">
			<p className="company-name">{plan.company}</p>
			<p className="plan-name">{plan.name}</p>
			<p className="coverage d-none">Cobertura Maxima Anual</p>
			<p className="coverage-amount">{plan.coverage}</p>
		</div>
	);
};

const Deductible: React.FC<{ value: number }> = ({ value }) => {
	return <div className="deductible-div">Deducible: {formatMoney(value)}</div>;
};

const Prima: React.FC<{ value: number }> = ({ value }) => {
	return <div className="prima-cell">{formatMoney(value)}</div>;
};

export const CalculatePrima = (plan:IComparePlan, params: any) => {
	let total = plan.rates[0].yearly;
	if (params.couple_age && plan.rates[0].couple) {
		total = total + plan.rates[0].couple;
	}
	if (params.num_kids && plan.rates[0].kids) {
		total = total + plan.rates[0].kids;
	}
	Object.keys(plan.riders).forEach((riderName: string) => {
		if (plan.riders[riderName as any].selected.includes(plan.deductible)) {
			total = total + plan.riders[riderName as any].price;
		}
	});
	return total;
}; 

interface IProps{
	compare:Array<IComparePlan>,
	params:any
}

const Comparativo: React.FC<IProps> = ({ compare, params }) => {
	const [show, setShow] = useState(false);
	const [name,setName]=useState("");
	const justSave = (name:string)=>{
		Axios.post(APIURL + '/exportAsExcel?save=1', { compare, params,name })
			.then((res) => {
				alert("Cotizacion guardada con exito");
			})
			.catch((err) => {
				console.log(err);
			});
	}
	const exportExcel = () => {
		Axios.post(APIURL + '/exportAsExcel', { compare, params })
			.then((res) => {
				downloadXls(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const calculateTotal = (index: number) => {
		let plan = compare[index];
		let total = plan.rates[0].yearly;
		if (params.couple_age && plan.rates[0].couple) {
			total = total + plan.rates[0].couple;
		}
		if (params.num_kids && plan.rates[0].kids) {
			total = total + plan.rates[0].kids;
		}
		Object.keys(plan.riders).forEach((riderName: string) => {
			if (plan.riders[riderName as any].selected.includes(plan.deductible)) {
				total = total + plan.riders[riderName as any].price;
			}
		});
		return total;
	};
	if (compare && params) {
		return (
			<>
				<RoundButton variant="info" block onClick={() => setShow(true)}>
					Ver Comparativo
				</RoundButton>
				<Modal size="xl" show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title style={{ fontSize: '0.8em' }}>Comparativo de Planes</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Table className="rate-compare-table" responsive>
							<thead>
								<tr>
									<th rowSpan={2}>
										<div style={{ padding: 20 }}>
											<FormGroup>
												<InputGroup size='sm'>
													<FormControl value={name} onChange={({target})=>setName(target.value)}placeholder="Introduzca un nombre para guardar su cotizacion" />
													<InputGroup.Append>
														<Button onClick={()=>justSave(name)}>Guardar</Button>
													</InputGroup.Append>
												</InputGroup>
											</FormGroup>
											<Button size="sm" block onClick={() => exportExcel()}>
												Exportar (Excel)
											</Button>
											<PDFDownloadLink className="btn btn-primary btn-block btn-sm" document={<QuotePDF plans={compare} params={params} />} fileName="cotizacion.pdf">
												{({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar (PDF)')}
											</PDFDownloadLink>
										</div>
									</th>
									{compare.length > 0 && (
										<th>
											<Header plan={compare[0]} />
										</th>
									)}
									{compare.length > 1 && (
										<th>
											<Header plan={compare[1]} />
										</th>
									)}
									{compare.length > 2 && (
										<th>
											<Header plan={compare[2]} />
										</th>
									)}
								</tr>
								<tr>
									{compare.length > 0 && (
										<th>
											<Deductible value={compare[0].deductible} />
										</th>
									)}
									{compare.length > 1 && (
										<th>
											<Deductible value={compare[1].deductible} />
										</th>
									)}
									{compare.length > 2 && (
										<th>
											<Deductible value={compare[2].deductible} />
										</th>
									)}
								</tr>
							</thead>
							<tbody>
								<tr className="beneficiary-row">
									<th>Beneficiario 1 ({params.main_age} Años)</th>
									{compare.length > 0 && <td>{formatMoney(compare[0].rates[0].yearly)}</td>}
									{compare.length > 1 && <td>{formatMoney(compare[1].rates[0].yearly)}</td>}
									{compare.length > 2 && <td>{formatMoney(compare[2].rates[0].yearly)}</td>}
								</tr>
								{params.couple_age && (
									<tr className="beneficiary-row">
										<th>Beneficiario 2 ({params.couple_age} Años)</th>
										{compare.length > 0 && <td>{formatMoney(compare[0].rates[0].couple || 0)}</td>}
										{compare.length > 1 && <td>{formatMoney(compare[1].rates[0].couple || 0)}</td>}
										{compare.length > 2 && <td>{formatMoney(compare[2].rates[0].couple || 0)}</td>}
									</tr>
								)}
								{params.num_kids > 0 && (
									<tr className="beneficiary-row">
										<th>Dependientes ({params.num_kids})</th>
										{compare.length > 0 && <td>{formatMoney(compare[0].rates[0].kids || 0)}</td>}
										{compare.length > 1 && <td>{formatMoney(compare[1].rates[0].kids || 0)}</td>}
										{compare.length > 2 && <td>{formatMoney(compare[2].rates[0].kids || 0)}</td>}
									</tr>
								)}

								<tr>
									<th></th>
									<th colSpan={3} className="text-center">
										Endosos Adicionales y Gastos Administrativos
									</th>
								</tr>
								<tr className="beneficiary-row">
									<th>Costo Administrativo</th>
									{compare.length > 0 && <td>{compare[0].riders['Costo Administrativo' as any].selected.includes(compare[0].deductible) ? formatMoney(compare[0].riders['Costo Administrativo' as any].price) : '--'}</td>}
									{compare.length > 1 && <td>{compare[1].riders['Costo Administrativo' as any].selected.includes(compare[1].deductible) ? formatMoney(compare[1].riders['Costo Administrativo' as any].price) : '--'}</td>}
									{compare.length > 2 && <td>{compare[2].riders['Costo Administrativo' as any].selected.includes(compare[2].deductible) ? formatMoney(compare[2].riders['Costo Administrativo' as any].price) : '--'}</td>}
								</tr>
								<tr className="beneficiary-row">
									<th>Complicaciones de Maternidad</th>
									{compare.length > 0 && <td>{compare[0].riders['Complicaciones de Maternidad' as any].selected.includes(compare[0].deductible) ? formatMoney(compare[0].riders['Complicaciones de Maternidad' as any].price) : '--'}</td>}
									{compare.length > 1 && <td>{compare[1].riders['Complicaciones de Maternidad' as any].selected.includes(compare[1].deductible) ? formatMoney(compare[1].riders['Complicaciones de Maternidad' as any].price) : '--'}</td>}
									{compare.length > 2 && <td>{compare[2].riders['Complicaciones de Maternidad' as any].selected.includes(compare[2].deductible) ? formatMoney(compare[2].riders['Complicaciones de Maternidad' as any].price) : '--'}</td>}
								</tr>
								<tr className="beneficiary-row">
									<th>Transplante de Órganos</th>
									{compare.length > 0 && <td>{compare[0].riders['Transplante de Órganos' as any].selected.includes(compare[0].deductible) ? formatMoney(compare[0].riders['Transplante de Órganos' as any].price) : '--'}</td>}
									{compare.length > 1 && <td>{compare[1].riders['Transplante de Órganos' as any].selected.includes(compare[1].deductible) ? formatMoney(compare[1].riders['Transplante de Órganos' as any].price) : '--'}</td>}
									{compare.length > 2 && <td>{compare[2].riders['Transplante de Órganos' as any].selected.includes(compare[2].deductible) ? formatMoney(compare[2].riders['Transplante de Órganos' as any].price) : '--'}</td>}
								</tr>

								<tr>
									<th></th>
									<th colSpan={3} className="text-center">
										Prima Anual
									</th>
								</tr>
								<tr className="footer-row">
									<th></th>
									{compare.length > 0 && (
										<td>
											<Prima value={calculateTotal(0)} />
										</td>
									)}
									{compare.length > 1 && (
										<td>
											<Prima value={calculateTotal(1)} />
										</td>
									)}
									{compare.length > 2 && (
										<td>
											<Prima value={calculateTotal(2)} />
										</td>
									)}
								</tr>
							</tbody>
						</Table>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShow(false)}>
							Close
						</Button>
						<Button variant="primary" onClick={() => setShow(false)}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	} else return null;
};

const mapStateToProps = (state: any) => ({
	compare: state.quote.compare,
	params: state.quote.params,
});
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comparativo);
