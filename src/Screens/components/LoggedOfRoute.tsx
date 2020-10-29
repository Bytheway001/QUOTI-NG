import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getToken } from '../../utils/token';

interface ILoggedOutRoute {
	component: React.ElementType;
}
export const LoggedOutRoute: React.FC<RouteProps & ILoggedOutRoute> = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={(props) => (!getToken() ? <Component {...props} /> : <Redirect to='/'/>)} />;
};
