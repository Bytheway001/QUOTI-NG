import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getToken } from '../../utils/token';

interface IPrivateProps {
	component: React.ElementType;
}
export const PrivateRoute: React.FC<RouteProps & IPrivateProps> = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={(props) => (getToken() ? <Component {...props} /> : <Redirect to='/login'/>)} />;
};
