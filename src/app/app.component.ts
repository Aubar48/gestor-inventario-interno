import { Component } from '@angular/core';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { FooterComponent } from "./core/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-inventario-interno';
}
