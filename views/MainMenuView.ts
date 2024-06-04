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
        console.log("3. Inserisci un veicolo");
        console.log("4. Rimuovi un veicolo e calcola l'importo");
        console.log("9. Esci");
        console.log("--------------------------------------------------------------------------------------------------------------------");
        let scelta = rl.questionInt("inserire la scelta: ");
        console.clear();
        switch(scelta){
            case 1:
                controller.getDatiParcheggiate().forEach(element => {
                    if(element.dateExit == element.dateEntry){
                        console.log(element.targa + " entrato il: " + element.dateEntry);
                    }else{
                        console.log(element.targa + " entrato il: " + element.dateEntry + " e uscito il: " + element.dateExit + " importo da pagare: " + element.importo + " €");
                    };
                }); 
                MainMenuView.stampaMenu();
                break;
            case 2:
                console.log(controller.getNumeroVeicoliPresenti());
                MainMenuView.stampaMenu();
                break;
            case 3:
                console.log("Inserisci la targa del veicolo:");
                let targa = rl.question();
                if(controller.addVeicolo(targa)){
                    console.log("veicolo inserito!");
                    
                }else{
                    console.log("parcheggio pieno o veicolo già presente");
                }
                MainMenuView.stampaMenu();
                break;
            case 4:
                console.log("Inserisci la targa del veicolo:");
                let targaExit = rl.question();
                let veicolo  = controller.getVeicoloByTarga(targaExit);
                let importo = controller.calcolaImporto(veicolo);
                console.log(`veicolo ${veicolo.targa} uscito il ${veicolo.dateExit}, importo a pagare: ${importo} €`);
                MainMenuView.stampaMenu();
                break;
            case 5:

                break;
            case 9:
                
                break;
            default:
                console.log("scelta non valida");
                MainMenuView.stampaMenu();
        }
    }
}