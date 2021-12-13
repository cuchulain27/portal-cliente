import { HistorialCandidatoComponent } from './components/historial-candidato/historial-candidato.component';
import { ServiciosAsociadosComponent } from './components/servicios-asociados/servicios-asociados.component';
import { ValidadorComponent } from './components/validador/validador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { CierraBrechasComponent } from './components/cierra-brechas/cierra-brechas.component';
import { LevantaBrechaComponent } from './components/levanta-brecha/levanta-brecha.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/:tablero', component: LoginComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'validador', component: ValidadorComponent },
  { path: 'serviciosasociados', component: ServiciosAsociadosComponent },
  // { path: '**', redirectTo: '/login' },
  { path: 'tablero', redirectTo: '/login?tablero=1' },
  { path: 'tratabrechas', component: CierraBrechasComponent },
  {path:'levantabrecha', component:LevantaBrechaComponent},
  {path:'levantabrecha/:id', component:LevantaBrechaComponent},
  {path:'candidato/:hash', component:HistorialCandidatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
