export function retornos(sucess:boolean, msg:string, data:any){
    const retorno = {
        sucess: sucess,
        message: msg,
        details: data
    }
    return retorno
}
