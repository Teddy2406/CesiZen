import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {Respiration} from '../interface/Respiration';
import {RespirationService} from '../../services/respiration.Service';


@Component({
  selector: 'app-respiration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './respiration.component.html',
  styleUrls: ['./respiration.component.css']
})
export class RespirationComponent implements OnInit, OnDestroy {


  // État de l'exercice
  respiration!: Respiration;
  respirations!: Respiration[];
  isExerciseActive: boolean = false;
  currentPhase: 'inhale' | 'hold' | 'exhale' | 'pause' = 'inhale';
  currentCycle: number = 0;
  timeRemaining: number = 0;
  totalTimeRemaining: number = 0;

  // Timer
  private timer: any;
  private phaseTimer: any;

  // Audio
  isAudioEnabled: boolean = true;

  constructor(private router: Router, private respirationService: RespirationService) {}

  ngOnInit(): void {
    this.respirationService.getAllRespiration().subscribe((datas) => {
      this.respirations = datas
    })
  }

  ngOnDestroy(): void {
    this.stopExercise();
  }

  // Sélectionner une technique
  selectTechnique(respire: Respiration): void {
    this.respiration = respire;
    this.currentCycle = 0;
    this.timeRemaining = 0;
    this.currentPhase = 'inhale';
  }

  // Démarrer l'exercice
  startExercise(): void {
    if (!this.respiration) return;

    this.isExerciseActive = true;
    this.currentCycle = 1;
    this.currentPhase = 'inhale';
    this.timeRemaining = this.respiration.inhaleTime;
    this.totalTimeRemaining = this.respiration.duration * 60;

    this.runExerciseCycle();
    this.startTotalTimer();
  }

  // Arrêter l'exercice
  stopExercise(): void {
    this.isExerciseActive = false;
    this.clearTimers();
    this.currentCycle = 0;
    this.timeRemaining = 0;
    this.currentPhase = 'inhale';
  }

  // Mettre en pause/reprendre
  togglePause(): void {
    if (this.isExerciseActive) {
      this.clearTimers();
      this.isExerciseActive = false;
    } else {
      this.isExerciseActive = true;
      this.runExerciseCycle();
      this.startTotalTimer();
    }
  }

  // Exécuter un cycle de respiration
  private runExerciseCycle(): void {
    if (!this.respiration || !this.isExerciseActive) return;

    this.phaseTimer = setInterval(() => {
      this.timeRemaining--;

      if (this.timeRemaining <= 0) {
        this.nextPhase();
      }
    }, 1000);
  }

  // Passer à la phase suivante
  private nextPhase(): void {
    if (!this.respiration) return;

    switch (this.currentPhase) {
      case 'inhale':
        if (this.respiration.holdTime > 0) {
          this.currentPhase = 'hold';
          this.timeRemaining = this.respiration.holdTime;
        } else {
          this.currentPhase = 'exhale';
          this.timeRemaining = this.respiration.exhaleTime;
        }
        break;

      case 'hold':
        this.currentPhase = 'exhale';
        this.timeRemaining = this.respiration.exhaleTime;
        break;

      case 'exhale':
        this.currentCycle++;
        if (this.currentCycle <= this.respiration.cycles) {
          this.currentPhase = 'pause';
          this.timeRemaining = 2; // Pause de 2 secondes entre les cycles
        } else {
          this.completeExercise();
          return;
        }
        break;

      case 'pause':
        this.currentPhase = 'inhale';
        this.timeRemaining = this.respiration.inhaleTime;
        break;
    }

    if (this.isAudioEnabled) {
      this.playPhaseSound();
    }

    clearInterval(this.phaseTimer);
    this.runExerciseCycle();
  }

  // Timer total
  private startTotalTimer(): void {
    this.timer = setInterval(() => {
      this.totalTimeRemaining--;

      if (this.totalTimeRemaining <= 0) {
        this.completeExercise();
      }
    }, 1000);
  }

  // Terminer l'exercice
  private completeExercise(): void {
    this.stopExercise();
    alert('Félicitations ! Vous avez terminé votre exercice de respiration. 🎉');
  }

  // Nettoyer les timers
  private clearTimers(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.phaseTimer) {
      clearInterval(this.phaseTimer);
    }
  }

  // Jouer un son selon la phase (simulation)
  private playPhaseSound(): void {
    // Ici vous pourriez intégrer une vraie API audio
    console.log(`🔊 Son pour la phase: ${this.currentPhase}`);
  }

  // Basculer l'audio
  toggleAudio(): void {
    this.isAudioEnabled = !this.isAudioEnabled;
  }

  // Retourner à l'accueil
  goBack(): void {
    this.router.navigate(['/home']);
  }

  // Obtenir le texte d'instruction selon la phase
  getPhaseInstruction(): string {
    switch (this.currentPhase) {
      case 'inhale':
        return 'Inspirez';
      case 'hold':
        return 'Retenez';
      case 'exhale':
        return 'Expirez';
      case 'pause':
        return 'Pause';
      default:
        return '';
    }
  }

  // Obtenir la couleur selon la phase
  getPhaseColor(): string {
    switch (this.currentPhase) {
      case 'inhale':
        return '#4CAF50'; // Vert
      case 'hold':
        return '#FF9800'; // Orange
      case 'exhale':
        return '#2196F3'; // Bleu
      case 'pause':
        return '#9E9E9E'; // Gris
      default:
        return '#333';
    }
  }

  // Formater le temps en mm:ss
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Obtenir la couleur selon la difficulté
  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Débutant':
        return '#4CAF50';
      case 'Intermédiaire':
        return '#FF9800';
      case 'Avancé':
        return '#F44336';
      default:
        return '#333';
    }
  }
}
