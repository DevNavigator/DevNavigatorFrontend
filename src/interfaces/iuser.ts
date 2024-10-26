import { typeUser } from "./userData";

export interface IUser {
  id: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  imgProfile?: string;
  typeUser?: typeUser;
  statusUser?: boolean;
}
