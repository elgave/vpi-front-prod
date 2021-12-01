import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/service/Cliente/cliente.service';
import { TokenService } from 'src/app/service/token.service';
import { Direccion } from '../../models/Cliente/Direccion';
import { Email } from '../../models/usuario/email';

@Component({
  selector: 'app-clienteMisDirecciones',
  templateUrl: './clienteMisDirecciones.component.html',
  styleUrls: ['./clienteMisDirecciones.component.css']
})
export class ClienteMisDireccionesComponent implements OnInit {

  email: string;
  direcciones: Direccion[] = [];
  pago: string;
  nombre: string;
  numero: string = '';
  apto: string = '';
  calle: string = '';
  esquina: string = '';
  barrio: string = ''; 
  direccion: Direccion;
  principal: boolean;
  marked: boolean = false;
  cantDir: number;
  onlyRead: boolean = false;
  fotostring: string;
  direccionSeleccionada: Direccion;
  abrirModal: boolean = false;
  cambiarPrincipal: boolean = true;
  id: number;
   

  constructor(
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private toastr : ToastrService, 
    private router : Router,
  ) { }

  ngOnInit() {
    this.cargarDirecciones();
    this.cantDirecciones();
    this.obtenerFoto(this.tokenService.getUsername());
         
    

  }

  cargarDirecciones() {
    this.email = this.tokenService.getUsername();
    this.clienteService.getDirecciones(this.email).subscribe(
      data => {
        this.direcciones = data;
        this.direccionSeleccionada = this.direcciones[0];
        
      },
      err => {
        console.log(err);
      }
    );
  }

  capturarPrincipal(e){
    this.principal= e.target.checked;
  }

  limpiarForm(){
    this.nombre = '';
    this.principal = false;
    this.calle = '';
    this.esquina = '';
    this.numero = '';
    this.apto = '',
    this.barrio = '';

  }

  registrarDireccion(){
   
    this.email = this.tokenService.getUsername();
    if(!this.onlyRead){
      this.principal = true;
    }
    this.direccion = new Direccion(this.email, this.nombre, this.principal, this.calle, this.esquina, this.numero, this.apto,
      this.barrio,null);
      this.clienteService.registrarDireccion(this.direccion).subscribe(
        data=> {
          this.toastr.success('Dirreccion registrada con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          console.log(data);
            this.cargarDirecciones();
            if(this.cantDir == 0 ){
              this.router.navigate(['/clienteRestaurante']);
            } 
            this.limpiarForm();    
            
          },
          err=>{
              this.toastr.error( err.error, '',{
              timeOut: 3000, positionClass: 'toast-top-center',
            });
           console.log(err);
          }
        );
     
  }

  cantDirecciones(){
    this.email = this.tokenService.getUsername();
    this.clienteService.getCantDirecciones(this.email).subscribe(
        data => {
          this.cantDir = data;
          if(this.cantDir > 0){
            this.onlyRead = true;
          }    
          if(this.cantDir == 1){
            this.cambiarPrincipal = false;
            this.principal = true;
          }    
            
        },
        err => {
          console.log(err);
        }
      );  
    }

    obtenerFoto(email : string){
      this.clienteService.obtenerMisDatos(email).subscribe(data =>{
          sessionStorage.setItem('fotoPerfil', data.foto)
  
          this.fotostring = sessionStorage.getItem('fotoPerfil')
          console.log(this.fotostring);
          
      });
  
    }

  seleccionar(dire: Direccion){
    this.direccionSeleccionada = dire;  
    this.numero = dire.numero;
    this.nombre = dire.nombre;
    this.calle = dire.calle;
    this.apto = dire.apto;
    this.barrio = dire.barrio;
    this.esquina = dire.esquina;
    this.abrirModal = true; 
  }

  modificar(){
    this.email = this.tokenService.getUsername();
    this.nombre = this.direccionSeleccionada.nombre;
    this.id = this.direccionSeleccionada.id;
    if(this.calle === ''){
      this.calle = this.direccionSeleccionada.calle;
    }
    if(this.esquina === ''){
      this.esquina = this.direccionSeleccionada.esquina;
    }
   
    if(this.direccionSeleccionada.apto==null || this.direccionSeleccionada.apto== undefined){
      this.direccionSeleccionada.apto = '';
      this.apto = this.direccionSeleccionada.apto;
    }
    if(this.numero === ''){
      this.numero = this.direccionSeleccionada.numero;
    }
    if(this.barrio === ''){
      this.barrio = this.direccionSeleccionada.barrio;
    }

    this.direccion = new Direccion(this.email, this.nombre, this.principal, this.calle, this.esquina, this.numero, this.apto,
      this.barrio,this.id);
      this.clienteService.modificarDireccion(this.direccion).subscribe(
        data=> {
          this.toastr.success('Dirreccion actualizada con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          console.log(data);
            this.cargarDirecciones();
            if(this.cantDir == 0 ){
              this.router.navigate(['/clienteRestaurante']);
            }         
          },
          err=>{
              this.toastr.error( 'error', '',{
              timeOut: 3000, positionClass: 'toast-top-center',
            });
            console.log(err);
          }
        );
        this.cargarDirecciones();
  }

  eliminarDireccion(id: number){
    if(this.direccionSeleccionada.principal){
      this.toastr.error( 'No puedes eliminar la direccion principal', '',{
        timeOut: 3000, positionClass: 'toast-top-center',
      });

    }
    else{
    this.clienteService.eliminarDireccion(id).subscribe(
      data=> {
        this.toastr.success('Dirreccion elimanda con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
          this.cargarDirecciones();
          if(this.cantDir == 0 ){
            this.router.navigate(['/clienteRestaurante']);
          }             
        },
        err=>{
            this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          console.log(err);
        }
      );
      this.cargarDirecciones();
  }
}
}