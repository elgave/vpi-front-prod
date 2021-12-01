import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { FooterComponent } from '../../footer/footer.component';
import { RestauranteService } from '../../service/Restaurante/restaurante.service';
import { PedidoDetalle } from '../../models/Pedido/PedidoDetalle';
import { Pedido } from 'src/app/models/Pedido/Pedido';
import { PedidoConfirmar } from '../../models/Pedido/PedidoConfirmar';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RechazoPedido } from '../../models/Pedido/RechazoPedido';
import { StompService } from 'src/app/service/stomp.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isCliente = false;
  isLogged = false;
  email = ''; 
  roles : string[];
  pedidos: PedidoDetalle[] = [];
  pedidoSelecionado : PedidoDetalle; 
  tiempoE: number;
  pedidoConfirmar: PedidoConfirmar;
  abrirModal: boolean = false;
  rechazo: RechazoPedido;
  motivo: string;


  constructor(
    private tokenService: TokenService,
    private restauranteService: RestauranteService,
    private toastr: ToastrService,
    private stompService:StompService
    ) { 
      this.cargarPedidosPendientes();
    }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.email = this.tokenService.getUsername();
    }else{
      this.isLogged = false;
      this.email = '';
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( rol=>{
      if(rol === 'Cliente'){
        this.isCliente = true; 
      }
    })
    this.obtenerFoto(this.tokenService.getUsername())
    
    this.stompService.subscribe('/topic/pedidos', (): void =>{
      this.cargarPedidosPendientes();
    });
    
  }

  /**Restaurante**/

  cargarPedidosPendientes() {
    this.email = this.tokenService.getUsername();
    this.restauranteService.getPedidosPendientes(this.email).subscribe(
      data => {
        this.pedidos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  seleccionar(pedido: PedidoDetalle){
    this.pedidoSelecionado = pedido;
    this.abrirModal = true;

  }

  confirmarPedido(){
    this.pedidoConfirmar = new PedidoConfirmar( this.pedidoSelecionado.idPedido, this.tiempoE);
          
    this.restauranteService.confirmPedido(this.pedidoConfirmar).subscribe(
      data=> {
        this.toastr.success('Pedido confirmado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
        this.cargarPedidosPendientes();
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

    obtenerFoto(email : string){
      this.restauranteService.obtenerMisDatos(email).subscribe(data =>{
          sessionStorage.setItem('fotoPerfil', data.foto)
      });
  
    }

    
  rechazarPedido(){
    this.rechazo = new RechazoPedido( this.pedidoSelecionado.idPedido, this.motivo);
          
    this.restauranteService.rechazarPedido(this.rechazo).subscribe(
      data=> {
        this.toastr.success('Pedido rechazado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
        this.cargarPedidosPendientes();
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