export class Reclamo {

  idReclamo: number;
  pedido: number;
  estado: string;
  tipo: string;
  comentario: string;
  fecha: Date;
    
    

    constructor( idReclamo: number, pedido: number,estado: string, tipo: string, comentario: string, fecha: Date){
      
        this.idReclamo = idReclamo;
        this.pedido = pedido;
        this.estado = estado;
        this.tipo = tipo;
        this.comentario = comentario;
        this.fecha = fecha;
    }

}
