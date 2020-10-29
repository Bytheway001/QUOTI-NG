type optType = {
	decimalCount?: number;
	decimal?: string;
	thousands?: string;
	currency?: string;
};

export function formatMoney(amount: number, { decimalCount = 0, decimal = '.', thousands = ',', currency = '$' }: optType = {}): string {
		const negativeSign: string = amount < 0 ? '-' : ''; // Debo poner el signo negativo? true|false
        amount = Math.abs(amount);
        let result:string = currency+" "+negativeSign;
		let periods = amount.toString().length > 3 ? amount.toString().length % 3 : 0; //Cuantos grupos de numeros
        let i = (amount = Math.abs(amount) || 0).toFixed(decimalCount)
        result = result+
         (periods ? amount.toString().substr(0, periods) + thousands : "") + 
        amount.toString().substr(periods).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount ?
         decimal + Math.abs(amount-Number(i)).toFixed(decimalCount).slice(2)
         :"")
        
        ;
       
        
       
        return result;
	
	
}