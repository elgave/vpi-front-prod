import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Restaurante/homeRest/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { GuardService as guard} from './service/guard/guard.service';
import { SendEmailComponent } from './changePassword/send-email/send-email.component';
import { ChangePasswordComponent } from './changePassword/change-password/change-password.component';
import { ClienteRestaurantesComponent } from './Cliente/clienteRestaurantes/clienteRestaurantes.component';

import { AltaMenuComponent } from './Restaurante/Menus/altaMenu/altaMenu.component';
import { MenusRestauranteComponent } from './Cliente/clienteRestaurantes/MenusRestaurante/MenusRestaurante.component';
import { ClienteMisPedidosComponent } from './Cliente/clienteMisPedidos/clienteMisPedidos.component';
import { RestauranteMenusYPromocionesComponent } from './Restaurante/restauranteMenusYPromociones/restauranteMenusYPromociones.component';
import { ClientePedidoResumenComponent } from './Cliente/clientePedidoResumen/clientePedidoResumen.component';
import { RestauranteReclamosComponent } from './Restaurante/restauranteReclamos/restauranteReclamos.component';
import { RestauranteHistoricoPedidosComponent } from './Restaurante/restauranteHistoricoPedidos/restauranteHistoricoPedidos.component';
import { CrearMasMenusComponent } from './Restaurante/Menus/crearMasMenus/crearMasMenus.component';
import { ModificarMenuComponent } from './Restaurante/Menus/modificarMenu/modificarMenu.component';
import { ObtenerBalanceComponent } from './Restaurante/obtenerBalance/obtenerBalance.component';
import { ClienteMisDireccionesComponent } from './Cliente/clienteMisDirecciones/clienteMisDirecciones.component'; 
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClienteMiPerfilComponent } from './Cliente/cliente-mi-perfil/cliente-mi-perfil.component';


const routes: Routes = [
  /*pantallas*/ 
  {path: 'clienteHome', component: ClienteRestaurantesComponent},
   
  /**Cliente**/
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  //{path: 'misPedidos', component: ClienteMisPedidosComponent},
  {path: 'miPedidoActual', component: ClientePedidoResumenComponent},
  {path: 'misDirecciones', component: ClienteMisDireccionesComponent},
  {path: 'menusYPromociones', component: RestauranteMenusYPromocionesComponent},
  {path: 'changePassword/:tokenPassword', component: ChangePasswordComponent},
  {path: 'altaMenu', component: AltaMenuComponent},
  {path: 'crearMasMenus', component: CrearMasMenusComponent},
  {path: 'modificarMenu', component: ModificarMenuComponent},
  {path: 'obtenerBalance', component: ObtenerBalanceComponent},
  {path: 'clienteRestaurante', component: ClienteRestaurantesComponent, canActivate: [guard], data:{expectedRol: ['Cliente']}},
  {path: 'clienteRestaurante/:idRestaurante', component: MenusRestauranteComponent, canActivate: [guard], data:{expectedRol: ['Cliente']}},
  {path: 'pedido/:nombreRestaurante', component: ClientePedidoResumenComponent, canActivate: [guard], data:{expectedRol: ['Cliente']}},
  {path: 'misPedidos', component: ClienteMisPedidosComponent, canActivate: [guard], data:{expectedRol: ['Cliente']}},
  {path: 'reclamos', component: RestauranteReclamosComponent},
  {path: 'miPerfil', component: ClienteMiPerfilComponent,canActivate: [guard], data:{expectedRol: ['Cliente']}},
 
  /**Restaurante**/
  {path: 'historicoPedidos', component: RestauranteHistoricoPedidosComponent, canActivate: [guard], data:{expectedRol: ['Restaurante']}},
  {path: 'homeRest', component: IndexComponent, canActivate: [guard], data:{expectedRol: ['Restaurante']}},
  {path: '**', component: PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
