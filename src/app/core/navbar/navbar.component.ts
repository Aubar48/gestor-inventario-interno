import { CommonModule } from '@angular/common';
import { Component, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkModeService } from './../../services/dark-mode/dark-mode.service';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   constructor(private darkModeService: DarkModeService) {}

  // Método para alternar el modo oscuro
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  // Método para saber si está activado el modo oscuro
  get isDarkMode$() {
    return this.darkModeService.isDarkMode$;
  }

}
