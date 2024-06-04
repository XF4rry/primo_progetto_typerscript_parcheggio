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

  //scrivo il metodo addVeicolo per la terza funzione del problema (inserisci un veicolo)
  addVeicolo(targa: string) : boolean {
    // richiamo il metodo getNumeroVeicoliPresenti per non duplicare il codice
    const numeroVeicoliPresenti = this.getNumeroVeicoliPresenti();
    //
    const veicoloEsistente = this.trovaTarga(targa);
    if (numeroVeicoliPresenti < this.db.parcheggio.capienza && !veicoloEsistente) {
      this.db.parcheggio.veicoli.push(new Veicolo(targa));
      return true;
    } else {
      return false;
    }
  }

  //creo una funzione per non duplicare il codice
  trovaTarga(targa: string): Veicolo | undefined {
    //cerco un veicolo con la targa immessa
    return this.db.parcheggio.veicoli.find(veicolo => veicolo.targa === targa);
  }

  getVeicoloByTarga(targa: string): Veicolo {
    const veicolo = this.trovaTarga(targa);
    if (!veicolo) {
      throw new Error('Veicolo non trovato');
    }
    return veicolo;
  }

  // questa funzione calcola l'importo finale di un veicolo al tempo della sua uscita (punto 4)
  calcolaImporto(veicolo: Veicolo): number {
    // Get the current date
    const adesso = new Date();

    // calcolo il numero di minuti passati dall'entrata
    const exitMin = adesso.getMinutes() - veicolo.dateEntry.getMinutes();

    // arrotondo il numero di minuti per 15
    const exitParcheggio = Math.floor(exitMin / 15);
    const exitParcheggioRounded = exitParcheggio * 15;

    // calcolo il numero di minuti definitivo arrotondato per 15
    const totalMin = veicolo.dateEntry.getMinutes() + exitParcheggioRounded;

    // calcolo il numero di ore passate dall'entrata
    const totalHr = veicolo.dateEntry.getHours() + Math.floor(totalMin / 60);

    // calcolo il nummero di minuti oltre l'ora piena
    const totalMinInHr = totalMin % 60;

    // creo un nuovo oggetto Date per la data di uscita
    const exitDate = new Date(
      veicolo.dateEntry.getFullYear(),
      veicolo.dateEntry.getMonth(),
      veicolo.dateEntry.getDate(),
      totalHr,
      totalMinInHr
    );

    // aggiorno la data di uscita del veicolo
    veicolo.dateExit = exitDate;

    // calcolo l'importo
    veicolo.importo = (exitDate.getTime() - veicolo.dateEntry.getTime()) * this.db.parcheggio.tariffaOraria / (60 * 1000);

    // faccio il return dell'importo
    return veicolo.importo;
  }
}


