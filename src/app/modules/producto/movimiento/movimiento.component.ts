import { Component, OnInit } from '@angular/core';
import { Movimiento, Producto, CUDResponse } from 'src/app/model/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { MovimientoService } from 'src/app/services/movimiento.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  cargando: boolean = false;
  producto: Producto;
  titulo: string = '';
  movimiento: Movimiento = null;
  tipoEnu: string = '';


  forma: FormGroup = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
    motivo: new FormControl('', [Validators.required, Validators.maxLength(45)]),
  });

  get cantidad(): any { return this.forma.get('cantidad'); }
  get motivo(): any { return this.forma.get('motivo'); }


  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    private productoService: ProductoService,
    private movimientoService: MovimientoService) {

    activatedRoute.params.subscribe(params => {

      let productoId = params['productoId'];
      let tipo = params['tipo'];

      this.cargaProducto(productoId);

      console.log(productoId, tipo);

      if (tipo === 'e') {
        this.titulo = 'Entrada';
        this.tipoEnu = 'ENTRADA';
      } else if (tipo === 's') {
        this.titulo = 'Salida';
        this.tipoEnu = 'SALIDA';
      }


    });

  }

  ngOnInit() {

  }

  cargaProducto(id: number) {
    this.cargando = true;
    this.productoService.producto(id).subscribe((data: Producto) => {
      this.producto = data;
      console.log(data);
      this.cargando = false;
    });
  }

  guardar() {
    this.movimiento = this.forma.value;
    this.movimiento.tipo = this.tipoEnu;
    this.movimiento.productoId = this.producto;

    console.log(this.movimiento);
    
    this.movimientoService.crearMovimiento(this.movimiento).subscribe((data: CUDResponse) => {
      swal(this.titulo +  ' creada', 'Creado correctamente', 'success');
      this.router.navigate(['/productos']);
    });

  }
}
