import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token.service';

@Injectable
({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor{

constructor(private tokenService: TokenService) { }
private AUTH_HEADER = "Authorization";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    var altaMenu =  sessionStorage.getItem('altaMenu') == "true";
    
    if (token!=null) {
      if(!altaMenu){
        const modifiedReq = req.clone({ 
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(modifiedReq);
      }
    }
    return next.handle(req);
  }
}
export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
