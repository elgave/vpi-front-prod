import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { Restaurante } from 'src/app/models/Restaurante/Restaurante';
import { RestauranteService } from '../service/Restaurante/restaurante.service';
import { AbrirCerrar } from '../models/Restaurante/AbrirCerrar';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../service/Cliente/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  s3Url: string = environment.s3url;
  
  fotostring: string;
  isLogged = false;
  isCliente = false;
  roles : string[];
  abierto : boolean;
  email : string;
  abrirCerrar: AbrirCerrar;
  miCalificacion: number = 0.0;
  

  foto: string;

  constructor(
    private tokenService: TokenService,
    private restauranteService: RestauranteService,
    private toastr : ToastrService,
    private clienteService: ClienteService,
    private router : Router

    ) { }

  ngOnInit() {
    
    
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }

   this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( rol=>{
      if(rol === 'Cliente'){
        this.isCliente = true; 
      }
    })

    if(!this.isCliente){
      this.isAbierto();
      2
    }
    this.obtenerFoto(this.tokenService.getUsername())
    
  }
  obtenerMiCalificacion(){
    this.restauranteService.obtenerMiCalificacion(this.tokenService.getUsername()).subscribe(
      data=>{
        this.miCalificacion = data;
      }
    )
  }

  onLogOut(): void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
    
  }

  isAbierto(){
    this.email = this.tokenService.getUsername();
    this.restauranteService.idAbierto(this.email).subscribe(
      data => {
        this.abierto = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  abrirLocal(){
    this.abierto = true;
    this.abrirCerrar = new AbrirCerrar(this.email, this.abierto);
          
    this.restauranteService.abrirCerrarRest(this.abrirCerrar).subscribe(
      data=> {
        
        this.toastr.success('Local abierto', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
            
        },
        err=>{
          this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
         console.log(err);
        }
      );
    }

  

  cerrarLocal(){
    this.abierto = false;
    this.abrirCerrar = new AbrirCerrar(this.email, this.abierto);
          
    this.restauranteService.abrirCerrarRest(this.abrirCerrar).subscribe(
      data=> {
       
        this.toastr.success('Local cerrado', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
           
        },
        err=>{
            this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
         console.log(err);
        }
      );
    }

    obtenerFoto(email : string){

      if(this.isCliente){
      this.clienteService.obtenerMisDatos(email).subscribe(data =>{
        this.fotostring = data.foto
          
      });
    }else{
      this.restauranteService.obtenerMisDatos(email).subscribe(data =>{
        this.fotostring = data.foto
          
      });
    }
  
    }

    

  

  

}
