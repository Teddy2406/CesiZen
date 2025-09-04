import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import {Respiration} from '../interface/Respiration';
import {Meditation} from '../interface/Meditation';
import {Ressource} from '../interface/Ressource';
import {AuthService} from '../../services/Auth.Service';
import {AddRespiration} from '../interface/addRespiration';
import {RespirationService} from '../../services/respiration.Service';
import {MeditationService} from '../../services/meditation.Service';
import {RessourceService} from '../../services/ressource.Service';
import {AddMeditation} from '../interface/addMeditation';
import {AddRessource} from '../interface/addRessource';
import {UpdateRessource} from '../interface/UpdateRessouce';
import {UpdateMeditation} from '../interface/UpdateMeditation';
import {UpdateRespiration} from '../interface/UpdateRespiration';

@Component({
  selector: 'app-add-exercice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.css']
})
export class AddExerciceComponent implements OnInit {
  respirations: Respiration[] = [];
  meditations: Meditation[] = [];
  ressources: Ressource[] = [];
  isLoadingResources: boolean = false;
  isLoadingMeditations: boolean = false;
  isLoadingRespirations: boolean = false;
  resourceError: string = '';
  respirationError: string = '';
  meditationError: string = '';
  respiration!: Respiration;
  meditation!: Meditation;
  ressource!: Ressource;
  IdModifiable!: number;
  upressource!: UpdateRessource[];
  upmeditation!: UpdateMeditation[];
  uprespiration!: UpdateRespiration[];
  activeTab: 'respiration' | 'meditation' | 'resource' = 'respiration';
  applyForm = new FormGroup({
    id: new FormControl(''),
    titre: new FormControl(''),
    description: new FormControl(''),
    contenu: new FormControl(''),
    theme: new FormControl(''),
    datePublication: new FormControl(''),
    tempsLecture: new FormControl(''),
  })

