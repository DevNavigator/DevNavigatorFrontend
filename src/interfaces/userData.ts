export enum UserType {
  User = "USER",
  UserSubscribe = "USER_SUBSCRIBE",
  Admin = "ADMIN",
  SuperAdmin = "SUPER_ADMIN",
}

export interface UserData {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  password?: string;
  currentPassword?: string;
  statusUser?: boolean;
  userType?: UserType | string;
}
