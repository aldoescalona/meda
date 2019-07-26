import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { LoginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AdminComponent, children: [
      { path: 'productos', loadChildren: './modules/producto/producto.module#ProductoModule', canActivate: [ LoginGuard ]},
      { path: 'usuarios', loadChildren: './modules/usuario/usuario.module#UsuarioModule', canActivate: [ LoginGuard ] },
      { path: '', redirectTo: '/productos', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
