import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddExerciceComponent } from '../add-exercice/add-exercice.component';
import { UserService } from '../../services/user.Service';
import {AuthService} from '../../services/Auth.Service';
import {UserProfile} from '../interface/UserProfile';
import {FormControl, FormGroup} from '@angular/forms';
import {UserProfileUpdate} from '../interface/UserProfileUpdate';
import {UserUpdateAdmin} from '../interface/UserUpdateAdmin';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, AddExerciceComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  activeSection: 'dashboard' | 'content' | 'users' | 'analytics' = 'dashboard';

  // Données
  isAdmin: boolean = false;
  users!: UserProfile[];
  isLoadingUsers: boolean = false;
  userError: string = '';
  IdModifiable!: number;
  usersRole!: UserProfileUpdate[];
  applyForm = new FormGroup({
    username: new FormControl(''),
    email: new  FormControl(''),
    phone_number: new  FormControl(''),
    role: new FormControl('')
  });
  appliForm = new FormGroup({
    username: new FormControl(''),
    role: new FormControl('')
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentActivities();
    this.userService.getAllUser().subscribe((datas) => {
      this.users = datas;
    });
    this.isAdmin = this.authService.isAdmin();

  }

  // Navigation entre sections
  setActiveSection(section: 'dashboard' | 'content' | 'users' | 'analytics'): void {
    this.activeSection = section;

  }

  // Charger les statistiques
  loadStats(): void {

  }

  // Charger les activités récentes
  loadRecentActivities(): void {

  }


  // Filtrer les utilisateurs
  searchUsers(searchTerm: string): UserProfile[] {
    if (!searchTerm.trim()) {
      return this.users;
    }

    return this.users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Actions rapides
  quickActions = [
    {
      title: 'Ajouter du contenu',
      description: 'Créer une nouvelle technique, méditation ou ressource',
      icon: '➕',
      action: () => this.setActiveSection('content'),
      color: '#10b981'
    },
    {
      title: 'Voir les utilisateurs',
      description: 'Gérer les comptes utilisateurs',
      icon: '👥',
      action: () => this.setActiveSection('users'),
      color: '#3b82f6'
    },
    {
      title: 'Paramètres',
      description: 'Configuration de l\'application',
      icon: '⚙️',
      action: () => this.openSettings(),
      color: '#64748b'
    }
  ];

  // Actions
  openSettings(): void {
    alert('Fonction de paramètres à implémenter');
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  // Méthodes pour refresh les données
  refreshData(): void {
    this.router.navigate(['/admin']);
    this.loadStats();
    this.loadRecentActivities();
  }



  updateProfile(form: FormGroup) {
    // Vérifications préliminaires
    if (!this.isAdmin) {
      console.warn('Action non autorisée');
      return;
    }

    if (!form.valid) {
      console.log('Formulaire invalide');
      form.markAllAsTouched(); // Affiche les erreurs
      return;
    }

    if (!this.IdModifiable) {
      console.error('Aucun utilisateur sélectionné');
      return;
    }

    const userUpdate: UserProfileUpdate = {
      userId: this.IdModifiable,
      username: form.value.username?.trim() || '',
      email: form.value.email?.trim() || '',
      phone_number: form.value.phone_number?.trim() || '',
      role: form.value.role || ''
    };

    // Ajoutez un indicateur de chargement si nécessaire
    // this.isLoading = true;

    this.userService.updateUser(userUpdate).subscribe({
      next: (response) => {
        console.log('Réponse du serveur:', response);

        // Mettez à jour la liste locale
        const index = this.usersRole.findIndex(user => user.userId === response.userId);
        if (index !== -1) {
          this.usersRole[index] = { ...this.usersRole[index], ...response };
          // Force la détection de changements
          this.usersRole = [...this.usersRole];
        }

        // Réinitialisez le formulaire
        form.reset(); // Réinitialisez la sélection

        // Notification de succès
        // this.showSuccessMessage('Utilisateur mis à jour avec succès');

      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        // Gérez l'erreur selon votre besoin
        // this.showErrorMessage('Erreur lors de la mise à jour');
      },
      complete: () => {
        // this.isLoading = false;
      }
    });
  }

  DeleteUser(id: number): void {
    if (!this.isAdmin) return;
    if (confirm(`voulez vous vraiment supprimer ce user`))
    this.userService.deleteUserById(id).subscribe(() => {
      this.users = this.users.filter((user) => user.userId !== id);
    });
  }
}
