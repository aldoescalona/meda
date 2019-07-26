import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';
import { CompModule } from 'src/app/comp/comp.module';
import { NuevoComponent } from './nuevo/nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { ReporteComponent } from './reporte/reporte.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [ProductoComponent, NuevoComponent, MovimientoComponent, ReporteComponent, BusquedaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductoRoutingModule,
    CompModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
