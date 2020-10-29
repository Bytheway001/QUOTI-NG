import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFiles, setFilter } from '../../ducks/cloudReducer';
import { SideBarScreen } from '../../Layouts/SideBarScreen';
import { ICloudFile } from '../../types/directorio';
import { Sidebar } from './Sidebar';

const CloudScreen: React.FC<{ files: Array<ICloudFile>;setFilter:Function, getFiles: Function; filters: { category: string; company: string; year: string } }> = ({ files, getFiles, filters,setFilter }) => {
	useEffect(() => {
		getFiles();
	}, [getFiles]);

	const filteredFiles = files.filter((file: ICloudFile) => {
		console.log(filters)
		let yearcheck = filters.year==="" || filters.year === file.year.toString();
		let companyCheck = filters.company==="" || filters.company===file.company;
		let categoryCheck = filters.category==="" || filters.category===file.category;
		let check =yearcheck && companyCheck && categoryCheck;
		console.log({year:yearcheck,company:companyCheck,category:categoryCheck,name:file.file_desc});
		return check
	});

	console.log(filteredFiles);

	return (
		<SideBarScreen Sidebar={() => <Sidebar files={files} setFilter={setFilter} filters={filters}/>}>
			<div className="p-2" style={{ height: '100%', overflowY: 'scroll', maxHeight: '80vh' }}>
				<Table variant="sm" style={{ fontSize: '0.8em' }}>
					<thead>
						<tr>
							<th>Documento</th>
							<th>Año</th>
							<th>Idioma</th>
							<th>Descargar</th>
						</tr>
					</thead>
					{filteredFiles.map((file: ICloudFile) => {
						return (
							<tr>
								<th>{file.file_desc}</th>
								<th>{file.year}</th>
								<th>{file.lang}</th>
								
								<th>
									<a href={`http://api.quotiapp.com${file.url}`}>
										<FontAwesomeIcon icon={faSave} size='lg' />
									</a>{' '}
								</th>
							</tr>
						);
					})}
				</Table>
			</div>
		</SideBarScreen>
	);
};
const mapStateToProps = (state: any) => {
	return { files: state.cloud.files, filters: state.cloud.filters };
};
const mapDispatchToProps = (dispatch: any) => {
	return {
		getFiles: () => dispatch(getFiles()),
		setFilter:(filter:string,value:string)=>dispatch(setFilter(filter,value))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CloudScreen);
