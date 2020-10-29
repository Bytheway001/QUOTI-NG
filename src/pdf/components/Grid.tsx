import React from 'react';
import ReactPDF, {View,StyleSheet} from '@react-pdf/renderer';

export const darkBlue = '#0062cc';
export const lightBlue = '#5b86e5';
export const styles = StyleSheet.create({
	page: {
		padding: '2cm',
	},
	container: {
		flexDirection: 'column',

		height: '100%',
	},
	row: {
		flexDirection: 'row',
	},
	col: {
		flexDirection: 'column',
		paddingHorizontal: 5,

		flex: 1,
	},

	page_header: {
		backgroundColor: lightBlue,
		textAlign: 'center',
		padding: 15,
		color: 'white',
	},
});
export const Row: React.FC<ReactPDF.ViewProps> = ({ children, style }) => {
	return <View style={{ ...styles.row, ...style }}>{children}</View>;
};

export const Col: React.FC<ReactPDF.ViewProps> = ({ children, style }) => {
	return <View style={{ ...styles.col, ...style }}>{children}</View>;
};