import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: any = [];

  constructor() { 
    this.cargaMenu();
  }

  cargaMenu( ){
    this.menu = [
      {
        nombre: "Productos",

        hijos: [
          { nombre: "Producto", icono: 'fa-tablets', url: "/productos" },
          { nombre: "Reporte", icono: 'fa-chart-bar', url: "/productos/busqueda" }          
        ]
      }];
  }
  
}
