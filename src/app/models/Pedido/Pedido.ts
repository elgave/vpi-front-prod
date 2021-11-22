import { Item } from "../Cliente/Item";

export class Pedido {

    idPedido: number;
    cliente: string;
    restaurante: string;
    pagoOnline: boolean;
    pagoAcreditado: boolean;
    comentario: string;
    precioTotal: number;
    items: Item[];
    direccion: string;
    
    

    constructor(idPedido: number, cliente: string, restaurante: string, pagoOnline: boolean, pagoAcreditado: boolean,
      comentario: string, precioTotal: number, items: Item[], direccion: string ){
      
        this.idPedido = idPedido;
        this.cliente = cliente;
        this.restaurante = restaurante;
        this.pagoOnline = pagoOnline;
        this.pagoAcreditado = pagoAcreditado;
        this.comentario = comentario;
        this.precioTotal = precioTotal;
        this.items = items;
        this.direccion = direccion;
    }

}
