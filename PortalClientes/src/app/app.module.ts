import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutorizaComponent } from './components/autoriza/autoriza.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { AgGridModule } from 'ag-grid-angular';
import { JwtInterceptorInterceptor } from './services/jwt-interceptor.interceptor';
import { NavComponent } from './components/SharedComponents/nav/nav.component';
import { FooterComponent } from './components/SharedComponents/footer/footer.component';
import { BtnCellGridComponent } from './components/btn-cell-grid/btn-cell-grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppToastComponent } from './components/SharedComponents/app-toast/app-toast.component';
import { ValidadorComponent } from './components/validador/validador.component';
import { RunPipe } from './pipe/run.pipe';
import { ServiciosAsociadosComponent } from './components/servicios-asociados/servicios-asociados.component';
import { CierraBrechasComponent } from './components/cierra-brechas/cierra-brechas.component';
import { BtnCellGridBrechaComponent } from './components/btn-cell-grid-brecha/btn-cell-grid-brecha.component';
import { LevantaBrechaComponent } from './components/levanta-brecha/levanta-brecha.component';
import { HistorialCandidatoComponent } from './components/historial-candidato/historial-candidato.component';
import { SpinnerComponent } from './components/sharedComponents/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AutorizaComponent,
    BusquedaComponent,
    NavComponent,
    FooterComponent,
    BtnCellGridComponent,
    AppToastComponent,
    ValidadorComponent,
    RunPipe,
    ServiciosAsociadosComponent,
    CierraBrechasComponent,
    BtnCellGridBrechaComponent,
    LevantaBrechaComponent,
    HistorialCandidatoComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([BtnCellGridComponent]),
    NgbModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
