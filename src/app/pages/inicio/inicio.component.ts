import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricingComponent } from '../../core/pricing/pricing.component';
import { TestimonioComponent } from "../../core/testimonio/testimonio.component";
import { Chart } from 'chart.js';
import { FeaturesComponent } from "../../core/features/features.component";

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterModule, PricingComponent, TestimonioComponent, FeaturesComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true
})
export class InicioComponent {
 
}
