export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Optionnel car pas toujours nécessaire
  phone_number: string;
}
