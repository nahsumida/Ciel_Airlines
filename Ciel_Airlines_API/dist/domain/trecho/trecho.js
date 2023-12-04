"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTrecho = void 0;
function validateTrecho(aeroSaidaBanco, aeroChegadaBanco, aeroSaida, aeroChegada) {
    let tr = { aeroSaida: aeroSaida, aeroChegada: aeroChegada };
    if (tr.aeroSaida === undefined) {
        tr.aeroSaida = aeroSaidaBanco;
    }
    if (tr.aeroChegada === undefined) {
        tr.aeroChegada = aeroChegadaBanco;
    }
    return tr;
}
exports.validateTrecho = validateTrecho;
