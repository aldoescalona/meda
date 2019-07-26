import { Component, OnInit } from '@angular/core';
import { Producto, CUDResponse } from 'src/app/model/interfaces';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  cargando: boolean = false;
  producto:Producto = {nombre: '', descripcion: '', lote:''};

  
  forma:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    lote: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    caducidad: new FormControl(null, Validators.required),
  });

  get nombre(): any { return this.forma.get('nombre'); }
  get descripcion(): any { return this.forma.get('descripcion'); }
  get lote(): any { return this.forma.get('lote'); }
  get caducidad(): any { return this.forma.get('caducidad'); }

  constructor(private productoService:ProductoService, public router: Router) { }

  ngOnInit() {
  }

  guardar(){
    
    // console.log(this.forma);
    this.producto = this.forma.value;

    this.producto.caducidad = new Date(this.producto.caducidad);

    console.log(this.producto);

    this.productoService.crearProducto(this.producto).subscribe((data:CUDResponse) => {
      console.log(data);
      swal('Producto creado', 'Creado correctamente', 'success');
      this.router.navigate(['/productos']);
    });

  }

  dateChanged(date: string): Date | null {

    // console.log(date);

    let fecha = !!date ? new Date(date) : null;
    // console.log(fecha);
    return fecha;
  }
}
