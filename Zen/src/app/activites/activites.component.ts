import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activites',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './activites.component.html',
  styleUrl: './activites.component.css'
})
export class ActivitesComponent {

  constructor(private router: Router) {}



  navigateToMeditation(): void {
    this.router.navigate(['/meditation']);
  }

  navigateToRespiration(): void {
    this.router.navigate(['/respiration']);
  }

  navigateToRessources(): void {
    this.router.navigate(['/ressources']);
  }
}
