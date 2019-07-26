import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private usuarioService: UsuarioService, public router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
      return new Promise((resolve, reject) => {

        let b = this.usuarioService.healthCkeck();
  
        if (b === true) {
          resolve(true);
        } else {
          console.log('Bloqueado por guard');
          this.usuarioService.logout(); 
          this.router.navigate(['/login']);
          reject(false);
        }
      });
  }
}
