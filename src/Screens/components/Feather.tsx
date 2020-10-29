import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

type FeatherProps = {
	text: string;
	icon: IconDefinition;
	href:string
};

export const Feather: React.FC<FeatherProps> = ({ text, icon,href }) => {
	return (
		<Link className='link' to={href}>
		<div className="feather mb-5">
			<div className='text-center'>
				<FontAwesomeIcon icon={icon} size="4x" className='mb-3' />
				<p>{text}</p>
			</div>
		</div>
		</Link>
	);
};
