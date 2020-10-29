import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LoadingModal } from '../Screens/components/LoadingModal';
import { getToken } from '../utils/token';
import Bar from './Navbar';

const BasicLayout: React.FC<{ loading: Boolean }> = ({ children, loading }) => {
	return (
		<Container fluid className="basic-layout">
			{loading && <LoadingModal />}
			{getToken() && <Bar />}
			<Container fluid id="content">
				{children}
			</Container>
		</Container>
	);
};

const mapStateToProps = (state: any) => {
	return {
		loading: state.app.loading,
	};
};

export default connect(mapStateToProps, {})(BasicLayout);
