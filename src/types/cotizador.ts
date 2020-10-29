export type QuoteParamsProps={
    country:string,
    main_age:string,
    couple_age:string,
    num_kids:number

}
export type QuoteProps={
    plans:QuotePlanProps,
    params?:QuoteParamsProps,
    compare:Array<QuoteCompareProps>,
    errors?:string
}

export type QuotePlanProps={
    [key:string]:any,
    coverage:string,
    plan_type:string,
    region_id:number,
    company:string,
    id:number,
    rates:Array<any>,
    riders:Array<any>
}

export type QuoteCompareProps={
    name:string,
    deductible:number,
    coverage:string,
    company:string,
    deductible_out:number,
    rates:Array<RateProps>,
    riders:Array<any>
}

export type RateProps={
    deductible:number,
    deductible_out:number,
    yearly:number,
    couple?:number,
    kids?:number
}

export type RiderProps={
    price:number,
    avaliable:Array<number>
    selected:Array<number>
}

/* Components */

export interface ICotizadorProps {
    getQuote:Function
    cleanData:Function
    addToCompare:Function
    removeFromCompare:Function
}

export interface ISideBarProps {
    compare:Array<QuoteCompareProps>;
	getQuote: Function;
    plans: QuotePlanProps;
    params?:QuoteParamsProps,
	cleanData: Function;
	removeFromCompare: Function;
}
