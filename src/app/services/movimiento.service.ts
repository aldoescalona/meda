import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators'
import { CUDResponse, Movimiento } from 'src/app/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private usuarioService:UsuarioService, private http: HttpClient) { }



  crearMovimiento(movimiento: Movimiento) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioService.getToken()
    });

    let url = `${environment.API_URL}/entradaSalida`;
    return this.http.post<CUDResponse>(url, movimiento, { headers: reqHeader });
  }
}
