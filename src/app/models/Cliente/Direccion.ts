export class Direccion {

    idCliente: string;
    nombre: string;
    principal: boolean;
    calle: string;
    esquina: string;
    numero: string;
    apto: string;
    barrio: string;
    id: number;
       

    constructor(idCliente: string, nombre: string, principal: boolean, calle: string, esquina: string, numero: string,
        apto: string, barrio: string, id: number)
        {
      
          this.nombre = nombre;
          this.principal = principal;
          this.calle = calle;
          this.esquina = esquina;
          this.esquina = esquina;
          this.numero = numero;
          this.apto = apto;
          this.barrio = barrio;
          this.idCliente = idCliente;
          this.id = id;
           
    }

}
