
export const reduceBenefits=(list)=>{
    
    return list.reduce((acc, obj) => {
        obj.benefits.forEach((element, index) => {
            if (!acc[element.category]) {
                acc[element.category] = {};
            }
            if (!acc[element.category][element.benefit]) {
                acc[element.category][element.benefit] = [];
            }
            acc[element.category][element.benefit].push(element.description);
        });
        return acc;
    }, {});
}

  
export function groupBy(arr,property){
    return arr.reduce((acc,obj)=>{
        const key = obj[property];
        if(!acc[key]){
            acc[key]={}
            acc[key].coverage=obj.cobertura_maxima
            acc[key].plan_type=obj.plan_type
            acc[key].region_id=obj.region_id
            acc[key].company=obj.company
            acc[key].plan_type=obj.plan_type
            acc[key].id=obj.id
            acc[key]['rates']=[]
        }
        let newRate={
            deductible_out:obj.deductible_out,
            deductible:obj.deductible,
            yearly:obj.yearly_price,
            couple:obj.couple_price,
            kids:obj.kids_price,
            
        }

        let r=obj.endosos.reduce((prev,endoso)=>{
        
            if(!prev[endoso.name]){
                prev[endoso.name]={}
                prev[endoso.name].price=endoso.price;
                prev[endoso.name].avaliable=[];
                prev[endoso.name].selected=[];
            }
            endoso.endoso_configs.forEach((val)=>{
                if(val.selected){
                    if (!prev[endoso.name].selected.includes(val.deductible)){
                        prev[endoso.name].selected.push(val.deductible)
                    }
                  
                 }
                 if(val.avaliable){
                    if (!prev[endoso.name].avaliable.includes(val.deductible)){
                        prev[endoso.name].avaliable.push(val.deductible)
                    }
                  
                 }
            })
            return prev
        },{})
        acc[key].riders=r
        acc[key]['rates'].push(newRate)
        
        return acc
    },{})
}


function base64ToArrayBuffer(data) {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}


export const downloadXls = (base64Data,name=null)=>{
    var arrBuffer = base64ToArrayBuffer(base64Data);
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([arrBuffer], { type: "application/xlsx" });
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    var data = window.URL.createObjectURL(newBlob);

    var link = document.createElement("a");
    document.body.appendChild(link); //required in FF, optional for Chrome
    link.href = data;
    link.download = name?name+'.xlsx':"Cotizacion.xlsx";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
}