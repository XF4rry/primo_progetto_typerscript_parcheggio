import { Parcheggio } from "./Parcheggio";
import { Veicolo } from "./Veicolo";

export class Database {
    parcheggio:Parcheggio;

    constructor() {
        this.parcheggio = new Parcheggio(
            "Reggio Emilia FS",
            "Via della Stazione, Reggio Emilia",
            123,
            2
        );
        this.parcheggio.veicoli.push(new Veicolo("TR010NE"));
        this.parcheggio.veicoli.push(new Veicolo("GG104EZ"));
        this.parcheggio.veicoli.push(new Veicolo("CO610NE"));
    }
}