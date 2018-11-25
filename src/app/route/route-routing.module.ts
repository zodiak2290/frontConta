import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CategoriasComponent } from '../components/categorias/categorias.component';
import { EstadisticasComponent } from '../components/estadisticas/estadisticas.component';
import { RutaGuard }  from '../validacion/ruta.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [RutaGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'categorias', component: CategoriasComponent, canActivate: [RutaGuard] },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [RutaGuard] }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
