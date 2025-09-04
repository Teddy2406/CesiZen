export interface UserUpdateAdmin {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
