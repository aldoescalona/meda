import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/interfaces';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { Busqueda } from 'src/app/model/clases';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {


  productos: Producto[] = [];
  cargando: boolean = false;

  termino: string = '';

  constructor(private productoService:ProductoService, public router: Router) { }

  ngOnInit() {
  }

  buscar(){
    console.log('Buscar...', this.termino);
    let bus:Busqueda = new Busqueda(this.termino);
    this.cargando = true;
    this.productoService.buscar(bus).subscribe((data: Producto[]) => {
      this.productos = data;
      this.cargando = false;
    });
  }


  verReporte(producto: Producto){
    this.router.navigate(['/producto/reporte']);
    console.log(producto);
  }
}
