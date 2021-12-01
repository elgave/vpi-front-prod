import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente/Cliente';
import { ClienteService } from 'src/app/service/Cliente/cliente.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-mi-perfil',
  templateUrl: './cliente-mi-perfil.component.html',
  styleUrls: ['./cliente-mi-perfil.component.css']
})
export class ClienteMiPerfilComponent implements OnInit {

  miCalificacion: number = 0.0;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  constructor(
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.obtenerMisDatos(this.tokenService.getUsername());
    this.obtenerMiCalificacion();
  }

  obtenerMiCalificacion(){
    this.clienteService.obtenerMiCalificacion(this.tokenService.getUsername()).subscribe(
      data=>{
        this.miCalificacion = data;
      }
    )
  }
  obtenerMisDatos(email : string){

    this.clienteService.obtenerMisDatos(email).subscribe(data =>{
      this.email = email;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.telefono = data.celular;
        
    });
  }


  eliminarMiCuenta(){

    this.clienteService.eliminarMiCuenta(this.tokenService.getUsername()).subscribe(
      data=>{
        this.tokenService.logOut();
        this.router.navigate(['/login']);
      }
    )

  }

}
