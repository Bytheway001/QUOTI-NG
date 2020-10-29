import { faBaby, faHeartbeat,  faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { IComparePlan } from '../../../types/store';
import { formatMoney } from '../../../utils/formatMoney';

export const AddedPlanList: React.FC<IProps> = ({plans,removeFromCompare}) => {
	if(plans.length>0){
	return (
		<ListGroup className="compare-list-group">
			{plans.map((item,key: number) => {
				console.log(item);
				return (
					<ListGroupItem>
						<span>
							{item.name} - {formatMoney(item.deductible)}
						</span>
                        <div className='d-flex'>
					
                        {
                            item.riders['Complicaciones de Maternidad' as any].selected.includes(item.deductible) && <FontAwesomeIcon size='lg' title='Maternidad' color='blue' icon={faBaby}/>
                        }
                          {
                            item.riders['Transplante de Órganos' as any].selected.includes(item.deductible) && <FontAwesomeIcon size='lg' title='Trasnsplante' color='blue' icon={faHeartbeat}/>
                        }
                        	<FontAwesomeIcon
                            size='lg'
                            color='red'
                            className='mx-2'
                            icon={faTrashAlt}
                            title='Eliminar Plan'
							onClick={() =>
								removeFromCompare(item.name, item.deductible)
							}
						/>
                        </div>
					</ListGroupItem>
				);
			})}
		</ListGroup>
		
	);
}
else return null;
};

interface IProps{
	plans:IComparePlan[],
	removeFromCompare:Function
}