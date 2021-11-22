import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FooterComponent } from 'src/app/footer/footer.component';
import { Agregado } from 'src/app/models/Restaurante/Agregado';
import { AsociarAgregados } from 'src/app/models/Restaurante/AsociarAgregados';
import { Menu } from 'src/app/models/Restaurante/Menu';
import { NuevoMenu } from 'src/app/models/Restaurante/NuevoMenu';
import { QuitarAgregadoDto } from 'src/app/models/Restaurante/QuitarAgregadoDto';
import { RestMenu } from 'src/app/models/Restaurante/RestMenu';
import { AuthService } from 'src/app/service/auth.service';
import { RestauranteService } from 'src/app/service/Restaurante/restaurante.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-crearMasMenus',
  templateUrl: './crearMasMenus.component.html',
  styleUrls: ['./crearMasMenus.component.css']
})
export class CrearMasMenusComponent implements OnInit {


  nuevoMenu : NuevoMenu;
  restaurante: string;
  nombre: string = '';
  categoria: string;
  promocion: boolean;
  descripcion: string = '';
  costo: number;
  descuento: number;
  imagen: string;
  foto: File;
  errMsj: string;
  isLogged = false;
  lista: string[]=[];
  opcionSeleccionado: string = '0';
  menu: Menu;
  isPromo: boolean = false;
  agregados: Agregado[] = [];
  abrirModal: boolean = false;
  checkArray: FormArray = new FormArray([]);
  form: FormGroup;
  restM: RestMenu;
  agregadosN: Agregado[] = [];
  idsAgregados: number[] = [];
  asoc: AsociarAgregados;
  idMenu: number;
  idMenu2 : number;
  agregadoSeleccionado: Agregado;
  abrirModalE: boolean = false;
  dtoEliminar: QuitarAgregadoDto;
  menus:Menu[];
  nombreMenu: string;

  cantMenu: number;
  ready: boolean;

  constructor(
    private restauranteService: RestauranteService,
    private tokenService : TokenService,
    private authService : AuthService,
    private router : Router,
    private fb: FormBuilder,
    private toastr : ToastrService
  ) { }

  ngOnInit() {

    this.lista.push("Pizza")
    this.lista.push("Sushi")
    this.lista.push("Empanadas")
    this.lista.push("Saludable")
    this.lista.push("Hamburguesas")
    this.lista.push("Milanesas")
    this.lista.push("Helados")
    this.lista.push("Postres")
    this.lista.push("Vegetariana")
    this.lista.push("Italiana")
    this.lista.push("Pastas")
    this.lista.push("Chivito")
    this.lista.push("Panadería")
    this.lista.push("Parrilla")
    this.lista.push("Vegano")
    this.lista.push("Celiaco")
    this.lista.push("Otros")
    
    this.form = this.fb.group({
      checkArray: this.fb.array([])
      })
    
  }



  onRegisterMenu():void{
    this.restaurante = this.tokenService.getUsername();
    this.nuevoMenu = new NuevoMenu(this.restaurante, this.nombre, this.categoria, this.promocion, this.descripcion,
      this.costo, this.descuento, this.imagen);
      this.nombreMenu = this.nombre
      const formData = new FormData();
      formData.append('menuDto', JSON.stringify(this.nuevoMenu));
      formData.append('file',this.foto);
      sessionStorage.setItem('altaMenu', "true");
    this.authService.altaMenu(formData).subscribe(
      data=> {
      this.toastr.success('Menu creado con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      console.log(data);
      sessionStorage.setItem('altaMenu', "false");
      this.limpiarForm();
        
      },
      err=>{
        this.errMsj = err.error;
        this.toastr.error(this.errMsj, '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    );
  }

  capturar() {
    this.categoria = this.opcionSeleccionado;
  }
  onChange(){
    if(this.isPromo==false)
      this.isPromo=true;
    else
    this.isPromo=false
  }

  limpiarForm(){
    this.restaurante = '';
    this.nombre = '';
    this.categoria= '';
    this.promocion = false;
    this.descripcion = '';
    this.costo = 0;
    this.descuento = 0;
    this.imagen = '';
    this.opcionSeleccionado = '0';
    this.isPromo= false;
  }

  subirIcono(files) {

    let icono = <File>files[0];
    this.foto = icono;
    
  }
  
  asociarAgregados() {
    this.idsAgregados = [];
    this.checkArray.controls.forEach((item: FormControl) => { 
      this.idsAgregados.push(item.value);       
      });
      this.restaurante = this.tokenService.getUsername();
      this.restauranteService.getMenus(this.restaurante).subscribe(
        data => {
          this.menus = data;
          for(var i = 0; i < this.menus.length; i++){
            if(this.nombreMenu == this.menus[i].nombre){
              this.idMenu2 = this.menus[i].idMenu;
            }
          }
    this.asoc = new AsociarAgregados(this.idMenu2, this.idsAgregados)
    this.restauranteService.asociarAgregados(this.asoc).subscribe(
      data=> {
      this.toastr.success('Agregado/s asociado/s con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarAgregados(this.menu);
      },
      err=>{
          this.toastr.error(err, '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    );
        },
        err => {
          console.log(err);
        }
      );
  }

  cargarAgregadosDisponibles(){
    var restaurante = this.tokenService.getUsername();
    this.restauranteService.getAgregados(restaurante).subscribe(
      data => {
        this.agregadosN = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarAgregados(mnu: Menu) {  
    this.restauranteService.getAgregadosByMenu(mnu.idMenu).subscribe(
      data => {
        this.agregados = data;
        this.abrirModal = true;
      },
      err => {
        console.log(err);
      }
    );
    this.idMenu = mnu.idMenu;
    this.menu = mnu;
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
}
