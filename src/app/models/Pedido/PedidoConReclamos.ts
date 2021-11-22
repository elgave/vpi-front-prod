import { Item } from "../Cliente/Item";
import { Reclamo } from '../Reclamo/Reclamo';

export class PedidoConReclamos {

    idPedido: number;
    cliente: string;
    restaurante: string;
    pagoOnline: boolean;
    pagoAcreditado: boolean;
    comentario: string;
    precioTotal: number;
    reclamos: Reclamo[];
   
    estado: string;
    comentarioEstado: string;
    fecha: string;
    tiempoE: number;
    direccion: string; 
    items: Item[];
    
    

    constructor(idPedido: number, cliente: string, restaurante: string, pagoOnline: boolean, pagoAcreditado: boolean,
      comentario: string, precioTotal: number, reclamos: Reclamo[], estado: string, comentarioEstado: string, fecha: string,
      tiempoE: number, direccion: string, items: Item[]){
      
        this.idPedido = idPedido;
        this.cliente = cliente;
        this.restaurante = restaurante;
        this.pagoOnline = pagoOnline;
        this.pagoAcreditado = pagoAcreditado;
        this.comentario = comentario;
        this.precioTotal = precioTotal;
        this.reclamos = reclamos;
        this.estado = estado;
        this.comentarioEstado =  comentarioEstado;
        this.fecha = fecha;
        this.tiempoE = tiempoE;
        this.direccion = direccion;
        this.items = items;
    }

}
