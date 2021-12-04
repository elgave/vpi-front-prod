import { Component, OnInit } from '@angular/core';
import { PedidoDetalle } from 'src/app/models/Pedido/PedidoDetalle';
import { RestauranteService } from 'src/app/service/Restaurante/restaurante.service';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';
import { Calificacion } from 'src/app/models/Cliente/Calificacion';

@Component({
  selector: 'app-restauranteHistoricoPedidos',
  templateUrl: './restauranteHistoricoPedidos.component.html',
  styleUrls: ['./restauranteHistoricoPedidos.component.css']
})
export class RestauranteHistoricoPedidosComponent implements OnInit {

  isCliente = false;
  isLogged = false;
  email = ''; 
  pedidos: PedidoDetalle[] = [];
  filtro: string;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  calificacion : Calificacion;
  micalificacion: number = 0;
  idCliente: string;
  pedFiltro: PedidoDetalle[] = [];
  ped: PedidoDetalle[] = [];



  constructor(
    private tokenService: TokenService,
    private restauranteService: RestauranteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.email = this.tokenService.getUsername();
    }else{
      this.isLogged = false;
      this.email = '';
    }

    this.cargarPedidos();
    this.filtro = 'none'
  }

  cargarPedidos() {
    this.email = this.tokenService.getUsername();
    this.restauranteService.getPedidosSinPendientes(this.email).subscribe(
      data => {
        this.pedidos = data;
        this.ped = data;
        
      },
      err => {
        console.log(err);
      }
    );
  }

  ingresarPagoEnEfectivo(pedidoID: number){
    this.restauranteService.registrarPago(pedidoID).subscribe(
      data=> {
        this.toastr.success('Pago ingresado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
        this.cargarPedidos();
        },
        err=>{
         this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
         console.log(err);
        }
      );
    }

    calificarCliente(cliente: string){
      console.log('ejecuta calificarCliente')
      this.idCliente = cliente;
      this.calificacion = new Calificacion(this.tokenService.getUsername(),this.idCliente ,false,0);
      this.restauranteService.obtenerCalificacionCliente(this.calificacion).subscribe(
        data=>{
          this.micalificacion = data;
          
          if(this.micalificacion > 0){
            this.hoverState = this.micalificacion;
            this.rating = this.micalificacion;
          }
        }
      )
    }
    
    setFiltro(filtro: any){
      this.cargarPedidos;
      this.filtro = filtro;
      this.pedFiltro = [];
      if(filtro === 'Acreditado'){
        for(let i in this.ped){
          if(this.ped[i].pagoAcreditado ){
            this.pedFiltro.push(this.ped[i]);   
          }  
        }
        this.pedidos = this.pedFiltro;

      }
      if(filtro === 'Pendiente'){
        for(let i in this.ped){
          if(!this.ped[i].pagoAcreditado){
            this.pedFiltro.push(this.ped[i]);   
          }  
        }
        this.pedidos = this.pedFiltro;
      }
      if(filtro === 'none'){
        for(let i in this.ped){
          this.pedFiltro.push(this.ped[i]);   
        }
      this.pedidos = this.pedFiltro;
      }
      if(filtro === 'Confirmado'){
        for(let i in this.ped){
          if(this.ped[i].estado === 'Confirmado'){
            this.pedFiltro.push(this.ped[i]);   
          }  
        }
        this.pedidos = this.pedFiltro;
      }
      if(filtro === 'Rechazado'){
        for(let i in this.ped){
          if(this.ped[i].estado === 'Rechazado'){
            this.pedFiltro.push(this.ped[i]);   
          }  
        }
        this.pedidos = this.pedFiltro;
      }
    }
  
    getFiltro(){
      console.log('get' + this.filtro)
      return this.filtro;
    }

    enter(i) {
      this.hoverState = i;
    }
  
    leave() {
      this.hoverState = 0;
    }

  updateRating(i) {
    this.rating = i;
    this.calificacion = new Calificacion(this.tokenService.getUsername(),this.idCliente ,false,this.rating);
    console.log(this.calificacion);
    this.restauranteService.calificarCliente(this.calificacion).subscribe(
      data=>{
        this.toastr.success('Gracias por su calificacion', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.micalificacion = this.rating;
      }
    )
    console.log(this.rating);
  }

  eliminarCalificacion(){

    this.calificacion = new Calificacion(this.tokenService.getUsername(),this.idCliente,false,0);

    this.restauranteService.eliminarCalificacion(this.calificacion).subscribe(
      data=>{

        this.toastr.success('Calificacion eliminada con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.micalificacion = 0;
        this.hoverState = 0;
        this.rating = 0;

      }
    )

  }

  ordenarAsc(){
    this.pedidos.sort(function (a, b) {
    if (a.idPedido > b.idPedido) {
      return 1;
    }
    if (a.idPedido < b.idPedido) {
      return -1;
    }   
      return 0;
    });
  }

  ordenarDesc(){
    this.pedidos.sort(function (a, b) {
    if (a.idPedido < b.idPedido) {
      return 1;
    }
    if (a.idPedido > b.idPedido) {
      return -1;
    }   
    return 0;
    });
   }

}
