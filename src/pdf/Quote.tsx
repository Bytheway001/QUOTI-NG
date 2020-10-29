import React from 'react';
import{ Document, Page, View, Text, Font } from '@react-pdf/renderer';

import { formatMoney } from '../utils/formatMoney';
import { CalculatePrima } from '../Screens/Cotizador/components/Comparativo';
import { Col, Row, styles,lightBlue,darkBlue } from './components/Grid';
import { PlanCell } from './components/PlanCell';
import { IComparePlan, IPlan } from '../types/store';




interface IProps {
	plans: Array<IComparePlan>;
	params?: any;
}
export const QuotePDF: React.FC<IProps> = ({ plans, params }) => {
	Font.registerHyphenationCallback((words) => {
		return [words];
	});

	return (
		<Document>
			<Page orientation="landscape" style={styles.page}>
				<View style={styles.container}>
					<Row>
						<Col>
							<View style={styles.page_header}>
								<Text>COTIZACION DE SEGURO DE SALUD INTERNACIONAL</Text>
							</View>
						</Col>
					</Row>
					<Row style={{ marginTop: 15 }}>
						<Col />
						{plans.map((plan, key: number) => (
							<Col key={key}>
								<PlanCell plan={plan} />
							</Col>
						))}
					</Row>
					<Row style={{ marginTop: 15, backgroundColor: darkBlue, padding: 5 }}>
						<Col>
							<Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>Deducible Seleccionado</Text>
						</Col>
						{plans.map((plan, key: number) => (
							<Col>
								<View style={{ color: 'white' }}>
									<Text style={{ fontSize: 12, textAlign: 'center' }}>{formatMoney(plan.deductible)}</Text>
								</View>
							</Col>
						))}
					</Row>
					<Row style={{ marginTop: 2, backgroundColor: lightBlue, color: 'white', padding: 5 }}>
						<Col>
							<Text style={{ fontSize: 12, textAlign: 'center' }}>Beneficiario 1: {params.main_age} Años</Text>
						</Col>
						{plans.map((plan, key: number) => {
							let rate = plan.rates.find((x) => x.deductible === plan.deductible);
							return (
								<Col>
									<Text style={{ fontSize: 12, textAlign: 'center' }}>{rate && formatMoney(rate.yearly)}</Text>
								</Col>
							);
						})}
					</Row>
					{params.couple_age !== '' && (
						<Row style={{ marginTop: 2, backgroundColor: lightBlue, color: 'white', padding: 5 }}>
							<Col>
								<Text style={{ fontSize: 12, textAlign: 'center' }}>Beneficiario 2: {params.couple_age} Años</Text>
							</Col>
							{plans.map((plan, key: number) => {
								let rate = plan.rates.find((x) => x.deductible === plan.deductible);
								return (
									<Col key={key}>
										<Text style={{ fontSize: 12, textAlign: 'center' }}>{rate && formatMoney(rate.couple || 0)}</Text>
									</Col>
								);
							})}
						</Row>
					)}
					{params.num_kids !== '0' && (
						<Row style={{ marginTop: 2, backgroundColor: lightBlue, color: 'white', padding: 5 }}>
							<Col>
								<Text style={{ fontSize: 12, textAlign: 'center' }}>Dependientes: {params.num_kids}</Text>
							</Col>
							{plans.map((plan, key: number) => {
								let rate = plan.rates.find((x) => x.deductible === plan.deductible);
								return (
									<Col key={key}>
										<Text style={{ fontSize: 12, textAlign: 'center' }}>{rate && formatMoney(rate.kids || 0)}</Text>
									</Col>
								);
							})}
						</Row>
					)}

					<Row style={{ marginTop: 15, padding: 5, backgroundColor: darkBlue, color: 'white' }}>
						<Col style={{ flex: 1 }} />

						<Col style={{ flex: 3 }}>
							<Text style={{ textAlign: 'center', fontSize: 14 }}>Endosos Adicionales y Gastos Administrativos</Text>
						</Col>
					</Row>
					<Row style={{ marginTop: 2, backgroundColor: lightBlue, color: 'white', padding: 5 }}>
						<Col>
							<Text style={{ fontSize: 12, textAlign: 'center' }}>Costo Administrativo</Text>
						</Col>
						{plans.map((plan, key: number) => {
							let rider = plan.riders['Costo Administrativo' as any];
							let text: string = 'No disponible';
							if (rider.avaliable.includes(plan.deductible)) {
								if (rider.selected.includes(plan.deductible)) {
									text = formatMoney(rider.price);
								}
								else{
									text="--"
								}
							}
							return (
								<Col>
									<Text style={{ fontSize: 12, textAlign: 'center' }}>{text}</Text>
								</Col>
							);
						})}
					</Row>
					<Row style={{ marginTop: 2, backgroundColor: lightBlue, color: 'white', padding: 5 }}>
						<Col>
							<Text style={{ fontSize: 12, textAlign: 'center' }}>Complicaciones de Maternidad</Text>
						</Col>
						{plans.map((plan,key: number) => {
							let rider = plan.riders['Complicaciones de Maternidad' as any];
							let text: string = 'No disponible';
							if (rider.avaliable.includes(plan.deductible)) {
								if (rider.selected.includes(plan.deductible)) {
									text = formatMoney(rider.price);
								}
								else{
									text="--"
								}
							}
							return (
								<Col>
									<Text style={{ fontSize: 12, textAlign: 'center' }}>{text}</Text>
								</Col>
							);
						})}
					</Row>
					<Row style={{ marginTop: 2, backgroundColor: lightBlue, color: 'white', padding: 5 }}>
						<Col>
							<Text style={{ fontSize: 12, textAlign: 'center' }}>Transplante de Organos</Text>
						</Col>
						{plans.map((plan, key: number) => {
							let rider = plan.riders['Transplante de Órganos' as any];
							let text: string = 'No disponible';
							if (rider.avaliable.includes(plan.deductible)) {
								if (rider.selected.includes(plan.deductible)) {
									text = formatMoney(rider.price);
								}
								else{
									text="--"
								}
							}
							return (
								<Col>
									<Text style={{ fontSize: 12, textAlign: 'center' }}>{text}</Text>
								</Col>
							);
						})}
					</Row>

					<Row style={{ marginTop: 15, padding: 5, backgroundColor: darkBlue, color: 'white', fontSize: 14 }}>
						<Col>
							<Text style={{ textAlign: 'center' }}>Prima Total Anual</Text>
						</Col>
						{plans.map((plan, key: number) => (
							<Col>
								<Text style={{ textAlign: 'center' }}>{formatMoney(CalculatePrima(plan,params))}</Text>
							</Col>
						))}
					</Row>
				</View>
			</Page>
		</Document>
	);
};
