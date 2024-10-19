export const validateName = (name: string) => {
  let validation = '';
  const regexName = /^[a-zA-Z\s]+$/;
  if (!regexName.test(name)) validation = 'El nombre no es valido';
  return validation;  
}

export const validateEmail = (email: string) => {
  let validation = '';
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) validation = 'El email no es valido';

  return validation;
};

export const validatePassword = (password: string) => {
  let validation = '';
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{8,20}$/;
  if (!regexPassword.test(password))
    validation =
      'Tiene que contener almenos una letra mayuscula, una minuscula, un numero, un caracter especial y entre 8 y 20 caracteres';

  return validation;
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  let validation = '';
  if (password !== confirmPassword)
    validation = 'Las contraseñas no coinciden';
  return validation;
};


export const validateAddress = (address: string) => {
  let validation = '';
  const regexAddress =
    /.{8}/;
  if (!regexAddress.test(address))
    validation =
      'Tiene que contener 8 caracteres ó más';

  return validation;
};

export const validatePhone = (phone: string) => {
  let validation = '';
  const regexPhone = /^\d{10,}$/; // Acepta mínimo 10 dígitos o más

  if (!regexPhone.test(phone)) {
    validation = 'El número debe tener un mínimo de 10 dígitos';
  }

  return validation;
};

