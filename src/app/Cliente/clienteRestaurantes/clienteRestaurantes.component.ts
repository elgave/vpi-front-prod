import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Restaurante } from 'src/app/models/Restaurante/Restaurante';
import { RestauranteService } from 'src/app/service/Restaurante/restaurante.service';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../../service/Cliente/cliente.service';
import { TopRest } from '../../models/Cliente/TopRest';

@Component({
  selector: 'app-clienteRestaurantes',
  templateUrl: './clienteRestaurantes.component.html',
  styleUrls: ['./clienteRestaurantes.component.css']
})
export class ClienteRestaurantesComponent implements OnInit {

  s3Url: string = environment.s3url;

  restaurantes: Observable<Restaurante[]>;
  restaurantess: Observable<Restaurante[]> = of();;

  email: string;
  cantDir: number;
  filtro: string = 'none';
  ress: Restaurante[] = [];
  resFiltro: Restaurante[] = [];
  restBusequeda: Restaurante[] = [];
  resB: Restaurante[] = [];
  textoBusqueda: string = '';
  nombre: string = '';
  descMenus: string = '';
  busqueda: boolean = false;
  sinPromos: boolean;
  resF: Restaurante[] = [];
  resP: Restaurante[] = [];
  resT: TopRest [] = [];
  resTop: TopRest [] = [];
  resOrder: Restaurante[] = [];




  constructor(
    private clienteService: ClienteService, 
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private tokenService : TokenService,
    ) { }

  ngOnInit() {

    this.cantDirecciones();
    this.cargarRestaurantes();
    this.cargarRestaurantesFavoritos();
    this.cargarRestaurantesConPromo();
    this.cargarTop();

   // this.filtro = 'none';
    
  }


  cargarRestaurantes() {
    this.clienteService.getAllRestaurantes().subscribe(
      data => {
        this.ress = data;
        this.resFiltro = data;
        this.restaurantes = of(data);  

        console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }

  setFiltro(filtro: string){
    this.filtro = filtro;
     this.resFiltro = [];
    if(filtro === 'Promociones'){
      this.resFiltro = this.resP;
       this.restaurantess = of(this.resFiltro);
      
    }
    if(filtro === 'EnvioGratis'){
      for(let i in this.ress){
        if(this.ress[i].precioEnvio == 0){
          this.resFiltro.push(this.ress[i]);   
        }  
      }
      console.log(this.resFiltro);
      this.restaurantess = of(this.resFiltro);
    }
    if(filtro === 'none'){
      for(let i in this.ress){
        this.resFiltro.push(this.ress[i]);   
      }   
      this.restaurantess = of(this.ress);
      }
      if(filtro === 'Favoritos'){
       this.resFiltro = this.resF;
       this.restaurantess = of(this.resFiltro);
      
        }
     this.restaurantes = this.restaurantess;
  
}

  menus(nombreRest: string):void{
    this.router.navigate(['/clienteRestaurante/',nombreRest]);
  }

  cantDirecciones(){
    this.email = this.tokenService.getUsername();
    this.clienteService.getCantDirecciones(this.email).subscribe(
        data => {
          this.cantDir = data;
          if(this.cantDir==0){
            this.router.navigate(['/misDirecciones']);
          }
            
        },
        err => {
          console.log(err);
        }
      );
     

    }

   onKey(event: any) {
    this.restaurantess = of(this.resFiltro);
    this.restBusequeda = [];
    this.restaurantess.subscribe(
        data => {
          this.resB = data;           
        }
      );
      this.textoBusqueda = event.target.value;
      this.textoBusqueda = this.textoBusqueda.toLocaleLowerCase();
    
    for(let i in this.resB){
      this.nombre = String(this.resB[i].nombreRestaurante).toLocaleLowerCase();
      this.descMenus = String(this.resB[i].descripcionMenues).toLocaleLowerCase();
      if((this.nombre.search(this.textoBusqueda) != -1) || ( this.descMenus.search(this.textoBusqueda) != -1 ) ){
        this.restBusequeda.push(this.resB[i]);
        this.busqueda = true;

      }  
    }
    if(this.busqueda){
      this.restaurantess = of(this.restBusequeda);
    }else{
      this.restaurantess = of(this.resFiltro);
    }

     this.restaurantes = this.restaurantess;
  }

  cargarRestaurantesFavoritos() {
    this.email = this.tokenService.getUsername();    
    this.clienteService.restFavoritos(this.email).subscribe(
      data => {       
        this.resF = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarRestaurantesConPromo() {
    this.clienteService.getRestConPromos().subscribe(
      data => {
        this.resP = data;
    },
      err => {
        console.log(err);
      }
    );
  }

  cargarTop() {
    this.clienteService.getTop().subscribe(
      data => {
        this.resTop = data;
        this.ordenarTop();
        
      },
      err => {
        console.log(err);
      }
    );
  }

 

  ordenarTop(){
    this.resTop.sort(function (a, b) {
      if (a.cantidadVentas < b.cantidadVentas) {
        return 1;
      }
      if (a.cantidadVentas > b.cantidadVentas) {
        return -1;
      }   
      return 0;
    });
  }
  
  ordenarRestAsc(){
    this.restaurantes.subscribe(
      data => {
        this.resOrder = data;           
      }
    );
    this.resOrder.sort(function (a, b) {
      if (a.nombreRestaurante < b.nombreRestaurante) {
        return 1;
      }
      if (a.nombreRestaurante > b.nombreRestaurante) {
        return -1;
      }   
      return 0;
    });

    this.restaurantes = of(this.resOrder);
  }

  ordenarRestDesc(){
    this.restaurantes.subscribe(
      data => {
        this.resOrder = data;           
      }
    );
    this.resOrder.sort(function (a, b) {
      if (a.nombreRestaurante > b.nombreRestaurante) {
        return 1;
      }
      if (a.nombreRestaurante < b.nombreRestaurante) {
        return -1;
      }   
      return 0;
    });

    this.restaurantes = of(this.resOrder);
  }



}
