import React from 'react';
import LogoImage from '../assets/img/logo.png';
import Qblack from '../assets/img//q-black.png';
import Qblue from '../assets/img/q-blue.png'
import { Image, ImageProps } from 'react-bootstrap';
type LogoProps = {
    type: string,
    size?:string
};
export const Logo: React.FC<LogoProps & ImageProps> = ({ type,...props }) => {
	switch (type) {
		case 'full':
			return <Image src={LogoImage} {...props} />;
		case 'Qblack':
			return <Image src={Qblack}  {...props} />;
		default:
			return <Image src={Qblue}  {...props} />;
	}
};
