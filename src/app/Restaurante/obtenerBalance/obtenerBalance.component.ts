import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { RestauranteService } from '../../service/Restaurante/restaurante.service';
import { BalanceDto } from '../../models/Restaurante/BalanceDto';
import { PedidoConReclamos } from '../../models/Pedido/PedidoConReclamos';
import { Email } from '../../models/usuario/email';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-obtenerBalance',
  templateUrl: './obtenerBalance.component.html',
  styleUrls: ['./obtenerBalance.component.css']
})
export class ObtenerBalanceComponent implements OnInit {

  ver: number = 1
  constructor(
    private restauranteService: RestauranteService,
    private tokenService : TokenService,
    ) {
    
}
  fecha1: Date = null;
  fecha2: Date = null;  
  opcionSeleccionada: string;
  opcion: string = '';
  fechaSelec1: Date;
  fechaSelec2: Date;

  dto: BalanceDto;
  pedidos: PedidoConReclamos[] = [];
  email: string;
  tipoDeVenta: string = "";
  

  minDate = new Date(2021, 9, 1);
  maxDate = new Date(2022,0,1);
  //startDate = new Date(2021, 10, 11);
  ready: boolean = false;
  totalVentas: number = 0;
  totalDev: number = 0;
  total: number = 0;

  ngOnInit() {
    this.opcionSeleccionada = "0" 
    this.tipoDeVenta = "Todo";
    this.cargarBalance();
  }

  buscar(){
    this.fecha1 = this.fechaSelec1;
    this.fecha2 = this.fechaSelec2;
    this.cargarBalance();

  }

  seleccionarOpcion() {
    if(this.opcionSeleccionada !== '0'){
    this.tipoDeVenta = this.opcionSeleccionada;
    }
    this.cargarBalance(); 
  }

  cargarBalance() {
    
    this.email = this.tokenService.getUsername();
    this.dto = new BalanceDto(this.email,this.tipoDeVenta,this.fecha1,this.fecha2)
    this.restauranteService.getBalance(this.dto).subscribe(
      data => {
        this.pedidos = data;
        this.ready = true;
        this.cargarTotales();
        
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarTotales(){
  
    this.totalVentas = 0;
    this.totalDev = 0;
    this.total = 0;
    for(let i in this.pedidos){
      this.totalVentas = this.totalVentas + this.pedidos[i].precioTotal;
      if(this.pedidos[i].reclamos.length > 0){
        if(this.pedidos[i].reclamos[0].estado === 'Reembolsado'){
          this.totalDev = this.totalDev + this.pedidos[i].precioTotal;
        }  
      }
   
    }
    
    this.total = this.totalVentas - this.totalDev;

  }

  

}
