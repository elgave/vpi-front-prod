export class Calificacion{


      idRestaurante: string;
      idCliente: string;
      cliente: boolean;
      puntuacion: number;

      constructor(idRestaurante: string, idCliente: string, cliente:boolean, puntuacion :number){
        this.idRestaurante = idRestaurante;
        this.idCliente = idCliente;
    
        this.cliente = cliente;
        this.puntuacion = puntuacion;
    }
}