// importo le classi necessarie
import { Database } from "../models/Database";
//import { Parcheggio } from "../models/Parcheggio";
import { Veicolo } from "../models/Veicolo";

export class ParcheggiController {
  // dichiaro un db
  private db: Database;

  constructor() {
    // inizializzo il database
    this.db = new Database();
  }

  //scrivo il metodo getDatiParcheggiate per la prima funzione del problema (stampa i dati dei veicoli presenti)
  public getDatiParcheggiate(): Veicolo[] {
    // Utilizzo il metodo "filter" per prendere i veicoli che non sono ancora usciti
    // Il metodo "filter" filtra l'array in base a una condizione
    // La condizione è che la proprietà "dateExit" di ogni oggetto "Veicolo" sia indefinita
    // L'array filtrato viene restituito
    return this.db.parcheggio.veicoli.filter((v) => v.dateExit == undefined);
  }

  //scrivo il metodo getNumeroVeicoliPresenti per la seconda funzione del problema (stampa il numero dei veicoli presenti)
  public getNumeroVeicoliPresenti(): number {  
    // richiamo il metodo getDatiParcheggiate per non duplicare il codice
    const datiParcheggiate = this.getDatiParcheggiate();
    // faccio il return della lunghezza dell'array perchè il secondo punto mi chiede soltanto di restituire il numero dei veicoli presenti (non i dati)
    return datiParcheggiate.length;
  }
}

