export class NuevoRestaurante {

    email: string;
    password: string;
    nombreRestaurante: string;
    nroHabilitacion: string;
    razonSocial: string;
    rut: string;
    direccion: string;
    descripcionMenues: string;
    celular: string;
    precioEnvio: Number;
    horario: string;
    urlFoto: string;
   
    
    

    constructor(email: string, password: string, nombreRestaurante: string, nroHabilitacion: string,
        razonSocial: string, rut: string, direccion: string, descripcionMenues: string, celular: string, 
        precioEnvio: Number, horario: string, urlFoto: string)
        {
        this.email = email;
        this.password = password;
        this.nombreRestaurante = nombreRestaurante;
        this.nroHabilitacion = nroHabilitacion;
        this.razonSocial = razonSocial;
        this.rut = rut;
        this.direccion = direccion;
        this.descripcionMenues = descripcionMenues;
        this.celular = celular;
        this.precioEnvio = precioEnvio;
        this.horario = horario;
        this.urlFoto = urlFoto;
    }

}
