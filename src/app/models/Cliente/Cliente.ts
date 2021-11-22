export class Cliente {

  nombre: string;
  apellido: string;
  celular: string;
  foto: string;


constructor(nombre: string, apellido: string, celular :string, foto :string){
    this.nombre = nombre;
    this.apellido = apellido;

    this.celular = celular;
    this.foto = foto;
}

}