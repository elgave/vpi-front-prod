import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { NuevoMenu } from '../../../models/Restaurante/NuevoMenu';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-altaMenu',
  templateUrl: './altaMenu.component.html',
  styleUrls: ['./altaMenu.component.css']
})
export class AltaMenuComponent implements OnInit {

  
  nuevoMenu : NuevoMenu;
  restaurante: string;
  nombre: string;
  categoria: string;
  promocion: boolean;
  descripcion: string;
  costo: number;
  descuento: number;
  imagen: string;
  foto: File;
  errMsj: string;
  isLogged = false;
  lista: string[]=[];
  opcionSeleccionado: string  = '0';

  cantMenu: number;
  isPromo: boolean = false;
  



  constructor(
    private tokenService : TokenService,
    private authService : AuthService,
    private router : Router,
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
    
    this.promocion = false;
    this.restaurante = localStorage.getItem('idResturante')
    localStorage.setItem('cantMenu', '0')

    document.getElementById("progressBar").style.width = "0%";
       
  }


  onRegisterMenu():void{
    this.restaurante = localStorage.getItem('idResturante')
    this.nuevoMenu = new NuevoMenu(this.restaurante, this.nombre, this.categoria, this.promocion, this.descripcion,
      this.costo, this.descuento, this.imagen);
      const formData = new FormData();
      formData.append('menuDto', JSON.stringify(this.nuevoMenu));
      formData.append('file',this.foto);

    this.authService.altaMenu(formData).subscribe(
      data=> {
      this.toastr.success('Menu creado con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      console.log(data);
      this.limpiarForm();
      this.promocion = false;
      if((this.cantMenu = parseInt(localStorage.getItem('cantMenu')))<2){
        this.cantMenu++;
        localStorage.setItem('cantMenu', this.cantMenu.toString());
        this.router.navigate(['/altaMenu']);

        if(this.cantMenu==1)
          document.getElementById("progressBar").style.width = "33%";
          if(this.cantMenu==2)
          document.getElementById("progressBar").style.width = "66%"; 
               
       
       
      }  
      else{
        document.getElementById("progressBar").style.width = "66%";
        this.router.navigate(['/homeRest']);
        localStorage.clear();
      }
        
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
    this.isPromo = false;
    this.foto = undefined;
  }
  limpiarPromo(){
    this.promocion = false;
  }

  subirIcono(files) {

    let icono = <File>files[0];
    this.foto = icono;
  }
  
}
