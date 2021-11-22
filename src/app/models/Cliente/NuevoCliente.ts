export class NuevoCliente {

   
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    celular: string;
    urlFoto: string;
    
    

    constructor(nombre: string, apellido: string, email: string, password: string, celular :string, foto :string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.celular = celular;
        this.urlFoto = foto;
    }

}
