import { Component, OnInit } from '@angular/core';
import { EmailPasswordService } from '../../service/email-password.service';
import { ToastrService } from 'ngx-toastr';
import { Email } from 'src/app/models/usuario/email';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  email: string;
  dto: Email;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  onSendEmail():void{
    this.dto = new Email(this.email);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      data =>{
        this.toastrService.success('Correo enviado', '', {
          timeOut : 3000 , positionClass: 'toast-top-center',
        });
        console.log(data);
      },
      err => {
        this.toastrService.error(err.error , '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    )

  }

}

