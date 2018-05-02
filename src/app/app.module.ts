import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { routing, appRoutingProviders } from './route/route-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpModule } from '@angular/http';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TableComponent } from './components/generales/table/table.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AddCategoriaComponent } from './components/categorias/add-categoria/add-categoria.component';
import { ModalConceptosComponent } from './components/categorias/modal-conceptos/modal-conceptos.component';

//guards
import { RutaGuard }  from './validacion/ruta.guard';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CategoriasComponent,
    AddCategoriaComponent,
    TableComponent,
    ModalConceptosComponent,
    MovimientoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    SweetAlert2Module.forRoot()
  ],
  providers: [appRoutingProviders, RutaGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
