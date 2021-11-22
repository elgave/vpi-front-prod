import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../../models/Restaurante/Menu';
import { ClienteService } from '../../../service/Cliente/cliente.service';
import { Agregado } from '../../../models/Restaurante/Agregado';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/models/Cliente/Item';
import { TokenService } from '../../../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { Favorito } from '../../../models/Cliente/Favorito';
import { Restaurante } from '../../../models/Restaurante/Restaurante';
import { environment } from 'src/environments/environment';
import { Calificacion } from 'src/app/models/Cliente/Calificacion';
import { Direccion } from 'src/app/models/Cliente/Direccion';
import { Pedido } from 'src/app/models/Pedido/Pedido';
import { MenuCategoria } from '../../../models/Cliente/MenuCategoria';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { throwToolbarMixedModesError } from '@angular/material';

@Component({
  selector: 'app-MenusRestaurante',
  templateUrl: './MenusRestaurante.component.html',
  styleUrls: ['./MenusRestaurante.component.scss']
})
export class MenusRestauranteComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;

  s3Url: string = environment.s3url;
  nombreRestaurante: string;
  menus: Menu[];
  idMenu: number;
  nombre: string;
  costoMenu: number;
  cantidad: number;
  cantModal: number;
  costoSinCantidad: number;
  agregados: Agregado[];
  agregado: Agregado; 
  agregadoSeleccinado: number;
  costoAgregdo: number;
  totalAgregdo: number = 0;
  indexAgregado: number;
  isAgregado: boolean;
  form: FormGroup;
  checkArray: FormArray = new FormArray([]);
  item: Item ;
  itemArray: Item[]=[];
  nombreItem: string = '';
  nombre1: string = '';
  nombreAgregado: string;
  costoAgregados: number;
  costoTotal: number;
  CostoAgregadosCantidad: number;
  sinItems: boolean;
  isFavorito: boolean = false;
  favorito: Favorito;
  idRestaurante: string = '';
  idCliente: string = '';
  restaurante: Restaurante;
  title = "star-angular";
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  fotoMenu: string;
  calificacion : Calificacion;
  puedeCalificarVar: boolean = false;
  micalificacion: number = 0;
  hayAgragados: boolean = false;
  costoMenus : number = 0;
  totalPedido: number = 0;
  totalConEnvio: number = 0;
  direcciones : Direccion[] = [];
  direccionPrincipal: Direccion;
  direccion: string;
  email: string;
  pagoSeleccionado: string;
  pagoAcreditado: boolean;
  pagoOnline: boolean;
  pedido: Pedido;
  comentario: string;
  mc: MenuCategoria;
  categoria: string= '';
  categoriaSeleccionada: string = '';
  textoBusqueda: string = '';
  nombreMenu: string = '';
  descMenu: string = '';
  menusBusqueda: Menu[] = [];
  busqueda: boolean = false;
  menusCat: Menu[] = [];
  menusB: Menu[] = [];
  urlTweet: String;
  caliRest: number = 0;
  
  
  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tokenService: TokenService,
  ) { 
    
}
  ngOnInit(){
   
    this.cargarMenus();
    this.costoAgregdo=0;
    this.cantModal=1;
    this.isAgregado=false;
    this.form = this.fb.group({
    checkArray: this.fb.array([])
    })

    this.costoAgregados = 0;
    this.CostoAgregadosCantidad = 0;
    this.cantidad = 1;
    this.sinItems = true;
    this.cargarDatosRest();

    this.email = this.tokenService.getUsername();
    this.pagoSeleccionado = '1';
    this.pagoAcreditado = false;
    this.pagoOnline = false;
    this.getDirecciones();
    this.categoriaSeleccionada = "0" 
   
}


  enter(i) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i) {
    this.rating = i;
    this.calificacion = new Calificacion(this.restaurante.email,this.tokenService.getUsername(),true,this.rating);
    console.log(this.calificacion);
    this.clienteService.calificarRestaurante(this.calificacion).subscribe(
      data=>{
        this.toastr.success('Gracias por su calificacion', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.micalificacion = this.rating;
        this.obtenerCalificacionRest();
      }
    )
    console.log(this.rating);
  }

cargarMenus(): void {
  this.nombreRestaurante = this.activatedRoute.snapshot.params.idRestaurante;
  this.clienteService.getMenusRestaurante(this.nombreRestaurante).subscribe(
    data => {
      this.menus = data;
      this.menusCat = this.menus;
  },
    err => {
      console.log(err);
    }
  );
}

seleccionado(idMenu: number,nombre: string, costo:number, descuento:number,fotoMenu:string):void{
  this.limpiarForm();
  this.fotoMenu = fotoMenu; 
  this.idMenu = idMenu;
  this.nombre = nombre;
  this.costoSinCantidad = costo-(costo*descuento)/100;
  this.costoMenu = this.costoSinCantidad;
  this.costoTotal = this.costoMenu;
  this.cargarAgregados();
  this.sinItems = true;

}

Oncantidad(){
  this.cantidad = this.cantModal;
  this.costoMenu = this.costoSinCantidad*this.cantidad;
  this.CostoAgregadosCantidad = this.costoAgregados*this.cantidad;
  this.costoTotal = this.costoMenu+this.CostoAgregadosCantidad;
}

cargarAgregados(): void {
  this.clienteService.getAgrados(this.idMenu).subscribe(
    data => {
      this.agregados = data;
      if(this.agregados.length>0){
        this.hayAgragados = true;

      }
    },
    err => {
      console.log(err);
    }
  );
}


  


OnClose(){
  this.costoAgregdo=0;
  this.cantModal=1;
  this.limpiarForm(); 
}



onCheckboxChange(e) {
    this.checkArray = this.form.get('checkArray') as FormArray;

  if (e.target.checked) {
    this.checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    this.checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        this.checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
  
}


submitForm() {
 
 this.costoAgregados = 0;
 this.nombreItem = '';
 this.costoTotal = this.costoMenu;
  this.checkArray.controls.forEach((item: FormControl) => { 
     var ca=0;
   
    this.nombreItem = this.nombreItem.concat(String(item.value),', ');
    this.nombreAgregado = String(item.value); 
   //buscar en Agregado por nombre
    for(let i in this.agregados){
      if(this.nombreAgregado==this.agregados[i].nombre)
      ca = this.agregados[i].costo;
     
      
  }
    this.costoAgregados += ca;
    this.CostoAgregadosCantidad = this.costoAgregados*this.cantidad;
    
  
    });
    this.costoTotal += this.CostoAgregadosCantidad;
  
}


limpiarForm(){
  let i: number = 0;
  this.checkArray.controls.forEach((item: FormControl) => {
   
     this.checkArray.removeAt(i);
  
    });
    this.CostoAgregadosCantidad = 0; 
    this.costoAgregados = 0;
    this.costoTotal = 0;
    this.nombreItem ='';
    this.cantidad = 1;
  }

  agregarItemAPedido(){
    var nombrePedido;
    if(this.nombreItem==''){
      nombrePedido = this.nombre;
    }else{
      nombrePedido = this.nombre.concat('/Extras: ',this.nombreItem);
    }
    this.item = new Item(this.cantidad, nombrePedido, this.costoTotal);
    this.itemArray.push(this.item);
    this.sinItems = false;
    this.calcularCosto();
  }
  

  agregarFavorito(){
    this.cargarDatosRest();
    this.idCliente = this.tokenService.getUsername();
    this.favorito = new Favorito(this.idCliente, this.restaurante.email)      
      this.clienteService.agregarFavorito(this.favorito).subscribe(
        data=> {
          this.toastr.success('Favorito agregado con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.isFavorito = true;
          },
          err=>{
            this.toastr.error( 'error', '',{
              timeOut: 3000, positionClass: 'toast-top-center',
            });
           console.log(err);
          }
        );
      }

  cargarDatosRest() {
      this.clienteService.getDatosRestaurante(this.nombreRestaurante).subscribe(
      data => {
        this.restaurante = data;
        this.buscarFavorito();
        this.puedeCalificar();
        this.obtenerCalificacionRest()
      },
      err => {
        console.log(err);
      }
    );
  }

  buscarFavorito(){
    this.idCliente = this.tokenService.getUsername();
    this.favorito = new Favorito(this.idCliente, this.restaurante.email) 
    this.clienteService.postIsFavorito(this.favorito).subscribe(
      data=> {
        this.isFavorito = data;
        },
        err=>{
          console.log(err);
        }
      );
    }

  puedeCalificar(){
    this.idCliente = this.tokenService.getUsername();
    
    this.calificacion = new Calificacion(this.restaurante.email,this.idCliente,true,0);
    
    this.clienteService.puedeCalificar(this.calificacion).subscribe(
      data=>{
        this.puedeCalificarVar = data
        if(this.puedeCalificarVar){
            this.clienteService.obtenerCalificacionRestaurante(this.calificacion).subscribe(
              data=>{
                this.micalificacion = data;
                
                if(this.micalificacion > 0){
                  this.hoverState = this.micalificacion;
                  this.rating = this.micalificacion;
                }
              }
            )
        }
      }
    )
  }

    eliminarCalificacion(){

      this.idCliente = this.tokenService.getUsername();
      
      this.calificacion = new Calificacion(this.restaurante.email,this.idCliente,true,0);

      this.clienteService.eliminarCalificacion(this.calificacion).subscribe(
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

  calcularCosto(){
    this.costoMenus = 0;
    var cm = 0;
    for(let i in this.itemArray){
      cm = this.itemArray[i].precio;
      this.costoMenus += cm;
    }
      this.totalPedido = this.costoMenus;
      this.totalConEnvio = this.totalPedido+this.restaurante.precioEnvio;
    }


  quitarItem(nombre: string){
    var b = 0;

    for(let i in this.itemArray){
      if( this.itemArray[i].nombre === nombre ){
        this.itemArray.splice(b,1);
      }
      b++;  
    }
    this.calcularCosto();  
  
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

  seleccionarPago() {
    if (this.pagoSeleccionado === '2'){
      this.pagoOnline = true;
      console.log('seleccionarPago ' + this.totalConEnvio.toString())
      this.initConfig();
      this.pagoAcreditado = true
    }
      else{
        this.pagoOnline = false;
        this.pagoAcreditado = false
      }
  }

  cambiarDireccion(direccion: Direccion){
    this.direccionPrincipal = direccion;
    this.concatDireccion();
  }

  confirmarPedido(){
    
    this.pedido = new Pedido(null, this.email, this.restaurante.email, this.pagoOnline, this.pagoAcreditado,
    this.comentario, this.totalConEnvio, this.itemArray, this.direccion);
          
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
        }
      );
    }

  cargarMenusCat() {
    this.mc = new MenuCategoria (this.restaurante.email, this.categoria)
    this.clienteService.menusCategorias(this.mc).subscribe(
    data => {
      this.menusCat = data;
      this.menus = this.menusCat;
    },
    err => {
      console.log(err);
    }
    );
    
  }

  seleccionarCat() {
    this.categoria = this.categoriaSeleccionada;
    if(this.categoria !== "0"){
      if(this.categoria === "Todas" ){
       this.cargarMenus();
      }
      else{
        this.cargarMenusCat();   
      }
    }
  }

  onKey(event: any) {
    this.menus = this.menusCat;
    this.menusBusqueda = [];
    this.textoBusqueda = event.target.value;
    this.menusB = this.menusCat;
    this.textoBusqueda = this.textoBusqueda.toLocaleLowerCase();  
    for(let i in this.menus){
      this.nombreMenu = String(this.menusB[i].nombre).toLocaleLowerCase();
      this.descMenu = String(this.menusB[i].descripcion).toLocaleLowerCase();
      if((this.nombreMenu.search(this.textoBusqueda) != -1) || ( this.descMenu.search(this.textoBusqueda) != -1 ) ){
        this.menusBusqueda.push(this.menusB[i]);
        this.busqueda = true;
      }  
    }
    if(this.busqueda){
    this.menus = this.menusBusqueda;
    }
    else{
      this.menus = this.menusCat;
    }
  }

  quitarFavorito(){
    this.cargarDatosRest();
    this.idCliente = this.tokenService.getUsername();
    this.favorito = new Favorito(this.idCliente, this.restaurante.email)      
      this.clienteService.quitarFavorito(this.favorito).subscribe(
        data=> {
          this.toastr.success('Favorito eliminado con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.isFavorito = true;
          },
          err=>{
            this.toastr.error( 'error', '',{
              timeOut: 3000, positionClass: 'toast-top-center',
            });
           console.log(err);
          }
        );
      }
      
    
  injectTweet(){       
    this.urlTweet = 'https://twitter.com/intent/tweet?url=https%3A%2F%2Fvpi.com.uy&via=VPIUruguay&text=Necesitas%20comida%3F%20Te%20recomiendo%20el%20restaurante%20' + this.nombreRestaurante + '%21&hashtags=PediloPorVPI';
  }

  obtenerCalificacionRest(){
    this.calificacion = new Calificacion(this.restaurante.email,this.idCliente,true,0)
    this.clienteService.obtenerCalificacionRestaurante(this.calificacion).subscribe(
        data=> {    
      this.caliRest = data;
      },
      err=>{
        this.toastr.error( 'error', '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    );
  }

  initConfig() {
    
    let preciopaypal = this.totalConEnvio/45;
    let preciofinalpaypal = preciopaypal.toFixed(2)

    this.payPalConfig = {
        currency: 'USD',
        clientId: environment.clientid,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: preciofinalpaypal,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: preciofinalpaypal,
                        }
                    }
                },

                
                items: [{
                    name: 'Pedido de comida',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: preciofinalpaypal,
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

            this.confirmarPedido();

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            

        },
        onError: err => {
            console.log('OnError', err);
            
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            
        },
    };
}

      

  

}



