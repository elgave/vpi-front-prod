export class NuevoMenu {

    restaurante: string;
    nombre: string;
    categoria: string;
    promocion: boolean;
    descripcion: string;
    costo: number;
    descuento: number;
    imagen: string;

    constructor(restaurante: string, nombre: string, categoria: string, promocion: boolean,
        descripcion: string, costo: number, descuento: number, imagen: string)
        {
            this.restaurante = restaurante;
            this.nombre = nombre;
            this.categoria = categoria;
            this.promocion = promocion;
            this.descripcion = descripcion;
            this.costo = costo;
            this.descuento = descuento;
            this.imagen = imagen;
     
    }

}
