import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarComponent } from './Cliente/clienteRestaurantes/MenusRestaurante/star/star.component';

import { NgxPayPalModule } from 'ngx-paypal';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './Restaurante/homeRest/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TokenService } from './service/token.service';
import { AuthService } from './service/auth.service';
import { InterceptorService, interceptorProvider } from './service/interceptor/interceptor.service';
import { ChangePasswordComponent } from './changePassword/change-password/change-password.component';
import { SendEmailComponent } from './changePassword/send-email/send-email.component';
import { ClienteRestaurantesComponent } from './Cliente/clienteRestaurantes/clienteRestaurantes.component';
import { AltaMenuComponent } from './Restaurante/Menus/altaMenu/altaMenu.component';
import { MenusRestauranteComponent } from './Cliente/clienteRestaurantes/MenusRestaurante/MenusRestaurante.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteMisPedidosComponent } from './Cliente/clienteMisPedidos/clienteMisPedidos.component';
import { RestauranteMenusYPromocionesComponent } from './Restaurante/restauranteMenusYPromociones/restauranteMenusYPromociones.component';
import { RestauranteReclamosComponent } from './Restaurante/restauranteReclamos/restauranteReclamos.component';
import { ClientePedidoResumenComponent } from './Cliente/clientePedidoResumen/clientePedidoResumen.component';
import { RestauranteHistoricoPedidosComponent } from './Restaurante/restauranteHistoricoPedidos/restauranteHistoricoPedidos.component';
import { CrearMasMenusComponent } from './Restaurante/Menus/crearMasMenus/crearMasMenus.component';
import { ModificarMenuComponent } from './Restaurante/Menus/modificarMenu/modificarMenu.component';
import { ObtenerBalanceComponent } from './Restaurante/obtenerBalance/obtenerBalance.component';
import { ClienteMisDireccionesComponent } from './Cliente/clienteMisDirecciones/clienteMisDirecciones.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClienteMiPerfilComponent } from './Cliente/cliente-mi-perfil/cliente-mi-perfil.component';
import {MatFormFieldModule,MatInputModule } from  '@angular/material';
import {MatNativeDateModule, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { StompService } from './service/stomp.service';







@NgModule({
  declarations: [				
    AppComponent,
    LoginComponent,
    RegistroComponent,
      MenuComponent,
      IndexComponent,
      ChangePasswordComponent,
      SendEmailComponent,
      ClienteRestaurantesComponent,
      AltaMenuComponent,
      ClientePedidoResumenComponent,
      RestauranteMenusYPromocionesComponent,
      RestauranteReclamosComponent,
      ClienteMisPedidosComponent,
      MenuComponent,
      MenusRestauranteComponent,
      RestauranteHistoricoPedidosComponent,
      FooterComponent,
      CrearMasMenusComponent,
      ModificarMenuComponent,
      ObtenerBalanceComponent,
      ClienteMisDireccionesComponent,
      StarComponent,
      PageNotFoundComponent,
      ClienteMiPerfilComponent

      
      
      
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgxPayPalModule
    //MomentDateModule
  ],
  providers: [ interceptorProvider, StompService
    /*{
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
