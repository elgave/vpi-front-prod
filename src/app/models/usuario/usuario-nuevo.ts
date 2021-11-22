export class UsuarioNuevo {
    nombre : string;
    apellido : string;
    email : string;
    password : string;
    rol : string;
    
    

    constructor(nombre: string, apellido: string, email: string, password: string, rol :string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

}
