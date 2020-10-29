import React, { FormEvent, useEffect, useState } from 'react';
import { Form, FormGroup, Row, FormLabel, Col } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { RoundButton } from '../../../Controls/Buttons';
import { RoundInput } from '../../../Controls/Input';
import { Select } from '../../../Controls/Select';
import { fakeData } from '../../../fakeData';
import { QuoteParamsProps } from '../../../types/cotizador';

interface IProps{
    getQuote:Function,
    params?:QuoteParamsProps
}
const QuoteForm: React.FC<IProps> = ({getQuote,params}) => {
    const [country, setCountry] = useState(params?params.country:'');
    const [plan_type, setPlanType] = useState<number>(params?params.num_kids?3:params.couple_age?2:1:0);
	const [main_age, setMainAge] = useState(params?params.main_age:'');
	const [couple_age, setCoupleAge] = useState(params?params.couple_age:'');
	const [num_kids, setNumKids] = useState(params?params.num_kids:0);
	const [kids_ages, setKidAges] = useState([] as any);
	const handleKidAgeChange = (key: number, value: string) => {
		kids_ages[key] = parseInt(value);
		setKidAges([...kids_ages]);
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		let data = {
			country,
			plan_type,
			main_age,
			couple_age,
			num_kids,
			kids_ages,
		};
		getQuote(data);
	};

	useEffect(() => {
		if (!country) {
			setPlanType(0);
		}
		if (!plan_type) {
			setCoupleAge('');
			setNumKids(0);
			setKidAges([]);
		}
	}, [country, plan_type]);
    return (
        <Form id="quote-form" onSubmit={handleSubmit}>
            <FormGroup as={Row}>
                <FormLabel column xs={12} sm={3} className="py-0 d-flex align-items-center">
                    Pais:
					</FormLabel>
                <Col md={9}>
                    <Select options={fakeData.countries} value={country} onChange={({ target }) => setCountry(target.value)} />
                </Col>
            </FormGroup>
            {country && (
                <FormGroup as={Row}>
                    <FormLabel column xs={12} sm={3} className="py-0 d-flex align-items-center">
                        Tipo:
						</FormLabel>
                    <Col md={9}>
                        <Select options={fakeData.plan_types} value={plan_type} onChange={({ target }) => setPlanType(parseInt(target.value))} />
                    </Col>
                </FormGroup>
            )}

            {country && plan_type ? (
                <Row className="mb-3">
                    <Col sm={12}>
                        <p className="text-center">Edades de los Titulares</p>
                    </Col>
                    <Col xs={6}>
                        <RoundInput value={main_age} onChange={({ target }) => setMainAge(target.value)} placeholder="Titular" size="sm" />
                    </Col>

                    <Col xs={6}>{plan_type >= 2 && <RoundInput value={couple_age} onChange={({ target }) => setCoupleAge(target.value)} placeholder="Pareja" size="sm" />}</Col>
                </Row>
            ) : null}
            {plan_type === 3 && (
                <>
                    <Row>
                        <Col sm={12}>
                            <p className="text-center">Numero de Hijos: {num_kids}</p>
                            <RangeSlider value={num_kids} onChange={({ target }) => setNumKids(parseInt(target.value))} min={1} max={6} tooltip="auto" tooltipPlacement="top" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <p className="text-center">Edades de los Hijos</p>
                        </Col>
                        {new Array(num_kids).fill(0).map((kid, key) => {
                            return (
                                <Col key={key} xs={2}>
                                    <RoundInput onChange={({ target }) => handleKidAgeChange(key, target.value)} value={kids_ages[key]} type="number" size="sm" min={1} max={18} className="text-center" />
                                </Col>
                            );
                        })}
                    </Row>
                </>
            )}
            <RoundButton type="submit" className="bg-blue-dark mb-1" block>
                Cotizar!
				</RoundButton>
        </Form>
    )
}

export default React.memo(QuoteForm);