export interface UpdateRespiration {
  id: number;
  name: string;
  description: string;
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  cycles: number;
  duration: number; // en minutes
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
}
