import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginRegistroComponent } from './pages/login-registro/login-registro.component';
import { QuienesSomosComponent} from './pages/quienes-somos/quienes-somos.component'

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login-registro', component: LoginRegistroComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },

];
