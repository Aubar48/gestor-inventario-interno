import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject: BehaviorSubject<boolean>;

  constructor() {
    // Verificar si estamos en un entorno del navegador
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

    // Si estamos en el navegador, obtenemos la preferencia del localStorage
    const savedDarkMode = isBrowser ? localStorage.getItem('darkMode') === 'true' : false;

    this.darkModeSubject = new BehaviorSubject<boolean>(savedDarkMode);
    if (isBrowser) {
      this.applyDarkMode(savedDarkMode); // Aplica el modo solo si estamos en el navegador
    }
  }

  // Devuelve un observable para que los componentes puedan suscribirse al estado del modo oscuro
  get isDarkMode$() {
    return this.darkModeSubject.asObservable();
  }

  // Cambia el modo oscuro
  toggleDarkMode(): void {
    const newMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newMode);
    this.applyDarkMode(newMode);

    // Solo guardar la preferencia si estamos en el navegador
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem('darkMode', newMode.toString());
    }
  }

  // Aplica el modo oscuro a la aplicación (cambia la clase del body)
  private applyDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
