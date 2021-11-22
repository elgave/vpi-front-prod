import { Item } from "../Cliente/Item";

export class RechazoPedido {

    idPedido: number;
    motivoRechazo: string;
  
    
    

    constructor( idPedido: number, motivoRechazo: string){
      
        this.idPedido = idPedido;
        this.motivoRechazo = motivoRechazo;
    
    }


}
