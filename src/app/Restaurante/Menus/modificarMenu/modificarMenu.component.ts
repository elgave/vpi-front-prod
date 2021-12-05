import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../models/Restaurante/Menu';
import { RestauranteService } from '../../../service/Restaurante/restaurante.service';
import { ToastrService } from 'ngx-toastr';
import { Agregado } from '../../../models/Restaurante/Agregado';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RestMenu } from '../../../models/Restaurante/RestMenu';
import { TokenService } from '../../../service/token.service';
import { AsociarAgregados } from '../../../models/Restaurante/AsociarAgregados';
import { QuitarAgregadoDto } from '../../../models/Restaurante/QuitarAgregadoDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modificarMenu',
  templateUrl: './modificarMenu.component.html',
  styleUrls: ['./modificarMenu.component.css']
})
export class ModificarMenuComponent implements OnInit {

  menu: Menu;
  costo: number;
  ready: boolean = false;
  nombre: string = '';
  descripcion: string = '';
  descuento: number;
  promocion: boolean;
  isPromo: boolean;
  lista: string[]=[];
  opcionSeleccionado: string;
  categoria: string;
  foto: string;
  imageSrc:string;
  agregados: Agregado[] = [];
  abrirModal: boolean = false;
  checkArray: FormArray = new FormArray([]);
  form: FormGroup;
  restM: RestMenu;
  agregadosN: Agregado[] = [];
  idsAgregados: number[] = [];
  asoc: AsociarAgregados;
  idMenu: number;
  agregadoSeleccionado: Agregado;
  abrirModalE: boolean = false;
  fotofile: File;
  dtoEliminar: QuitarAgregadoDto;
  s3Url: string = environment.s3url;

  constructor(
    private restauranteService: RestauranteService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.cargarMenu();

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

  cargarMenu(){
    var array = localStorage.getItem('Menu');
    this.menu = JSON.parse(array);
    this.ready = true;
    this.isPromo = this.menu.promocion;
    this.imageSrc = this.s3Url+"/"+this.menu.imagen;
    this.descripcion = this.menu.descripcion
    this.nombre = this.menu.nombre
   }

  
  onChange(){
    if(this.isPromo==false)
      this.isPromo=true;
    else
    this.isPromo=false
  }

  modificar(){
    if(this.nombre === ''){
      this.nombre = this.menu.nombre;
    }
    if(this.categoria == undefined){
      this.categoria = this.menu.categoria;
    }
    if(this.descripcion === ''){
      this.descripcion = this.menu.descripcion;
    }
    if(this.costo == undefined){
      this.costo = this.menu.costo;
    }
    if(this.descuento == undefined){
      this.descuento = this.menu.descuento;
    }
    if(this.fotofile == undefined){
      this.foto = this.menu.imagen
    }
    this.menu = new Menu(this.menu.idMenu, this.nombre, this.categoria, this.isPromo, this.descripcion, this.costo,
      this.descuento, this.foto, this.menu.restaurante);

      if(this.fotofile == undefined){
        this.restauranteService.modificarMenuSinFoto(this.menu).subscribe(
          data=> {
          this.toastr.success('Menu modificado con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          console.log(data);
          
          },
          err=>{
              this.toastr.error(err, '',{
              timeOut: 3000, positionClass: 'toast-top-center',
            });
            console.log(err);
          }
        );
      }else{
        const formData = new FormData();
        formData.append('menuDto', JSON.stringify(this.menu));
        formData.append('file',this.fotofile);
        sessionStorage.setItem('altaMenu', "true");
        this.restauranteService.modificarMenu(formData).subscribe(
          data=> {
          this.toastr.success('Menu modificado con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          console.log(data);
          sessionStorage.setItem('altaMenu', "false"); 
          },
          err=>{
              this.toastr.error(err, '',{
              timeOut: 3000, positionClass: 'toast-top-center',
            });
            console.log(err);
          }
        );
      }
      
    }

  capturar() {
    this.categoria = this.opcionSeleccionado;
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

  cargarAgregadosNoMenu(idMenu: number ){
    var restaurante = this.tokenService.getUsername();
    this.restM = new RestMenu(restaurante, idMenu)
    this.restauranteService.agregadosNoMenu(this.restM).subscribe(
      data => {
        this.agregadosN = data;
      },
      err => {
        console.log(err);
      }
    );
    
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

  asociarAgregados() {
    this.idsAgregados = [];
    this.checkArray.controls.forEach((item: FormControl) => { 
      this.idsAgregados.push(item.value);               
      });
    
    this.asoc = new AsociarAgregados(this.idMenu, this.idsAgregados)
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
  }
  
seleccionarAgre(agre: Agregado){
    this.agregadoSeleccionado = agre;
    this.abrirModalE = true;
  }

  eliminarAgregado(){
    this.dtoEliminar = new QuitarAgregadoDto(this.idMenu, this.agregadoSeleccionado.id)
    this.restauranteService.quitarAgregadoMenu(this.dtoEliminar).subscribe(
      data=> {
      this.toastr.success('Agregado quitado con exito', '',{
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
  }

  subirIcono(files) {

    let icono = <File>files[0];
    this.fotofile = icono;
    
    var reader = new FileReader();
    reader.readAsDataURL(icono);
    reader.onload=(e:any)=>{
      this.imageSrc= e.target.result;
    }
  }

}
