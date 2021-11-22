import { Component, OnInit } from '@angular/core';
import { EmailPasswordService } from '../../service/email-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ChangePass } from '../../models/usuario/changePass';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password: string;
  confirmarPassword: string;
  tokenPassword: string;

  dto: ChangePass;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onChangePass():void{
    if(this.password !== this.confirmarPassword){
      this.toastrService.error('Las contraseñas no coinciden' , '',{
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    this.dto = new ChangePass(this.password, this.confirmarPassword, this.tokenPassword);
    this.emailPasswordService.changePasswords(this.dto).subscribe(
      data =>{
        this.toastrService.success('contraseña cambiada', '', {
          timeOut : 3000 , positionClass: 'toast-top-center',
        });
        console.log(data);
        this.router.navigate(['/login'])
      },
      err => {
        this.toastrService.error(err.error , '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    );
    

  }

}
