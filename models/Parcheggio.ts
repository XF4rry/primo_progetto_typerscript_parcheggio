import {Veicolo} from "./Veicolo";
export class Parcheggio {

    public nome:string;
    public indirizzo:string;
    public capienza:number;
    readonly tariffaOraria:number;
    veicoli:Veicolo[] = [];

    constructor(nome:string, indirizzo:string, capienza:number, tariffaOraria:number) {
        this.nome = nome;
        this.indirizzo = indirizzo;
        this.capienza = capienza;
        this.tariffaOraria = tariffaOraria;
    }
}