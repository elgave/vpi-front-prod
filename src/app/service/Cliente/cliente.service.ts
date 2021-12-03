import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante } from 'src/app/models/Restaurante/Restaurante';
import { Menu } from '../../models/Restaurante/Menu';
import { Agregado } from '../../models/Restaurante/Agregado';
import { environment } from 'src/environments/environment';
import { Direccion } from '../../models/Cliente/Direccion';
import { Pedido } from 'src/app/models/Pedido/Pedido';
import { PedidoDetalle } from 'src/app/models/Pedido/PedidoDetalle';
import { Favorito } from '../../models/Cliente/Favorito';
import { PedidoConfirmar } from '../../models/Pedido/PedidoConfirmar';
import { Reclamo } from 'src/app/models/Reclamo/Reclamo';
import { Cliente } from 'src/app/models/Cliente/Cliente';
import { Calificacion } from 'src/app/models/Cliente/Calificacion';
import { MenuCategoria } from 'src/app/models/Cliente/MenuCategoria';
import { PedidoConReclamos } from '../../models/Pedido/PedidoConReclamos';
import { TopRest } from 'src/app/models/Cliente/TopRest';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

//base: 'http://localhost:8282/' 
Base = environment.base;
URL = 'http://localhost:8282/cliente/'


constructor( private httpClient:HttpClient) { }



public getAllRestaurantes(): Observable<Restaurante[]> {
  return this.httpClient.get<Restaurante[]>( this.Base+'cliente/getAllRestaurantes');
}

public getMenusRestaurante(idRestaurante: string): Observable<Menu[]> {
  return this.httpClient.get<Menu[]>( `${this.Base+'cliente/getMenusRestaurante?nombreRestaurante='}${idRestaurante}`);
}

public getAgrados(idMenu: number): Observable<Agregado[]> {
  return this.httpClient.get<Agregado[]>( `${this.Base+'cliente/getAgregados?idMenu='}${idMenu}`);
}

public getDatosRestaurante(nombreRestaurante: string): Observable<Restaurante> {
  return this.httpClient.get<Restaurante>( `${this.Base+'cliente/getDatosRestaurante?nombreRestaurante='}${nombreRestaurante}`);
}

public getDirecciones(email: string): Observable<Direccion[]> {
  return this.httpClient.get<Direccion[]>( `${this.Base+'cliente/getDirecciones?email='}${email}`);
}

public altaPedido(pedido: Pedido): Observable<Pedido>{
  return this.httpClient.post<Pedido>(this.Base + 'cliente/altaPedido', pedido);
}

public getPedidos(email: string): Observable<PedidoConReclamos[]> {
  return this.httpClient.get<PedidoConReclamos[]>( `${this.Base+'cliente/getPedidos?email='}${email}`);
}

public agregarFavorito(favorito: Favorito): Observable<Favorito>{
  return this.httpClient.post<Favorito>(this.Base + 'cliente/agregarFavorito', favorito);
}

public postIsFavorito(favorito: Favorito): Observable<boolean> {
  return this.httpClient.post<boolean>(this.Base + 'cliente/IsFavorito', favorito);
}

public realizarReclamo(reclamo: Reclamo): Observable<Reclamo> {
  return this.httpClient.post<Reclamo>(this.Base + 'cliente/altaReclamo', reclamo);
}
public registrarDireccion(direccion: Direccion): Observable<Direccion> {
  return this.httpClient.post<Direccion>(this.Base + 'cliente/agregarDireccion', direccion);
}

public getCantDirecciones(email: string): Observable<number> {
  return this.httpClient.get<number>( `${this.Base+'cliente/getCantDirecciones?email='}${email}`);
}

public obtenerMisDatos(email : string):Observable<Cliente>{
  return this.httpClient.get<Cliente>(`${this.Base}cliente/obtenerMisDatos/${email}`);
}

public modificarDireccion(direccion: Direccion): Observable<Direccion> {
  return this.httpClient.post<Direccion>(this.Base + 'cliente/modificarDireccion', direccion);
}
public calificarRestaurante(calificacion: Calificacion):Observable<any>{
  return this.httpClient.post<any>(this.Base + 'cliente/calificarRestaurante', calificacion);
}

public puedeCalificar(calificacion: Calificacion):Observable<boolean>{
  return this.httpClient.post<boolean>(this.Base + 'cliente/puedeCalificar', calificacion);
}
public obtenerCalificacionRestaurante(calificacion: Calificacion):Observable<number>{
  return this.httpClient.post<number>(this.Base + 'cliente/obtenerCalificacionRestaurante', calificacion);
}

public eliminarCalificacion(calificacion: Calificacion):Observable<any>{
  return this.httpClient.post<any>(this.Base + 'cliente/eliminarCalificacion', calificacion);
}
public obtenerMiCalificacion(email: string): Observable<number> {
  return this.httpClient.get<number>( `${this.Base}cliente/obtenerMiCalificacion/${email}`);
}

public eliminarDireccion(idDireccion: number):Observable<any>{
  return this.httpClient.post<any>(this.Base + 'cliente/eliminarDireccion', idDireccion);
}

public eliminarMiCuenta(email: string): Observable<any> {
  return this.httpClient.get<any>( `${this.Base}cliente/eliminarMiCuenta/${email}`);
}

public menusCategorias(dto: MenuCategoria): Observable<Menu[]> {
  return this.httpClient.post<Menu[]>(this.Base + 'cliente/menuCategoria', dto);
}

public getRestConPromos(): Observable<Restaurante[]> {
  return this.httpClient.get<Restaurante[]>( `${this.Base+'cliente/getRestConPromo'}`);
}

public quitarFavorito(favorito: Favorito): Observable<Favorito>{
  return this.httpClient.post<Favorito>(this.Base + 'cliente/quitarFavoritoCliente', favorito);
}

public restFavoritos(idCliente: string): Observable<Restaurante[]> {
  return this.httpClient.get<Restaurante[]>(  `${this.Base}cliente/restFavoritos/${idCliente}`);
}

public getTop(): Observable<TopRest[]> {
  return this.httpClient.get<TopRest[]>( `${this.Base+'cliente/restaurantesMasVentas'}`);
}

}
