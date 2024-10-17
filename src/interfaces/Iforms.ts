export interface ILoginForm {
  email: string;
  password: string;
}

 export interface IOrder {
   id: number;
   status: string;
   date: string;
 }
export interface IRegisterForm extends ILoginForm {
  name: string;
  address: string;
  phone: string;
  confirmPassword: string;
  userId?: number;
  orders?: IOrder[];

}
export interface IUserSession {
  login: boolean;
  user: IRegisterForm;
  token: string;
}
