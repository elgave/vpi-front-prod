import { Component, OnInit } from '@angular/core';
import { Agregado } from '../../models/Restaurante/Agregado';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../service/token.service';
import { RestauranteService } from '../../service/Restaurante/restaurante.service';
import { Menu } from 'src/app/models/Restaurante/Menu';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restauranteMenusYPromociones',
  templateUrl: './restauranteMenusYPromociones.component.html',
  styleUrls: ['./restauranteMenusYPromociones.component.css']
})
export class RestauranteMenusYPromocionesComponent implements OnInit {

  nombre: string;
  precio: number;
  agregado: Agregado;
  idRestaurante: string;
  idAgregado: number;
  errMsj: any;
  menusYPromos: Menu[] = [];
  promos: Menu[] = [];
  menus: Menu[] = [];
  s3Url: string = environment.s3url;
  agregados: Agregado[]= [];
  agregadoSeleccionado: Agregado;
  abrirModal: boolean = false;
  costo: number;
  menuSeleccionado: Menu;
  abrirModalMenu: boolean = false;

  constructor(
    private tokenService: TokenService,
    private restauranteService: RestauranteService,
    private toastr: ToastrService,
    private router: Router, 
  ) { }

  ngOnInit() {
    this.cargarMenus();
    this.cargarAgregados();
  }

  altaAgregado(){
    this.idRestaurante = this.tokenService.getUsername();
    this.agregado = new Agregado(this.idRestaurante, this.idAgregado, this.nombre, this.precio);
    this.restauranteService.crearAgregado(this.agregado).subscribe(
      data=> {
      this.toastr.success('Agregado creado con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      console.log(data);
      this.limpiarForm(); 
      this.cargarAgregados();       
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

  limpiarForm(){
    this.nombre = '';
    this.precio = 0;
  }

  cargarMenus() {
    this.promos = [];
    this.menus = [];
    this.idRestaurante = this.tokenService.getUsername();
    this.restauranteService.getMenus(this.idRestaurante).subscribe(
      data => {
        this.menusYPromos = data;
  
        for(let i in this.menusYPromos){
          if(this.menusYPromos[i].promocion)
            this.promos.push(this.menusYPromos[i]);   
        }
  
        for(let i in this.menusYPromos){
          if(!this.menusYPromos[i].promocion)
            this.menus.push(this.menusYPromos[i]);   
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarAgregados() {
    this.idRestaurante = this.tokenService.getUsername();
    this.restauranteService.getAgregados(this.idRestaurante).subscribe(
      data => {
        this.agregados = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  
  seleccionar(agre: Agregado){
    this.agregadoSeleccionado = agre;
    this.abrirModal = true;
  
  }
  
  modificarAgregado(id: number){
    if(this.costo === undefined ){
      this.toastr.error( 'Debes ingresar el costo', '',{
        timeOut: 3000, positionClass: 'toast-top-center',
      });

    }
    else{
    this.agregado = new Agregado(null,id,null,this.costo)
    this.restauranteService.modificarAgregado(this.agregado).subscribe(
      data=> {
      this.toastr.success('Agregado modificado con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      console.log(data);
      this.costo = undefined;
      this.cargarAgregados();        
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
  }

  eliminarAgregado(id: number){
    this.restauranteService.eliminarAgregado(id).subscribe(
      data=> {
      this.toastr.success('Agregado eliminado con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarAgregados();        
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

  seleccionarMenu(menu: Menu){
    this.menuSeleccionado = menu;
    this.abrirModalMenu = true;
  
  }

  eliminarMenu(id: number){

  this.restauranteService.eliminarMenu(id).subscribe(
    data=> {
    this.toastr.success('Menu/promo eliminado con exito', '',{
      timeOut: 3000, positionClass: 'toast-top-center'
    });
    this.cargarMenus();        
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

  modificarMenu(menu: Menu){
    this.menuSeleccionado = menu;
    localStorage.setItem('Menu', JSON.stringify(this.menuSeleccionado)) 
    this.router.navigate(['/modificarMenu']);  
  
  }
  

}
