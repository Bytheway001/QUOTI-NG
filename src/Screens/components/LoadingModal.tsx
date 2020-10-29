import React from 'react';
import { Image } from 'react-bootstrap';
import GIF from '../../assets/img/quoti-animated.gif';
export const LoadingModal: React.FC = () => {
	return (
		<div className="loading-wrapper">
			<Image src={GIF} />
            <p>Cargando...</p>
		</div>
	);
};
