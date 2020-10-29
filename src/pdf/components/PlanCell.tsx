import { Text, View } from '@react-pdf/renderer';
import React from 'react';

export const PlanCell: React.FC<IProps> = ({ plan }) => {
	return (
		<View>
			<View style={{ backgroundColor: '#0062cc', borderRadius: 10, color: 'white', padding: 15 }}>
				<Text style={{ fontSize: 12, textAlign: 'center' }}>{plan.company}</Text>
				<Text style={{ fontSize: 12, textAlign: 'center' }}>{plan.name}</Text>
				<Text style={{ fontSize: 12, textAlign: 'center' }}>Cobertura: {plan.coverage}</Text>
			</View>
			<View></View>
		</View>
	);
};


interface IProps{
    plan:any;
}