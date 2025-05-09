import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';  // Importar isPlatformBrowser
import { PLATFORM_ID } from '@angular/core';  // Importar PLATFORM_ID

declare var Chart: any; // Declaramos el objeto Chart globalmente

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // Verificamos si estamos en el navegador antes de ejecutar el código de Chart.js
    if (isPlatformBrowser(this.platformId)) {
      this.createPieChart();
    }
  }

  createPieChart(): void {
    const ctx = (document.getElementById('pieChartCanvas') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['En stock', 'Bajo stock', 'Agotado'],
          datasets: [{
            label: 'Inventario',
            data: [65, 15, 20],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                padding: 20
              }
            }
          }
        }
      });
    }
  }
}
