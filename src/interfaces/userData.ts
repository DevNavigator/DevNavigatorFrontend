export enum typeUser {
    admin = "admin",
    superAdmin = "superAdmin",
    user = "user"
  }


export interface UserData {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
    currentPassword?: string;
    statusUser?: boolean;
    typeUser?: typeUser;
  }