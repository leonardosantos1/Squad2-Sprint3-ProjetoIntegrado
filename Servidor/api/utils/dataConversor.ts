export function dataConversor(data:any){ 
    try {
        const datahota = data
    let splitdatahora = datahota.split(" ")
    if (splitdatahora.length == 2) {
        let regexdata = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        let combinacao = regexdata.exec(splitdatahora[0]);
        if (combinacao) {
            let splitdata = splitdatahora[0].split("/")
            if (splitdata.length == 3) {
                let regexhora = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
                let combinacao = regexhora.exec(splitdatahora[1]);
                if (combinacao) {
                    let splithora = splitdatahora[1].split(":")
                    const data = new Date(parseInt(splitdata[2]),parseInt(splitdata[1]) - 1, parseInt(splitdata[0]), parseInt(splithora[0]) - 3, parseInt(splithora[1]), 0, 0);
                    return data
                } else {
                    throw new Error("Erro com o formato da data 'dd/mm/aaaa hh:mm'");
                }
            } else {
                throw new Error("Erro com o formato da data 'dd/mm/aaaa hh:mm'");
            }
        } else {
            throw new Error("Erro com o formato da data 'dd/mm/aaaa hh:mm'");
        }
    } else {
        throw new Error("Erro com o formato da data 'dd/mm/aaaa hh:mm'");
    }
    } catch (error) {
        throw new Error("Erro com o formato da data 'dd/mm/aaaa hh:mm'");
    }
}

export function dataRevert(data:string, retorno:boolean) {
    let ano = parseInt(data.substring(0, 4))
    let mes = parseInt(data.substring(5, 7))
    let dia = parseInt(data.substring(8, 10))
    let hora = parseInt(data.substring(11, 13))
    let minuto = parseInt(data.substring(14, 16))
    if (retorno == true) {
        return [dia, mes, ano, hora, minuto]
    } else {
        return `${dia}/${mes}/${ano} ${hora}:${minuto}`
    }
}