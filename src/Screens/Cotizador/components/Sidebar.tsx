import React, {  } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RoundButton } from '../../../Controls/Buttons';
import { IQuote } from '../../../types/store';
import { AddedPlanList } from './AddedPlanList';
import Comparativo from './Comparativo';
import QuoteForm from './Form';

interface ISidebarProps extends IQuote {
	getQuote: Function;
	removeFromCompare: Function;
	cleanData:Function
}

const Sidebar: React.FC<ISidebarProps> = ({ getQuote, params, plans, cleanData, compare, removeFromCompare }) => {
	return (
		<div className="cotizador-sidebar">
			<QuoteForm getQuote={getQuote} params={params} />
			<Row>
				<Col sm={12}>
					<AddedPlanList plans={compare} removeFromCompare={removeFromCompare} />

					<Comparativo />
					{Object.entries(plans).length > 0 && (
						<>
							<RoundButton form="quote-form" variant="danger" block onClick={() => cleanData()}>
								Limpiar Datos!
							</RoundButton>
						</>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default Sidebar;
