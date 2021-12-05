import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoConfirmar } from 'src/app/models/Pedido/PedidoConfirmar';
import { PedidoDetalle } from 'src/app/models/Pedido/PedidoDetalle';
import { environment } from 'src/environments/environment';
import { Agregado } from '../../models/Restaurante/Agregado';
import { AbrirCerrar } from '../../models/Restaurante/AbrirCerrar';
import { Reclamo } from '../../models/Reclamo/Reclamo';
import { AceptaReclamo } from 'src/app/models/Reclamo/AceptaReclamo';
import { RechazaReclamo } from '../../models/Reclamo/RechazaReclamo copy';
import { Menu } from '../../models/Restaurante/Menu';
import { Restaurante } from 'src/app/models/Restaurante/Restaurante';
import { AsociarAgregados } from 'src/app/models/Restaurante/AsociarAgregados';
import { Calificacion } from 'src/app/models/Cliente/Calificacion';
import { RestMenu } from '../../models/Restaurante/RestMenu';
import { QuitarAgregadoDto } from '../../models/Restaurante/QuitarAgregadoDto';
import { MenuCategoria } from '../../models/Cliente/MenuCategoria';
import { BalanceDto } from '../../models/Restaurante/BalanceDto';
import { PedidoConReclamos } from '../../models/Pedido/PedidoConReclamos';
import { ReclamoFiltro } from '../../models/Reclamo/ReclamoFiltro';
import { RechazoPedido } from '../../models/Pedido/RechazoPedido';


@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  

Base = environment.base;
   
constructor( private httpClient:HttpClient) { }

  public getPedidosSinPendientes(email: string): Observable<PedidoDetalle[]> {
    return this.httpClient.get<PedidoDetalle[]>( `${this.Base+'restaurante/getPedidosSinPendientes?idRestaurante='}${email}`);
  }
  
  public getPedidosPendientes(email: string): Observable<PedidoDetalle[]> {
    return this.httpClient.get<PedidoDetalle[]>( `${this.Base+'restaurante/getPedidosPendientes?idRestaurante='}${email}`);
  }
  public confirmPedido(pedidoConfirm: PedidoConfirmar): Observable<PedidoConfirmar> {
    return this.httpClient.post<PedidoConfirmar>(this.Base + 'restaurante/confirmarPedido/', pedidoConfirm);
  }
  
  public crearAgregado(agregado: Agregado): Observable<Agregado> {
    return this.httpClient.post<Agregado>(this.Base + 'restaurante/altaAgregado/', agregado);
  }
  
  public idAbierto(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>( `${this.Base+'restaurante/isAbierto?idRestaurante='}${email}`);
  }
  
  public abrirCerrarRest(abierto: AbrirCerrar): Observable<AbrirCerrar> {
    return this.httpClient.post<AbrirCerrar>(this.Base + 'restaurante/abrirCerrar/', abierto);
  }
  
  public getReclamos(dto: ReclamoFiltro): Observable<Reclamo[]> {
    return this.httpClient.post<Reclamo[]>(this.Base + 'restaurante/getAllReclamos/', dto);
  }
  
  public aceptarReclamo(reclamo: AceptaReclamo): Observable<AceptaReclamo> {
    return this.httpClient.post<AceptaReclamo>(this.Base + 'restaurante/aceptarReclamo/', reclamo);
  }
  
  public rechazarReclamo(reclamo: RechazaReclamo): Observable<RechazaReclamo> {
    return this.httpClient.post<RechazaReclamo>(this.Base + 'restaurante/rechazarReclamo/', reclamo);
  }
  
  public registrarPago(pago: number): Observable<number> {
    return this.httpClient.post<number>(this.Base + 'restaurante/pagoEnEfectivo/', pago);
  }
  
  public getMenus(idRestaurante: string): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>( `${this.Base+'restaurante/getMenus?idRestauarante='}${idRestaurante}`);
  }
  
  public obtenerMisDatos(email : string):Observable<Restaurante>{
    return this.httpClient.get<Restaurante>(`${this.Base}restaurante/obtenerMisDatos/${email}`);
  }
  
  public getAgregados(idRestaurante: string): Observable<Agregado[]> {
    return this.httpClient.get<Agregado[]>( `${this.Base+'restaurante/listarAgregados/'}${idRestaurante}`);
  }
  
  public modificarAgregado(agregado: Agregado): Observable<any> {
    return this.httpClient.post<any>(this.Base + 'restaurante/modificarAgregado/', agregado);
  }

  public eliminarAgregado(id: number): Observable<any> {
    return this.httpClient.post<any>( this.Base + 'restaurante/eliminarAgregado',id);
  }

  public eliminarMenu(id: number): Observable<any> {
    return this.httpClient.post<any>( this.Base + 'restaurante/eliminarMenu',id);
  }

  public altaMenu(formData: FormData): Observable<any>{
    return this.httpClient.post<any>(this.Base + 'restaurante/altaMenu', formData);
  }

  public asociarAgregados(a: AsociarAgregados): Observable<any>{
    return this.httpClient.post<any>(this.Base + 'restaurante/asociarAgregados', a);
  }
  public calificarCliente(calificacion: Calificacion):Observable<any>{
    return this.httpClient.post<any>(this.Base + 'restaurante/calificarCliente', calificacion);
  }

  public obtenerCalificacionCliente(calificacion: Calificacion):Observable<number>{
    return this.httpClient.post<number>(this.Base + 'restaurante/obtenerCalificacionCliente', calificacion);
  }
  
  public eliminarCalificacion(calificacion: Calificacion):Observable<any>{
    return this.httpClient.post<any>(this.Base + 'restaurante/eliminarCalificacion', calificacion);
  }

  public modificarMenu(formData: FormData):Observable<any>{
    return this.httpClient.post<any>(this.Base + 'restaurante/modificarMenu', formData);
  }

  public modificarMenuSinFoto(menuDto: Menu):Observable<any>{
    return this.httpClient.post<any>(this.Base + 'restaurante/modificarMenuSinFoto', menuDto);
  }

  public getAgregadosByMenu(idMenu: number): Observable<Agregado[]> {
    return this.httpClient.get<Agregado[]>( `${this.Base+'restaurante/getAgregados?idMenu='}${idMenu}`);
  }

  public agregadosNoMenu(restM: RestMenu): Observable<Agregado[]> {
    return this.httpClient.post<Agregado[]>(this.Base + 'restaurante/agregadosNoMenu', restM);
  }

  public obtenerMiCalificacion(email: string): Observable<number> {
    return this.httpClient.get<number>( `${this.Base}restaurante/obtenerMiCalificacion/${email}`);
  }

  public quitarAgregadoMenu(dto: QuitarAgregadoDto): Observable<any> {
    return this.httpClient.post<any>(this.Base + 'restaurante/quitarAgregado', dto);
  }

  public getBalance(dto: BalanceDto): Observable<PedidoConReclamos[]> {
    return this.httpClient.post<PedidoConReclamos[]>(this.Base + 'restaurante/balance', dto);
  }
  
  public rechazarPedido(dto: RechazoPedido): Observable<RechazoPedido> {
    return this.httpClient.post<RechazoPedido>(this.Base + 'restaurante/rechazarPedido', dto);
  }
  


}
