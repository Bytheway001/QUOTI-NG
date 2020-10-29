import { faBalanceScaleLeft, faFolderOpen, faQuestionCircle, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Feather } from './components/Feather';
export const HomePage: React.FC = () => {
	return (
		<div className="homepage">
			<Feather href='/cloud' text="Directorio" icon={faFolderOpen} />
			<Feather href='/comparador' text="Comparativos" icon={faBalanceScaleLeft} />
			<Feather href='/cotizador' text="Cotizaciones" icon={faSlidersH} />
			<Feather href='/support' text="Ayuda y Soporte" icon={faQuestionCircle} />
		</div>
	);
};
