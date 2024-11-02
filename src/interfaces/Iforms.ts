export interface ILoginForm {
  email: string;
  password: string;
}

export interface IOrder {
  userId: string;
  //status: string;
  status_sub?: boolean;
}

export interface IRegisterForm extends ILoginForm {
  name: string;
  address: string;
  phone: string;
  confirmPassword: string;
  userId?: number;
  //orders?: IOrder[];
}

// Mantiene la estructura de ISubscription
export interface ISubscription {
  end_sub: Date;
  id: string;
  start_sub: Date;
  status_sub: boolean;
}

// Ajusta IUserSession para que incluya ISubscription como Subscription en user
export interface IUserSession {
  success?: boolean;
  userPayload: {
    id?: string;
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    imgProfile?: string;
    typeUser?: string;
    statusUser?: boolean;
    status_sub?: boolean;
    Subscription?: ISubscription | null; // Aquí, el campo Subscription de tipo ISubscription o null
  };
  token?: string;
}

export interface IUserLogin {
  success?: boolean;
  userPayload: {
    id?: string;
    email?: string;
    address?: string | null;
    phone?: string | null;
    imgProfile?: string;
    typeUser?: string;
    statusUser?: boolean;
    status_sub?: boolean;
  };
  token?: string;
}

export interface IUserNavigator {
  success?: boolean;
  userPayload?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    address?: string | null;
    phone?: string | null;
    imgProfile?: string | null;
    typeUser?: string | null;
    statusUser?: boolean | null;
    status_sub?: boolean | null;
    Subscription?: ISubscription | null;
  };
  token?: string;
}
