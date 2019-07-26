import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/interfaces';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  toggleClass = '';
  usuario:Usuario = null;
  cargandoUsuario: boolean = false;

  constructor(public menuService:MenuService, private usuarioService:UsuarioService, private router: Router) {
   }

  ngOnInit() {

    if (this.usuario === null) {

      this.cargandoUsuario = true;
      this.usuarioService.usuarioFirmado().subscribe((usr: Usuario) => {
        // console.log('Usuariofirmado', usr)
        this.usuario = usr;
        this.cargandoUsuario = false;
      }, (err: HttpErrorResponse ) => {
        
        if (err.status === 403) {
          this.usuarioService.logout();
        }
      });
    } 
  }

  toggleMenu() {

    if (this.toggleClass === 'active') {
      this.toggleClass = '';
    } else {
      this.toggleClass = 'active';
    }
  }

  salir() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

}
