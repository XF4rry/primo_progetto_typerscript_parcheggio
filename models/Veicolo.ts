export class Veicolo {
    //public targa: string;
    public dateEntry: Date;
    public dateExit: Date;
    public importo: number;
    constructor (readonly targa: string){
        this.dateEntry = new Date();
        this.dateExit = this.dateEntry;
        this.importo = 0;
    }


}