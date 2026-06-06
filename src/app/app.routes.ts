import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecetasComponent } from './pages/recetas/recetas.component';
import { DetalleRecetaComponent } from './pages/detalle-receta/detalle-receta.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { VariosComponent } from './pages/varios/varios.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { GlosarioComponent } from './pages/glosario/glosario.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SobreMiComponent } from './pages/sobre-mi/sobre-mi.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'recetas/:id', component: DetalleRecetaComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categorias/:categoria', component: RecetasComponent },
  { path: 'varios', component: VariosComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'glosario', component: GlosarioComponent },
  { path: 'sobre-mi', component: SobreMiComponent },
  { path: '**', component: NotFoundComponent },
];
