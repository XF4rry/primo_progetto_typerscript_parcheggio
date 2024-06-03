import * as rl from "readline-sync";
import { ParcheggiController } from "../controllers/PontosController";

export class MainMenuView{
        static stampaMenu(){
        let controller = new ParcheggiController();
        console.log("Parcheggio TS");
        console.log("--------------------------------------------------------------------------------------------------------------------");
        console.log("Benvenuto nel Gestionale del Parcheggio");
        console.log("--------------------------------------------------------------------------------------------------------------------");
        console.log("1. Visualizza i dati dei veicoli presenti");
        console.log("2. Visualizza il numero di veicoli presenti");
        console.log("9. Esci");
        console.log("--------------------------------------------------------------------------------------------------------------------");
        let scelta = rl.questionInt("inserire la scelta: ");
        switch(scelta){
            case 1:
                controller.getDatiParcheggiate().forEach(element => {console.log(element.targa + " entrato il: " + element.dateEntry + " e uscito il: " + element.dateExit + " con un importo di: " + element.importo + " €");});
                MainMenuView.stampaMenu();
                break;
            case 2:
                console.log(controller.getNumeroVeicoliPresenti());
                MainMenuView.stampaMenu();
                break;
            case 9:
                
                break;
            default:
                console.log("scelta non valida");
                MainMenuView.stampaMenu();
        }
    }
}