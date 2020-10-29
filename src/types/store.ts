export interface IQuote {
	plans: {
		[key: string]: IPlan;
	};
	params: IParams;
    compare: Array<IComparePlan>;
    
}

export interface IPlan {
	coverage: string;
	plan_type: string;
	region_id: number;
	company: string;
	id: number;
    rates: Array<IRate>;
    riders:Array<IRider>
}

export interface IComparePlan extends IPlan{
    name:string,
    deductible:number
}

export interface IParams {
	country: string;
	main_age: string;
	couple_age: string;
	num_kids: number;
}

export interface IRate {
	deductible: number;
	deductible_out: number;
	yearly: number;
	couple: number;
	kids: number;
}

export interface IRider {
	price: number;
	avaliable: Array<number>;
	selected: Array<number>;
}

/** Perfil de agente */
export interface IQuoteStat{
	created_at:string,
	date:string,
	id:number,
	name:string,
	quote:{
		plans:Array<IComparePlan>,
		params:IParams
	}
	user:string,
	user_id:number
}

/** COMPARADOR DE BENEFICIOS */
