import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from 'src/app/modules/producto/producto.component';
import { NuevoComponent } from 'src/app/modules/producto/nuevo/nuevo.component';
import { MovimientoComponent } from 'src/app/modules/producto/movimiento/movimiento.component';
import { BusquedaComponent } from 'src/app/modules/producto/busqueda/busqueda.component';
import { ReporteComponent } from 'src/app/modules/producto/reporte/reporte.component';

const routes: Routes = [
  {path: '', component: ProductoComponent},
  {path: 'nuevo', component: NuevoComponent},
  {path: 'movimiento/:tipo/:productoId', component: MovimientoComponent},
  {path: 'busqueda', component: BusquedaComponent},
  {path: 'reporte/:productoId', component: ReporteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
