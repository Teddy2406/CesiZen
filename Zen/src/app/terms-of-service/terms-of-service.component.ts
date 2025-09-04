import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})
export class TermsOfServiceComponent {
  lastUpdated: string = 'Janvier 2025';
  effectiveDate: string = '1er février 2025';

  constructor() { }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  acceptTerms(): void {
    // Logique pour accepter les conditions
    console.log('Conditions d\'utilisation acceptées');
    // Redirection ou traitement selon vos besoins
  }

  downloadTerms(): void {
    // Logique pour télécharger les conditions en PDF
    console.log('Téléchargement des conditions d\'utilisation');
  }

  reportViolation(): void {
    // Logique pour signaler une violation
    console.log('Signalement d\'une violation');
  }
}