  // Formulaire respiration avec validation
  respirationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    inhaleTime: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)]),
    holdTime: new FormControl('', [Validators.min(0), Validators.max(30)]),
    exhaleTime: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)]),
    cycles: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50)]),
    duration: new FormControl('', [Validators.required, Validators.min(1), Validators.max(60)]),
    difficulty: new FormControl('', [Validators.required])
  });

  // Formulaire méditation avec validation
  meditationForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    theme: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.min(1), Validators.max(120)]),
    difficulty: new FormControl('', [Validators.required]),
    instructor: new FormControl('', [Validators.required])
  });

  // Formulaire ressource avec validation - CORRIGÉ pour correspondre au HTML
  resourceForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]), // Changé de 'titre' à 'title'
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormControl('', [Validators.required]), // Ajouté category
    type: new FormControl('', [Validators.required]), // Ajouté typeAjouté difficulty
    author: new FormControl('', [Validators.required]), // Ajouté author
    tempsLecture: new FormControl('',[Validators.required]),
    content: new FormControl('') // Ajouté content (optionnel)
  });

  isAdmin: boolean = false;

  // Options pour les sélects
  difficulties = ['Débutant', 'Intermédiaire', 'Avancé'];
  meditationThemes = ['mindfulness', 'stress', 'sleep', 'focus', 'confidence', 'gratitude'];
  resourceCategories = ['Bien-être', 'Santé mentale', 'Développement personnel', 'Mindfulness', 'Exercice'];
  resourceTypes = ['Article', 'Vidéo', 'PDF', 'Audio', 'Lien externe'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private respirationService: RespirationService,
    private meditationService: MeditationService,
    private ressourceService: RessourceService,
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.ressourceService.getAllRessource().subscribe((datas) => {
      this.ressources = datas;
    });
    this.meditationService.getAllMeditation().subscribe((datas) => {
      this.meditations = datas;
    });
    this.respirationService.getAllRespiration().subscribe((datas) => {
      this.respirations = datas;
    });
  }

  // Création du formulaire respiration
  createRespirationForm(form: FormGroup) {
    if (!this.isAdmin) return;

    // Marquer tous les champs comme touchés pour afficher les erreurs
    this.markFormGroupTouched(form);

    if (form.invalid) {
      return;
    }

    const addRespiration: AddRespiration = {
      name: form.value.name ?? '',
      description: form.value.description ?? '',
      inhaleTime: form.value.inhaleTime ?? '',
      holdTime: form.value.holdTime ?? '',
      exhaleTime: form.value.exhaleTime ?? '',
      cycles: form.value.cycles ?? '',
      duration: form.value.duration ?? '',
      difficulty: form.value.difficulty ?? '',
    }

    this.respirationService.AddRespiration(addRespiration).subscribe((respiration) => {
      this.respirations.push(respiration);
      this.respiration = respiration;
      form.reset();
    });
  }

  // Création du formulaire méditation
  createMeditationForm(form: FormGroup) {
    if (!this.isAdmin) return;

    // Marquer tous les champs comme touchés pour afficher les erreurs
    this.markFormGroupTouched(form);

    if (form.invalid) {
      return;
    }

    const addMeditation: AddMeditation = {
      title: form.value.title ?? '',
      description: form.value.description ?? '',
      theme: form.value.theme ?? '',
      duration: form.value.duration ?? '',
      difficulty: form.value.difficulty ?? '',
      instructor: form.value.instructor ?? '',
    }

    this.meditationService.AddMeditation(addMeditation).subscribe((meditation) => {
      this.meditations.push(meditation);
      this.meditation = meditation;
      form.reset();
    });
  }

  // Création du formulaire ressource - CORRIGÉ
  createResourceForm(form: FormGroup) {
    if (!this.isAdmin) return;

    // Marquer tous les champs comme touchés pour afficher les erreurs
    this.markFormGroupTouched(form);

    if (form.invalid) {
      return;
    }

    const addRessource: AddRessource = {
      titre: form.value.title ?? '', // Adaptation entre HTML (title) et interface (titre)
      description: form.value.description ?? '',
      contenu: form.value.content ?? '', // Adaptation entre HTML (content) et interface (contenu)
      theme: form.value.category ?? '', // Adaptation entre HTML (category) et interface (theme)
      datePublication: form.value.datePublication ?? '', // Date actuelle
      tempsLecture: form.value.tempsLecture ?? '', // Valeur par défaut
    }

    this.ressourceService.AddRessource(addRessource).subscribe((ressource) => {
      this.ressources.push(ressource);
      this.ressource = ressource;
      form.reset();
    });
  }

  // Changement d'onglet
  setActiveTab(tab: 'respiration' | 'meditation' | 'resource'): void {
    this.activeTab = tab;
  }

  // Utilitaires
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormArray) {
        control.controls.forEach(c => c.markAsTouched());
      }
    });
  }

  hasError(form: FormGroup, fieldName: string, errorType: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.hasError(errorType) && field.touched);
  }

  getErrorMessage(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} est requis`;
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} trop court`;
      if (field.errors['min']) return `Valeur trop petite`;
      if (field.errors['max']) return `Valeur trop grande`;
    }
    return '';
  }

  // Helper pour obtenir le nom d'affichage du champ
  getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'name': 'Le nom',
      'title': 'Le titre',
      'description': 'La description',
      'inhaleTime': 'Le temps d\'inspiration',
      'exhaleTime': 'Le temps d\'expiration',
      'cycles': 'Le nombre de cycles',
      'duration': 'La durée',
      'difficulty': 'La difficulté',
      'theme': 'Le thème',
      'instructor': 'L\'instructeur',
      'category': 'La catégorie',
      'type': 'Le type',
      'author': 'L\'auteur'
    };
    return displayNames[fieldName] || fieldName;
  }

  // Navigation
  goBack(): void {
    this.router.navigate(['/admin']); // Ajustez selon votre routing
  }

  deleteRessource(id: number): void {
    if (!this.isAdmin) return;
    if (confirm(`voulez vous vraiment supprimer cette ressource`))
      this.ressourceService.deleteRessourceById(id).subscribe(() => {
        this.ressources = this.ressources.filter((ressource) => ressource.id !== id);
      });
  }

  updateRessource(form: FormGroup) {
    if (!this.isAdmin) return;
    const ressourceUpdate: UpdateRessource= {
      id: this.IdModifiable ?? '',
      titre: form.value.titre ?? '',
      description: form.value.description ?? '',
      contenu: form.value.contenu ?? '',
      theme: form.value.theme ?? '',
      datePublication: form.value.datePublication ?? '',
      tempsLecture: form.value.tempsLecture ?? '',

    }
    this.ressourceService.updateRessource(ressourceUpdate).subscribe(ressourceUpdate => {
      const ressourceAModifier = this.upressource.filter(ressourceList => ressourceList.id == ressourceUpdate.id).at(0);
      if (ressourceAModifier) {
        ressourceAModifier.id = ressourceUpdate.id;
        ressourceAModifier.titre = ressourceUpdate.titre;
        ressourceAModifier.description = ressourceUpdate.description;
        ressourceAModifier.contenu = ressourceUpdate.contenu;
        ressourceAModifier.theme = ressourceUpdate.theme;
        ressourceAModifier.datePublication = ressourceUpdate.datePublication;
        ressourceAModifier.tempsLecture = ressourceUpdate.tempsLecture
      }
    });
    form.reset()
  }

  updateRespiration(res: Respiration) {

  }

  deleteRespiration(respirationId: number) {
    if (!this.isAdmin) return;
    if (confirm(`voulez vous vraiment supprimer cette ressource`))
      this.respirationService.deleteRespirationById(respirationId).subscribe(() => {
        this.respirations = this.respirations.filter((respiration) => respiration.respirationId !== respirationId);
      });
  }

  updateMeditation(med: Meditation) {

  }

  deleteMeditation(meditationId: number) {
    if (!this.isAdmin) return;
    if (confirm(`voulez vous vraiment supprimer cette ressource`))
      this.meditationService.deleteMeditationById(meditationId).subscribe(() => {
        this.meditations = this.meditations.filter((meditation) => meditation.meditationId !== meditationId);
      });
  }
}
