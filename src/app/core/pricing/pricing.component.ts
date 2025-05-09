import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
plans = [
    {
      nombre: "Básico",
      descripcion: "Perfecto para pequeños negocios",
      precio: 0,
      beneficios: [
        { texto: "Hasta 100 productos", activo: true },
        { texto: "5 categorías", activo: true },
        { texto: "Gráficos básicos", activo: true },
        { texto: "Alertas por email", activo: false },
        { texto: "Soporte prioritario", activo: false },
      ],
      boton: "Comenzar gratis",
      destacado: false,
    },
    {
      nombre: "Profesional",
      descripcion: "Para negocios en crecimiento",
      precio: 19,
      beneficios: [
        { texto: "Hasta 1,000 productos", activo: true },
        { texto: "Categorías ilimitadas", activo: true },
        { texto: "Gráficos avanzados", activo: true },
        { texto: "Alertas por email", activo: true },
        { texto: "Soporte prioritario", activo: true },
      ],
      boton: "Prueba gratuita",
      destacado: true,
    },
    {
      nombre: "Empresa",
      descripcion: "Para grandes volúmenes",
      precio: 49,
      beneficios: [
        { texto: "Productos ilimitados", activo: true },
        { texto: "Categorías ilimitadas", activo: true },
        { texto: "Gráficos premium", activo: true },
        { texto: "Alertas personalizadas", activo: true },
        { texto: "Soporte 24/7", activo: true },
      ],
      boton: "Contactar ventas",
      destacado: false,
    }
  ];
}
