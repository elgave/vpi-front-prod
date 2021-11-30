import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { NuevoCliente } from '../models/Cliente/NuevoCliente';
import { NuevoRestaurante } from '../models/Restaurante/NuevoRestaurante';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /*Cliente*/
  nuevoCliente : NuevoCliente;
  email: string = '';
  nombre: string;
  apellido: string;
  password: string = ''; 
  celular: string;
  foto: File;
  /*Restaurante*/
  NuevoRestaurante : NuevoRestaurante;
  nombreRestaurante: string;
  nroHabilitacion: string;
  razonSocial: string;
  rut: string;
  direccion: string;
  descripcionMenues: string;
  precioEnvio: Number;
  horario: string;
  errMsj: string;
  isLogged = false;
  lista: string[]=[];
  seleccionado: string = "Cliente";
  urlFoto: string = "";
  capturado: string;
  cliente: boolean = true;
  form: FormData;
  constructor(
    private tokenService : TokenService,
    private authService : AuthService,
    private router : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.limpiarForm();
    if (this.tokenService.getToken()){
      this.isLogged = true;     
    }
    this.lista.push("Cliente");
    this.lista.push("Restaurante");
    
  }

  onRegisterCliente():void{
    this.nuevoCliente = new NuevoCliente(this.nombre, this.apellido ,this.email, this.password, this.celular,this.urlFoto);
    
    const formData = new FormData();
    formData.append('clienteDto', JSON.stringify(this.nuevoCliente));
    formData.append('file',this.foto);

    this.authService.registroCliente(formData).subscribe(
      data=> {
      this.toastr.success('Cuenta creada con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      console.log(data);
          
        this.router.navigate(['/login']);
      },
      err=>{
        this.errMsj = err.error;
        this.toastr.error(this.errMsj, '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    );
  }

  onRegisterRestaurante():void{
    this.NuevoRestaurante = new NuevoRestaurante(this.email, this.password, this.nombreRestaurante,
      this.nroHabilitacion, this.razonSocial, this.rut, this.direccion, this.descripcionMenues, this.celular,
      this.precioEnvio, this.horario, this.urlFoto);
      const formData = new FormData();
      formData.append('restauranteDto', JSON.stringify(this.NuevoRestaurante));
      formData.append('file',this.foto);

    this.authService.registroRestaurante(formData).subscribe(
      data=> {
      this.toastr.success('Cuenta creada con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      console.log(data);
        localStorage.setItem('idResturante', this.email)  
        this.router.navigate(['/altaMenu']);
      },
      err=>{
        this.errMsj = err.error;
        this.toastr.error(this.errMsj, '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    );
  }

  capturar() {
    this.capturado = this.seleccionado;
    if (this.capturado === "Restaurante")
      this.cliente = false;
      else
      this.cliente = true;
  }

  subirIcono(files) {

    let icono = <File>files[0];
    this.foto = icono;
  }

  limpiarForm(){
    this.nombreRestaurante = '';
    this.nroHabilitacion = '';
    this.razonSocial = '';
    this.rut = '';
    this.direccion = '';
    this.descripcionMenues = '';
    this.email = "";
    this.nombre = '';
    this.apellido = '';
    this.password = ''; 
    this.celular = ''; 
    this.foto = undefined; 
  }
}
