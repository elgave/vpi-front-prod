import { Cliente } from '../Cliente/Cliente';
export class Reclamo {

  idReclamo: number;
  pedido: number;
  estado: string;
  tipo: string;
  comentario: string;
  fecha: Date;
  cliente: string;
    
    

    constructor( idReclamo: number, pedido: number,estado: string, tipo: string, comentario: string, fecha: Date, cliente: string){
      
        this.idReclamo = idReclamo;
        this.pedido = pedido;
        this.estado = estado;
        this.tipo = tipo;
        this.comentario = comentario;
        this.fecha = fecha;
        this.cliente = cliente;
    }

}
