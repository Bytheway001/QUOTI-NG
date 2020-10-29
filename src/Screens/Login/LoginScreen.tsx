import React, { FormEvent } from 'react';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RoundButton } from '../../Controls/Buttons';
import { RoundInput } from '../../Controls/Input';
import { login } from '../../ducks/authReducer';
import { Logo } from '../../Layouts/Logo';


const LoginScreen: React.FC<{login:Function}> = ({login}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit= (e:FormEvent)=>{
		e.preventDefault();
		login(email,password);
	}
	return (
		<Row noGutters className="h-100 login-screen" style={{marginLeft:-15,marginRight:-15}}>
			<Col xs={{span:10,offset:1}} md={{ span: 4, offset: 4 }} className="h-100 d-flex flex-column justify-content-center">
				<div className='form-wrapper'>
					<div className="text-center logo-wrap">
						<Logo type="full" />
					</div>

					<Col sm={12}>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<label>Correo Electronico:</label>
								<RoundInput size='sm' type='email' value={email} onChange={({ target }) => setEmail(target.value)} />
							</Form.Group>
							<Form.Group>
								<label>Contraseña:</label>
								<RoundInput size='sm' value={password} type='password' onChange={({ target }) => setPassword(target.value)} />
							</Form.Group>
							<Form.Group>
								<RoundButton block type='submit'>Ingresar</RoundButton>
								
							</Form.Group>
							<Link className='d-block text-center' to='/lostpassword'>Olvido su contraseña?</Link>
						</Form>
					</Col>
				</div>
			</Col>
		</Row>
	);
};

const mapStateToProps = (state:any)=>({});
const mapDispatchToProps = (dispatch:any) =>({
	login:(email:string,password:string)=>dispatch(login(email,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);
