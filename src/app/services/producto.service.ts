import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators'
import { CUDResponse, Producto } from 'src/app/model/interfaces';
import { Busqueda } from 'src/app/model/clases';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private usuarioService:UsuarioService, private http: HttpClient) { }


  productos() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioService.getToken()
    })

    let url = `${environment.API_URL}/producto`;
    return this.http.get(url, { headers: reqHeader });
  }

  crearProducto(producto: Producto) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioService.getToken()
    });

    let url = `${environment.API_URL}/producto`;
    return this.http.post<CUDResponse>(url, producto, { headers: reqHeader });
  }

  producto(id: number) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioService.getToken()
    })

    let url = `${environment.API_URL}/producto/${id}`;
    return this.http.get(url, { headers: reqHeader });
  }


  buscar(bus: Busqueda) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioService.getToken()
    })

    let url = `${environment.API_URL}/producto/buscar`;
    return this.http.post(url, bus, { headers: reqHeader });
  }

  movimientos(productoId: number) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.usuarioService.getToken()
    })

    let url = `${environment.API_URL}/producto/reporte/${productoId}`;
    return this.http.get(url, { headers: reqHeader });
  }

}
