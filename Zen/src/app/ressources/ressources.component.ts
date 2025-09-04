import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Ressource} from '../interface/Ressource';
import {RessourceService} from '../../services/ressource.Service';



@Component({
  selector: 'app-ressources',
  standalone: true,
  templateUrl: './ressources.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./ressources.component.css']
})
export class RessourcesComponent implements OnInit {
  ressources!: Ressource[] ;
  themes: string[] = [];
  themeSelectionne: string = 'Tous';
  RessourceSelectionne: Ressource | null = null;
  modeDetail: boolean = false;

  constructor(
    private ressourceService: RessourceService,
  ) {}

  ngOnInit(): void {
    this.ressourceService.getAllRessource().subscribe((datas) => {
      this.ressources = datas
    });
  }

  filtrerParTheme(theme: string): void {
    this.themeSelectionne = theme;
    if (theme === 'Tous') {
      this.ressources = [...this.ressources];
    } else {
      this.ressources = this.ressources.filter(ressource => ressource.theme === theme);
    }
  }

  ouvrirArticle(ressource: Ressource): void {
    this.RessourceSelectionne = ressource;
    this.modeDetail = true;
  }

  fermerArticle(): void {
    this.RessourceSelectionne = null;
    this.modeDetail = false;
  }

  formaterDate(dateInput: string | Date | null | undefined): string {
    if (!dateInput) { return ''; }

    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) { return ''; }

    return d.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
