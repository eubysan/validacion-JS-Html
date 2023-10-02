export function valida(input) {
  const tipoInput = input.dataset.tipo;

  if (validadores[tipoInput]) {
    validadores[tipoInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(
      tipoInput,
      input
    );
  }
}

const tipoDeErrores = ['valueMissing', 'typeMismatch', 'patternMismatch', 'customError'];

const mensajesDeError = {
  nombre: {
    valueMissing: 'El nombre no puede ir vacio',
  },
  email: {
    valueMissing: 'El email no puede ir vacio',
    typeMismatch: 'El correo no es valido',
  },
  password: {
    valueMissing: 'La contraseña no puede ir vacio',
    patternMismatch:
      'Mínimo 6 y máximo 12 caracteres, al menos una letra mayúscula, una letra minúscula, un número y no debe tener carácter especial.',
  },
  nacimiento: {
    valueMissing: 'Este campo no puede ir vacio',
    customError: 'Debes tener al menos 18 años de edad',
  },
  numero: {
    valueMissing: 'Este campo no puede estar vacio',
    patternMismatch: 'El formato requerido es 1234567890 10 números',
  },
  direccion: {
    valueMissing: 'Esta direccion no puede estar vacio',
    patternMismatch: 'Debe tener al menos de 6 a 40 caracteres',
  },
  ciudad: {
    valueMissing: 'La ciudad no puede estar vacio',
    patternMismatch: 'Debe tener al menos de 6 a 40 caracteres',
  },
  estado: {
    valueMissing: 'El estado no puede estar vacio',
    patternMismatch: 'Debe tener al menos de 6 a 40 caracteres',
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input) {
  let mensaje = '';

  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoInput][error]);
      mensaje = mensajesDeError[tipoInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = '';
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = 'Debes tener al menos 18 años de edad';
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDay()
  );
  return diferenciaFechas <= fechaActual;
}
