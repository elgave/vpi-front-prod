export class TopRest {

    nombreRestaurante: string;
    cantidadVentas: number;
    foto: string;
    abierto: boolean;
       

    constructor(nombreRestaurante: string, cantidadVentas: number, foto: string, abierto: boolean)
        {
      
            this.nombreRestaurante = nombreRestaurante;
            this.cantidadVentas = cantidadVentas;
            this.foto = foto;
            this.abierto = abierto;
           
    }

}
