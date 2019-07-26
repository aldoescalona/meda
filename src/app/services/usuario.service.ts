import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Credencial } from 'src/app/model/clases';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private HORAS: number = 2000;
  private token: string;

  constructor(private http: HttpClient) { 
    this.cargaStorage();
  }

  getToken(){
    return this.token;
  }

  login(idOp: Credencial, recuerdame: boolean) {

    let url = `${environment.API_URL}/auth/login`;

    return this.http.post(url, idOp).pipe(
      tap(res => {
        this.token = res['token'];
        localStorage.setItem('malfa.token', this.token);
        if (recuerdame) {
          localStorage.setItem('malfa.username', idOp.username);
        } else {
          localStorage.removeItem('malfa.username');
        }
      }, (err: HttpErrorResponse ) => {
        this.token = null;
        if (err.status === 403) {
          console.log("Remover TOKEN")
          localStorage.removeItem('malfa.token');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('malfa.token');
    this.token = '';
  }

  renovarToken() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })

    let url = `${environment.API_URL}/auth/renovar`;
    return this.http.post(url, '', { headers: reqHeader });
  }

  usuarioFirmado() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })

    let url = `${environment.API_URL}/usuario/id`;
    return this.http.get(url, { headers: reqHeader });
  }

  healthCkeck() {

    // console.log(this.token);
    console.log('Validando healthCkeck');

    if (this.token === null || this.token.length < 5) {
      return false;
    }

    let payload = JSON.parse(atob(this.token.split('.')[1]));

    let tokenExp = new Date(payload.exp * 1000);

    let ahora = new Date();

    if (tokenExp.getTime() < ahora.getTime()) {
      localStorage.removeItem('malfa.token');
      return false;
    }

    ahora.setTime(ahora.getTime() + (this.HORAS * 60 * 60 * 1000));

    if (tokenExp.getTime() < ahora.getTime()) {
      this.renovarToken().subscribe(res => {
        this.token = res['token'];
        localStorage.setItem('malfa.token', this.token);
      }, (err: HttpErrorResponse ) => {
        this.token = null;
        if (err.status === 403) {
          this.logout();
          return false;
        }
      });
    }
    return true;
  }

  cargaStorage() {
    this.token = localStorage.getItem('malfa.token');
  }
}
