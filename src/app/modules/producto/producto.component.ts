import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/interfaces';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  cargando: boolean = false;

  constructor(private productoService: ProductoService, public router: Router) { }

  ngOnInit() {
    this.cargaProductos();
  }

  cargaProductos(){
    this.cargando = true;
    this.productoService.productos().subscribe((data: Producto[]) => {
      this.productos = data;
      console.log(data);
      this.cargando = false;
    });
  }

  nuevoProducto(){
    this.router.navigate(['/productos/nuevo']);
  }

}
