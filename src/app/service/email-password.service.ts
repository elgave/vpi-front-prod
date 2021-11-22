import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Email } from '../models/usuario/email';
import { Observable } from 'rxjs';
import { ChangePass } from '../models/usuario/changePass';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  changePassUrl = environment.changePassUrl;
  emailChangePassUrl = environment.emailChangePassUrl;

constructor(private httpClient: HttpClient) { }

public sendEmail(dto: Email): Observable<any>{
  return this.httpClient.post<any>(this.emailChangePassUrl,dto);
}

public changePasswords(dto: ChangePass): Observable<any>{
  return this.httpClient.post<any>(this.changePassUrl,dto);
}

}
