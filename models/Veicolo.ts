export class Veicolo {
    //public targa: string;
    public dateEntry?: Date;
    public dateExit?: Date;
    importo?: number;
    constructor (readonly targa: string){
        this.dateEntry = new Date();
        this.dateExit = undefined;
        this.importo = undefined;
    }


}