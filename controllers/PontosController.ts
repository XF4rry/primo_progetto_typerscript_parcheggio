// importo le classi necessarie
import { Database } from "../models/Database";
import { Parcheggio } from "../models/Parcheggio";
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
    return this.db.parcheggio.veicoli.filter((v) => v.dateExit == v.dateEntry);
  }

  //scrivo il metodo getNumeroVeicoliPresenti per la seconda funzione del problema (stampa il numero dei veicoli presenti)
  public getNumeroVeicoliPresenti(): number {  
    // richiamo il metodo getDatiParcheggiate per non duplicare il codice
    const datiParcheggiate = this.getDatiParcheggiate();
    // faccio il return della lunghezza dell'array perchè il secondo punto mi chiede soltanto di restituire il numero dei veicoli presenti (non i dati)
    return datiParcheggiate.length;
  }


  addVeicolo(targa: string) : boolean {
    const numeroVeicoliPresenti = this.getNumeroVeicoliPresenti();
    const veicoloEsistente = this.db.parcheggio.veicoli.find((v) => v.targa === targa);
    if (numeroVeicoliPresenti < this.db.parcheggio.capienza && !veicoloEsistente) {
      this.db.parcheggio.veicoli.push(new Veicolo(targa));
      return true;
    } else {
      return false;
    }
  }

  getVeicoloByTarga(targa: string): Veicolo {
    const veicolo = this.db.parcheggio.veicoli.find((v) => v.targa === targa);
    if (!veicolo) {
      throw new Error('Veicolo non trovato');
    }
    return veicolo;
  }

  calcolaImporto(veicolo: Veicolo): number {
    const now = new Date();
    const exitMinutes = now.getMinutes() - veicolo.dateEntry.getMinutes();
    const exitBlocks = Math.floor(exitMinutes / 15);
    const exitBlocksRounded = exitBlocks * 15;
    const totalMinutes = veicolo.dateEntry.getMinutes() + exitBlocksRounded;
    const totalHours = veicolo.dateEntry.getHours() + Math.floor(totalMinutes / 60);
    const totalMinutesInHours = totalMinutes % 60;
    const exitDate = new Date(veicolo.dateEntry.getFullYear(), veicolo.dateEntry.getMonth(), veicolo.dateEntry.getDate(), totalHours, totalMinutesInHours);
    veicolo.dateExit = exitDate;
    veicolo.importo = (exitDate.getTime() - veicolo.dateEntry.getTime()) * this.db.parcheggio.tariffaOraria / (60 * 1000);
    return veicolo.importo;
  }
}


