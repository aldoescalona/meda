import { Component, OnInit } from '@angular/core';
import { Credencial } from 'src/app/model/clases';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  ocupado = false;
  recuerdame: boolean = false;
  credencial: Credencial = new Credencial('', '');

  constructor(private usuarioService:UsuarioService,  private router: Router) { }

  ngOnInit() {

    this.credencial.username = localStorage.getItem("malfa.username") || '';
    if (this.credencial.username.length > 0) {
      this.recuerdame = true;
    }
  }

  login(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    if (this.ocupado) {
      return;
    }

    this.ocupado = true;

    this.usuarioService.login(this.credencial, this.recuerdame).subscribe(
      res => {
        this.router.navigate(['/productos']);
        this.ocupado = false;
      },
      (err: HttpErrorResponse ) => {
        if (err.status === 403) {
          swal('Inicio Error', 'Usuario o contraseña incorrectos', 'error');
        }else {
          swal('Inicio Error', 'Problemas de inicio de sesión', 'error');
        }
        this.ocupado = false;
      });

  }

}
