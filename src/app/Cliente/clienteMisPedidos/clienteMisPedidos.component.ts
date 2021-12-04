import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Reclamo } from 'src/app/models/Reclamo/Reclamo';
import { ClienteService } from 'src/app/service/Cliente/cliente.service';
import { TokenService } from 'src/app/service/token.service';
import { Pedido } from '../../models/Pedido/Pedido';
import { PedidoDetalle } from '../../models/Pedido/PedidoDetalle';
import { equal } from 'assert';
import { PedidoConReclamos } from '../../models/Pedido/PedidoConReclamos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-clienteMisPedidos',
  templateUrl: './clienteMisPedidos.component.html',
  styleUrls: ['./clienteMisPedidos.component.css']
})
export class ClienteMisPedidosComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private toastr : ToastrService
  ) { }

  email: string;
  pedidos: Observable<PedidoConReclamos[]>;
  ped: PedidoConReclamos[] = [];
  pago: string;
  filtro: string;
  seleccionado: string = "";
  capturado: string;
  comentario: string = "";
  reclamo: Reclamo;
  idPedidoSeleccionado: number;
  pendientes: PedidoConReclamos[] = [];
  pedFiltro: PedidoConReclamos[] = [];
  textoBusqueda: string = '';
  pedidoBusequeda: PedidoConReclamos[] = [];
  estado: string = '';
  busqueda: boolean = false;
  pedB: PedidoConReclamos[] = [];
  fecha: string = '';
  pedOrder: PedidoConReclamos[]=[];
  id: string = '';
  precio: string = '';
  
   


  ngOnInit() {
    this.cargarPedidos();
    this.filtro = 'none';
    this.seleccionado = "Compensacion";     
 
    
  }

  cargarPedidos() {
    this.email = this.tokenService.getUsername();
    this.clienteService.getPedidos(this.email).subscribe(
      data => {
        this.ped = data;
        this.pedFiltro = data;  
        this.pedidos = of(this.ped);        
      },
      err => {
        console.log(err);
      }
    );
  }

  setFiltro(filtro: string){
    this.filtro = filtro;
    this.pedFiltro = [];
    if(filtro === 'Confirmado'){
      for(let i in this.ped){
        if(this.ped[i].estado === 'Confirmado'){
          this.pedFiltro.push(this.ped[i]);   
        }  
      }
      this.pedidos = of(this.pedFiltro);
    }
    if(filtro === 'Pendiente'){
      for(let i in this.ped){
        if(this.ped[i].estado === 'Pendiente'){
          this.pedFiltro.push(this.ped[i]);   
        }  
      }
      this.pedidos = of(this.pedFiltro);
    }
    if(filtro === 'Rechazado'){
      for(let i in this.ped){
        if(this.ped[i].estado === 'Rechazado'){
          this.pedFiltro.push(this.ped[i]);   
        }  
      }
      this.pedidos = of(this.pedFiltro);
      
    }if(filtro === 'none'){
      for(let i in this.ped){
        this.pedFiltro.push(this.ped[i]);   
      }   
      this.pedidos = of(this.ped);
      }  
}



  realizarReclamo(){
    console.log(this.seleccionado);
    this.reclamo = new Reclamo(0,this.idPedidoSeleccionado,"",this.seleccionado,this.comentario,null,null);  
    this.clienteService.realizarReclamo(this.reclamo).subscribe(
      data=> {
        this.toastr.success('Reclamo enviado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarPedidos()
        this.comentario = '';
        },
        err=>{
          //this.errMsj = err.error;
         this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
         console.log(err);
        }
      );
    }

    seleccionPedido(pedido: Pedido){
      this.idPedidoSeleccionado = pedido.idPedido;
    }


  onKey(event: any) {
    this.pedidos = of(this.pedFiltro);
    this.pedidoBusequeda = [];
    this.pedidos.subscribe(
      data => {
        this.pedB = data;           
      }
    );
    this.textoBusqueda = event.target.value;
    this.textoBusqueda = this.textoBusqueda.toLocaleLowerCase();
    
    for(let i in this.pedB){
      this.estado = String(this.pedB[i].estado).toLocaleLowerCase();
      this.fecha = String(this.pedB[i].fecha).toLocaleLowerCase();
      this.id = String(this.pedB[i].idPedido).toLocaleLowerCase();
      this.precio = String(this.pedB[i].precioTotal).toLocaleLowerCase();
      if((this.estado.search(this.textoBusqueda) != -1) || ( this.fecha.search(this.textoBusqueda) != -1  )  || ( this.id.search(this.textoBusqueda) != -1  )|| ( this.precio.search(this.textoBusqueda) != -1  )){
        this.pedidoBusequeda.push(this.pedB[i]);
        this.busqueda = true;

      }  
    }
    if(this.busqueda){
    this.pedidos = of(this.pedidoBusequeda);
  }else{
    this.pedidos = of(this.pedFiltro);
  }
  }

  ordenarAsc(){
    this.pedidos.subscribe(
      data => {
        this.pedOrder = data;           
      }
    );
    this.pedOrder.sort(function (a, b) {
      if (a.idPedido > b.idPedido) {
        return 1;
      }
      if (a.idPedido < b.idPedido) {
        return -1;
      }   
      return 0;
    });

    this.pedidos = of(this.pedOrder);
  }

  ordenarDesc(){
    this.pedidos.subscribe(
      data => {
        this.pedOrder = data;           
      }
    );
    this.pedOrder.sort(function (a, b) {
      if (a.idPedido < b.idPedido) {
        return 1;
      }
      if (a.idPedido > b.idPedido) {
        return -1;
      }   
      return 0;
    });

    this.pedidos = of(this.pedOrder);
  }



}
