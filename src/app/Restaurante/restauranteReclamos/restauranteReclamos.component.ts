import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { RestauranteService } from '../../service/Restaurante/restaurante.service';
import { ToastrService } from 'ngx-toastr';
import { Reclamo } from 'src/app/models/Reclamo/Reclamo';
import { AceptaReclamo } from '../../models/Reclamo/AceptaReclamo';
import { RechazaReclamo } from '../../models/Reclamo/RechazaReclamo copy';
import { ReclamoFiltro } from '../../models/Reclamo/ReclamoFiltro';
import { Pedido } from '../../models/Pedido/Pedido';

@Component({
  selector: 'app-restauranteReclamos',
  templateUrl: './restauranteReclamos.component.html',
  styleUrls: ['./restauranteReclamos.component.css']
})
export class RestauranteReclamosComponent implements OnInit {

  email: string;
  reclamos: Reclamo[] = [];
  reclamoSeleccionado: Reclamo;
  aceptReclamo: AceptaReclamo;
  comentario: string;
  rechazaReclamo: RechazaReclamo;
  dto: ReclamoFiltro;
  filtro: string;
  textoBusqueda: string;
  fecha: string;
  estado: string;
  reclamoBusequeda: Reclamo[] = [];
  busqueda: boolean = false;
  rb: Reclamo[] = [];
  rf: Reclamo[] = [];
  nroReclamo: string;
  nroPedido: string;
  tipo: string;
  comentarioB: string;

  constructor(
    private tokenService: TokenService,
    private restauranteService: RestauranteService,
    private toastr: ToastrService,
  ) {
   
   }

  ngOnInit() {
    this.filtro = 'Todos'
    this.email = this.tokenService.getUsername(); 
    this.listarReclamos();
  }


  listarReclamos(){
    this.dto = new ReclamoFiltro(this.email,this.filtro) 

    this.restauranteService.getReclamos(this.dto).subscribe(
      data=> {    
        this.reclamos = data;
        this.rf = data;
        },
        err=>{
          
         console.log(err);
        }
      );
    }

  seleccionar(){

  }

  aceptarReclamo(reclamo: Reclamo){
    this.reclamoSeleccionado = reclamo;
    this.aceptReclamo = new AceptaReclamo( this.reclamoSeleccionado.idReclamo, this.reclamoSeleccionado.tipo);
          
    this.restauranteService.aceptarReclamo(this.aceptReclamo).subscribe(
      data=> {
        this.toastr.success('Reclamo aceptado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
        this.listarReclamos();
        },
        err=>{
            this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
         console.log(err);
        }
      );
    }


    rechazarReclamo(reclamo: Reclamo){
      this.reclamoSeleccionado = reclamo;
      this.rechazaReclamo = new RechazaReclamo( this.reclamoSeleccionado.idReclamo, this.comentario);
            
      this.restauranteService.rechazarReclamo(this.rechazaReclamo).subscribe(
        data=> {
          this.toastr.success('Reclamo rechazado con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          console.log(data);
          this.listarReclamos();
          },
          err=>{
              this.toastr.error( 'error', '',{
              timeOut: 3000, positionClass: 'toast-top-center',
            });
           console.log(err);
          }
        );
      }


  setFiltro(filtro: string){
    this.filtro = filtro;
    this.listarReclamos();
        
  }

  onKey(event: any) {
    this.reclamos = this.rf;
    this.rb = this.reclamos;  
    
    this.reclamoBusequeda = [];
    this.textoBusqueda = event.target.value;
    this.textoBusqueda = this.textoBusqueda.toLocaleLowerCase();
    
    for(let i in this.reclamos){
      this.estado = String(this.rb[i].estado).toLocaleLowerCase();
      this.fecha = String(this.rb[i].fecha).toLocaleLowerCase();

      this.nroReclamo = String(this.rb[i].idReclamo).toLocaleLowerCase();
      this.nroPedido = String(this.rb[i].pedido).toLocaleLowerCase();
      this.tipo = String(this.rb[i].tipo).toLocaleLowerCase();
      this.comentarioB = String(this.rb[i].comentario).toLocaleLowerCase();
    

      if((this.estado.search(this.textoBusqueda) != -1) || ( this.fecha.search(this.textoBusqueda) != -1 ) 
      || ( this.nroReclamo.search(this.textoBusqueda) != -1 ) || ( this.nroPedido.search(this.textoBusqueda) != -1 )
      || ( this.tipo.search(this.textoBusqueda) != -1 ) || ( this.comentarioB.search(this.textoBusqueda) != -1 )){
        this.reclamoBusequeda.push(this.rb[i]);
        this.busqueda = true;

      }  
    }
    if(this.busqueda){
    this.reclamos = this.reclamoBusequeda;
    }
    else{
      this.reclamos = this.rf;  
    }

  }

  ordenarAsc(){
    this.reclamos.sort(function (a, b) {
    if (a.idReclamo > b.idReclamo) {
      return 1;
    }
    if (a.idReclamo < b.idReclamo) {
      return -1;
    }   
      return 0;
    });
  }

  ordenarDesc(){
    this.reclamos.sort(function (a, b) {
    if (a.idReclamo < b.idReclamo) {
      return 1;
    }
    if (a.idReclamo > b.idReclamo) {
      return -1;
    }   
    return 0;
    });
   }



}
