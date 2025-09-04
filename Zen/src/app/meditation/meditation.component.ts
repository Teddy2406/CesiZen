import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {Meditation} from '../interface/Meditation';
import {MeditationService} from '../../services/meditation.Service';


interface MeditationTheme {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-meditation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css']
})
export class MeditationComponent implements OnInit, OnDestroy {

  // Thèmes de méditation
  themes: MeditationTheme[] = [
    {
      id: 'mindfulness',
      name: 'Pleine Conscience',
      icon: '🧘‍♀️',
      color: '#10b981',
      description: 'Développez votre attention au moment présent'
    },
    {
      id: 'stress',
      name: 'Anti-Stress',
      icon: '😌',
      color: '#3b82f6',
      description: 'Relâchez les tensions et retrouvez la sérénité'
    },
    {
      id: 'sleep',
      name: 'Sommeil',
      icon: '😴',
      color: '#6366f1',
      description: 'Préparez-vous à un sommeil réparateur'
    },
    {
      id: 'focus',
      name: 'Concentration',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Améliorez votre focus et votre productivité'
    },
    {
      id: 'confidence',
      name: 'Confiance',
      icon: '💪',
      color: '#ef4444',
      description: 'Renforcez votre estime de soi'
    },
    {
      id: 'gratitude',
      name: 'Gratitude',
      icon: '🙏',
      color: '#8b5cf6',
      description: 'Cultivez la reconnaissance et la joie'
    }
  ];



  // État du composant
  selectedTheme: string = 'all';
  meditation: Meditation | null = null;
  meditations!: Meditation[];
  med!: Meditation[];
  isSessionActive: boolean = false;
  currentTime: number = 0;
  totalDuration: number = 0;
  isPaused: boolean = false;

  // Timer
  private timer: any;

  // Audio
  isAudioEnabled: boolean = true;

  constructor(private router: Router, private meditationService: MeditationService) {}

  ngOnInit(): void {
    this.meditationService.getAllMeditation().subscribe((datas) => {
      this.meditations = datas
    })
  }

  ngOnDestroy(): void {
    this.stopSession();
  }

  // Filtrer par thème
  filterByTheme(themeId: string): void {
    this.selectedTheme = themeId;

    if (themeId === 'all') {
      this.meditations = this.med;
    } else {
      this.meditations = this.meditations.filter(meditation => meditation.theme === themeId);
    }
  }

  // Obtenir le thème par ID
  getThemeById(themeId: string): MeditationTheme | undefined {
    return this.themes.find(theme => theme.id === themeId);
  }

  // Sélectionner une session
  selectSession(meditation: Meditation): void {
    this.meditation = meditation;
    this.currentTime = 0;
    this.totalDuration = meditation.duration * 60; // Convertir en secondes
    this.isPaused = false;
  }

  // Démarrer la session
  startSession(): void {
    if (!this.meditation) return;

    this.isSessionActive = true;
    this.isPaused = false;
    this.startTimer();
  }

  // Arrêter la session
  stopSession(): void {
    this.isSessionActive = false;
    this.isPaused = false;
    this.clearTimer();
    this.currentTime = 0;
  }

  // Mettre en pause/reprendre
  togglePause(): void {
    if (this.isPaused) {
      this.isPaused = false;
      this.startTimer();
    } else {
      this.isPaused = true;
      this.clearTimer();
    }
  }

  // Démarrer le timer
  private startTimer(): void {
    this.timer = setInterval(() => {
      this.currentTime++;

      if (this.currentTime >= this.totalDuration) {
        this.completeSession();
      }
    }, 1000);
  }

  // Nettoyer le timer
  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // Terminer la session
  private completeSession(): void {
    this.stopSession();
    alert('🎉 Félicitations ! Vous avez terminé votre séance de méditation. Prenez un moment pour savourer cette sensation de calme.');
  }

  // Fermer la session
  closeSession(): void {
    this.meditation = null;
    this.stopSession();
  }

  // Basculer l'audio
  toggleAudio(): void {
    this.isAudioEnabled = !this.isAudioEnabled;
  }

  // Retourner à l'accueil
  goBack(): void {
    this.router.navigate(['/home']);
  }

  // Obtenir la couleur selon la difficulté
  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Débutant':
        return '#10b981';
      case 'Intermédiaire':
        return '#f59e0b';
      case 'Avancé':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  // Formater le temps en mm:ss
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Obtenir le pourcentage de progression
  getProgress(): number {
    if (this.totalDuration === 0) return 0;
    return (this.currentTime / this.totalDuration) * 100;
  }

  // Obtenir le temps restant
  getTimeRemaining(): number {
    return Math.max(0, this.totalDuration - this.currentTime);
  }

  // Obtenir une session recommandée
  getRecommendedSession(): Meditation {
    // Simple logique de recommandation - peut être améliorée
    const beginnerSessions = this.meditations.filter(s => s.difficulty === 'Débutant');
    return beginnerSessions[Math.floor(Math.random() * beginnerSessions.length)];
  }

  // Rechercher des sessions par durée
  filterByDuration(maxDuration: number): void {
    this.meditations = this.meditations.filter(meditation => meditation.duration <= maxDuration);
    this.selectedTheme = 'all';
  }

  // Obtenir le nombre de sessions par thème
  getSessionCountByTheme(themeId: string): number {
    return this.meditations.filter(meditation => meditation.theme === themeId).length;
  }

  navigateToMeditation(): void {
    this.router.navigate(['/meditation']);
  }
}
