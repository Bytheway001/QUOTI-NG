import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './assets/scss/application.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './assets/scss/md.scss';
import  BasicLayout  from './Layouts/Basic';
import Cotizador from './Screens/Cotizador/Cotizador';
import { HomePage } from './Screens/HomePage';
import { Test } from './Test/Test';
import LoginScreen from './Screens/Login/LoginScreen';
import { PrivateRoute } from './Screens/components/PrivateRoute';
import { LoggedOutRoute } from './Screens/components/LoggedOfRoute';
import Comparador from './Screens/Comparador/Screen';
import { connect } from 'react-redux';
import  CloudScreen  from './Screens/Directorio/Screen';
import { StatsScreen } from './Screens/Agent/Stats';
import { LostPassword } from './Screens/Login/LostPassword';
import { NewPassword } from './Screens/Login/NewPassword';

const App: React.FC<{ isAuthenticated: Boolean }> = ({ isAuthenticated }) => {
	return (
		<BasicLayout>
			<Switch>
				<PrivateRoute exact path="/" component={HomePage} />
				<PrivateRoute exact path="/comparador" component={Comparador} />
				<PrivateRoute exact path="/cotizador" component={Cotizador} />
				<PrivateRoute exact path="/cloud" component={CloudScreen} />
				<PrivateRoute exact path="/stats" component={StatsScreen} />
				<Route exact path="/test" component={Test} />
				<LoggedOutRoute exact path="/login" component={LoginScreen} />
				<LoggedOutRoute exact path="/lostpassword" component={LostPassword} />
				<LoggedOutRoute exact path="/newpassword" component={NewPassword} />
			</Switch>
		</BasicLayout>
	);
};

const mapStateToProps = (state: any) => {
	return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps, {})(App);
