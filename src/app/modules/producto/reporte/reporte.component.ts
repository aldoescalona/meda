import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto, Movimiento } from 'src/app/model/interfaces';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  movimientos: Movimiento[] = [];
  cargando: boolean = false;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    private productoService: ProductoService) {

      activatedRoute.params.subscribe(params => {

        let productoId = params['productoId'];
        
        console.log(productoId);
        this.cargaProductos(productoId);
  
       
  
      });

     }

  ngOnInit() {
  }

  cargaProductos(productoId: number){
    this.cargando = true;
    this.productoService.movimientos(productoId).subscribe((data: Movimiento[]) => {
      this.movimientos = data;
      console.log(data);
      this.cargando = false;
    });
  }

}
