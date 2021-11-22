import { Item } from "../Cliente/Item";

export class PedidoDetalle {

    idPedido: number;
    cliente: string;
    restaurante: string;
    pagoOnline: boolean;
    pagoAcreditado: boolean;
    comentario: string;
    precioTotal: number;
    items: Item[];
   
    estado: string;
    comentarioEstado: string;
    fecha: string;
    tiempoE: number;
    direccion: string; 
    
    

    constructor(idPedido: number, cliente: string, restaurante: string, pagoOnline: boolean, pagoAcreditado: boolean,
      comentario: string, precioTotal: number, items: Item[], estado: string, comentarioEstado: string, fecha: string,
      tiempoE: number, direccion: string){
      
        this.idPedido = idPedido;
        this.cliente = cliente;
        this.restaurante = restaurante;
        this.pagoOnline = pagoOnline;
        this.pagoAcreditado = pagoAcreditado;
        this.comentario = comentario;
        this.precioTotal = precioTotal;
        this.items = items;
        this.estado = estado;
        this.comentarioEstado =  comentarioEstado;
        this.fecha = fecha;
        this.tiempoE = tiempoE;
        this.direccion = direccion;
    }

}
