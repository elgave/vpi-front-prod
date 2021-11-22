import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {


  realRol: string;

constructor(private tokenService: TokenService,
  private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
   
    roles.forEach(rol=>{
      if(rol === 'Restaurante'){
        this.realRol = 'Restaurante';
      }
      if(rol === 'Cliente'){
        this.realRol = 'Cliente';
      }
     

    });
    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      this.router.navigate(['/']);
      return false;
    } 
    return true;

  }

}
