export interface Meditation {
  meditationId: number;
  title: string;
  description: string;
  theme: string;
  duration: number; // en minutes
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  instructor: string;
}
