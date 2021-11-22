import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/service/Cliente/cliente.service';
import { Restaurante } from '../../models/Restaurante/Restaurante';
import { Item } from '../../models/Cliente/Item';
import { TokenService } from '../../service/token.service';
import { Direccion } from '../../models/Cliente/Direccion';
import { Pedido } from '../../models/Pedido/Pedido';
import { Email } from '../../models/usuario/email';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clientePedidoResumen',
  templateUrl: './clientePedidoResumen.component.html',
  styleUrls: ['./clientePedidoResumen.component.css']
})
export class ClientePedidoResumenComponent implements OnInit {

  s3Url: string = environment.s3url;
  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private toastr : ToastrService
  ) { }
  nombreRestaurante: string;
  restaurante : Restaurante;
  precioEnvio : number = 0;
  itemArray : Item[]= [];
  costoMenus : number = 0;
  costoTotal : number = 0;
  direcciones : Direccion[] = [];
  direccionPrincipal: Direccion;
  direccion: string;
  seleccionado: string;
  pagoOnline: boolean;
  pedido: Pedido;
  idPedido: number;
  email: string;
  pagoAcreditado: boolean;
  comentario: string;
  fotoRestaurante: string;


  ngOnInit() {

    this.cargarDatosRest();
    this.getDirecciones();
    this.pagoOnline = false;
    this.seleccionado = '1';
    this.pagoAcreditado = false;
    
  }
  
  cargarDatosRest() {
    this.cargarItem();
    this.nombreRestaurante = this.activatedRoute.snapshot.params.nombreRestaurante;
    this.clienteService.getDatosRestaurante(this.nombreRestaurante).subscribe(
      data => {
        this.restaurante = data;
        this.precioEnvio = this.restaurante.precioEnvio;
        this.fotoRestaurante = this.restaurante.foto;
        var cm = 0;
    for(let i in this.itemArray){
      cm = this.itemArray[i].precio;
      this.costoMenus += cm;
    }
    this.costoTotal = this.costoMenus+this.precioEnvio;
       console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarItem(){
   var array = localStorage.getItem('Items');
   this.itemArray = JSON.parse(array);
   console.log("Items: "+this.itemArray);
  }
  
  calcularCosto(){
    var cm = 0;
    for(let i in this.itemArray){
      cm = this.itemArray[i].precio;
      this.costoMenus += cm;
    }
      this.costoTotal = this.costoMenus+this.precioEnvio;
    console.log("costoTotal" + this.costoTotal);
  }
  
  getDirecciones(){

    this.email = this.tokenService.getUsername();

    this.clienteService.getDirecciones(this.email).subscribe(
      data => {
        this.direcciones = data;

        for(let i in this.direcciones){
          if(this.direcciones[i].principal)
          this.direccionPrincipal = this.direcciones[i];
        }
        this.concatDireccion();
      console.log("Direcciones: "+data);
      },
      err => {
        console.log(err);
      }
    );
  }

  concatDireccion(){
    this.direccion = this.direccionPrincipal.calle.concat(' ', this.direccionPrincipal.numero);
    if(this.direccionPrincipal.apto!=null){
      this.direccion = this.direccion.concat(' , Apto :',this.direccionPrincipal.apto).
      concat('(',this.direccionPrincipal.barrio,')' )
    }
    else{
      this.direccion = this.direccion.concat('(',this.direccionPrincipal.barrio,')' )

    }
       

  }
  cambiarDireccion(direccion: Direccion){
    this.direccionPrincipal = direccion;
    this.concatDireccion();
  }

  seleccionar() {
    if (this.seleccionado === '2')
      this.pagoOnline = true;
      else
      this.pagoOnline = false;
  }

  confirmarPedido(){
    this.pedido = new Pedido(this.idPedido, this.email, this.restaurante.email, this.pagoOnline, this.pagoAcreditado,
    this.comentario, this.costoTotal, this.itemArray, this.direccion);
          
      this.clienteService.altaPedido(this.pedido).subscribe(
      data=> {
        this.toastr.success('Pedido creado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
         // localStorage.setItem('idResturante', this.email)  
          this.router.navigate(['/misPedidos']);
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
  }