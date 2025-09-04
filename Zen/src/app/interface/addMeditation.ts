export interface AddMeditation {
  title: string;
  description: string;
  theme: string;
  duration: number; // en minutes
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  instructor: string;
}
