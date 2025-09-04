import { Component } from '@angular/core';

@Component({
  selector: 'app-data-protection',
  standalone: true,
  templateUrl: './data-protection.component.html',
  styleUrls: ['./data-protection.component.css']
})
export class DataProtectionComponent {
  lastUpdated: string = 'Janvier 2025';

  constructor() { }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadDataRequest(): void {
    // Logique pour télécharger un formulaire de demande de données
    console.log('Téléchargement du formulaire de demande de données');
  }

  submitDataRequest(): void {
    // Logique pour soumettre une demande de données
    console.log('Soumission de la demande de données');
  }
}
