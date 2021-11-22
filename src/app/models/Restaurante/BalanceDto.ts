export class BalanceDto {

    idRestaurante: string;
    tipoDeVenta: string;
    fechaDesde: Date;
    fechaHasta: Date;

    

    constructor(idRestaurante: string, tipoDeVenta: string, fechaDesde: Date, fechaHasta: Date)
        {
           this.idRestaurante = idRestaurante;
           this.tipoDeVenta = tipoDeVenta;
           this.fechaDesde = fechaDesde;
           this.fechaHasta = fechaHasta;
     
    }

}
