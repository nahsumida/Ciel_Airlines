import { TrechoResponse } from "./model";

export function validateTrecho(aeroSaidaBanco: number, aeroChegadaBanco: number,aeroSaida: number, aeroChegada: number){
    let tr: TrechoResponse = {aeroSaida: aeroSaida, aeroChegada: aeroChegada};
    
    if (tr.aeroSaida === undefined){
        tr.aeroSaida = aeroSaidaBanco;
    }

    if (tr.aeroChegada === undefined){
        tr.aeroChegada = aeroChegadaBanco;
    }

    return tr;
}