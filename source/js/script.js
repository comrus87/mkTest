'use strict';

const ERROR_EMAIL_MESSAGE = 'Введите корректный e-mail';
const ERROR_NICKNAME_MESSAGE = 'Никнейм должен начинаться с буквы и содержать от 3 до 40 символов, латинские буквы, цифры, символ подчеркивания (_), символ(;)';
const ERROR_PASSWORD_MESSAGE = 'Пароль не должен совпадать с ником или почтовым адресом';
const ERROR_REPEAT_MESSAGE = 'Введенные пароли не совпадают'
const btnMain = document.querySelector('.page-main__button');
const overlay = document.querySelector('.overlay-modal');
const btnCLoseModal = document.querySelector('.modal__close');
const inputsForm = document.querySelectorAll('.modal-step1__input');
const email = inputsForm[0];
const nickname = inputsForm[1];
const password = inputsForm[2];
const passwordRepeat = inputsForm[3];
const form = document.querySelector('.modal__form');
const btnNext = document.querySelector('.modal-step1__button');
const errorsForm = document.querySelectorAll('.error-form');
const errorEmail = document.querySelector('.error-email');
const errorNickname = document.querySelector('.error-nickname');
const errorPassword = document.querySelector('.error-password');
const errorRepeat = document.querySelector('.error-repeat');
const requires = document.querySelectorAll('.modal-step1__require-item');
const requireSymbol = requires[0];
const requireNumber = requires[1];
const requireLetter = requires[2];
const checkbox = document.querySelector('.modal-step1__checkbox');
const formStep1 = document.querySelector('.modal-step1');
const formStep2 = document.querySelector('.modal-step2');
const title = document.querySelector('.modal__title');
const radiosSex = document.querySelectorAll('.sex-fieldset input');
const radiosEducation = document.querySelectorAll('.education-fieldset input');
const radiosRubric = document.querySelectorAll('.rubric-fieldset input');
const textArea = document.querySelector('.modal-step2__textarea');

btnNext.disabled = true;

let isValid = {
  email: false,
  nickname: false,
  password: false,
  passwordRepeat: false
}

let valuesForm = {
  email: null,
  nickname: null,
  password: null,
  sex: null,
  education: null,
  aboutYourself: null,
  rubric: null
}

btnMain.addEventListener('click', function () {
    overlay.classList.remove('overlay-modal--close');
    document.body.style.overflow = 'hidden';
    email.addEventListener('blur', onEmailValidate);
    nickname.addEventListener('blur', onNicknameValidate);
    passwordRepeat.addEventListener('blur', onPasswordRepeatValidate);
    password.addEventListener('blur', onPasswordValidate);
});

const closeModal = function () {
   overlay.classList.add('overlay-modal--close');
    document.body.style.overflow = '';
    form.reset();

    inputsForm.forEach(function(input) {
      input.classList.remove('input-error');
    })

    errorsForm.forEach(function(error) {
      error.innerHTML = '';
    })

    requires.forEach(function(require) {
      require.classList.remove('modal-step1__require-item--ok');
      require.classList.remove('modal-step1__require-item--error');
    })

    formStep1.classList.remove('modal-step--close');
    formStep2.classList.add('modal-step--close');
    title.textContent = 'Регистрация';

    for (let key in isValid) {
      isValid[key] = false;
    }

    for (let key in valuesForm) {
      valuesForm[key] = null;
    }

    email.removeEventListener('input', onEmailValidate);
    email.removeEventListener('blur', onEmailValidate);
    nickname.removeEventListener('input', onNicknameValidate);
    nickname.removeEventListener('blur', onNicknameValidate);
    passwordRepeat.removeEventListener('blur', onPasswordRepeatValidate);
    passwordRepeat.removeEventListener('input', onPasswordRepeatValidate);
    password.removeEventListener('blur', onPasswordValidate);
    password.removeEventListener('input', onPasswordValidate);

    btnNext.disabled = true;
}

btnCLoseModal.addEventListener('click', closeModal);

const onEmailValidate = function  () {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email.value) == false && email.value != '') {

    errorEmail.innerHTML = ERROR_EMAIL_MESSAGE;
    errorEmail.className = "error";
    email.classList.add('input-error');
    isValid.email = false;
    email.removeEventListener('blur', onEmailValidate);
    email.addEventListener('input', onEmailValidate);
   } else {
      errorEmail.innerHTML = '';
      email.classList.remove('input-error');
      isValid.email = true;
   }

   (email.value == '') ? isValid.email = false : true;

   valuesForm.email = email.value.trim();
}

const onNicknameValidate = function () {
  const value = nickname.value.trim();
  const reg = /^[a-zA-Z][a-zA-Z0-9_;]{2,40}$/;

  errorNickname.className = "error";

  if (value.length > 0 && reg.test(value) == false) {
    errorNickname.innerHTML = ERROR_NICKNAME_MESSAGE;
    nickname.classList.add('input-error');
    isValid.nickname = false;
    nickname.removeEventListener('blur', onNicknameValidate);
    nickname.addEventListener('input', onNicknameValidate);

  } else {
    errorNickname.innerHTML = '';
    nickname.classList.remove('input-error');
    isValid.nickname = true;
  };

  (value == '') ? isValid.nickname = false : true;

  valuesForm.nickname = value;
}

const onPasswordValidate = function () {
  const value = password.value.trim();
  const regNumber = /\d/;
  const regLetter = /(?=.*[a-zа-я])(?=.*[A-ZА-Я])/;

  let errors = {
    length: false,
    number: false,
    letter: false,
    noRepeat: true
  }

  function goodRequire (require) {
    require.classList.add('modal-step1__require-item--ok');
    if (password.classList.contains('modal-step1__require-item--error')) {
      password.classList.add('input-error');
    } else {
      password.classList.remove('input-error');
    }
  }

  function badRequire (require) {
    if (require.classList.contains('modal-step1__require-item--ok')) {
      require.classList.remove('modal-step1__require-item--ok');
      require.classList.add('modal-step1__require-item--error');
      password.removeEventListener('blur', onPasswordValidate);
      password.addEventListener('input', onPasswordValidate);
    }
      password.classList.add('input-error');
  }

  if (value.length >= 6 && value.length <= 32) {
    goodRequire(requireSymbol);
    errors.length = true;

  } else if (value.length < 6 || value.length > 32) {
    badRequire(requireSymbol);
    errors.length = false;
  };

  if (regNumber.test(value)) {
    goodRequire(requireNumber);
    errors.number = true;
  } else {
    badRequire(requireNumber);
    errors.number = false;
  }

  if (regLetter.test(value)) {
    goodRequire(requireLetter);
    errors.letter = true;
  } else {
    badRequire(requireLetter);
    errors.letter = false;
  }

  if (password.value != '' && password.value == email.value || password.value != '' && password.value == nickname.value) {
    errorPassword.className = "error";
    errorPassword.innerHTML = ERROR_PASSWORD_MESSAGE;
    password.classList.add('input-error');
    errors.noRepeat = false;
    password.removeEventListener('blur', onPasswordValidate);
    password.addEventListener('input', onPasswordValidate);
  } else {
    errorPassword.innerHTML = '';
    errors.noRepeat = true;
  }

  if (passwordRepeat.value != '' && password.value != passwordRepeat.value ) {
    errorRepeat.innerHTML = ERROR_REPEAT_MESSAGE;
    isValid.passwordRepeat = false;
    password.removeEventListener('blur', onPasswordValidate);
    password.addEventListener('input', onPasswordValidate);
  } else {
    errorRepeat.innerHTML = '';
    isValid.passwordRepeat = true;
  }

  Object.keys(errors).every((k) => errors[k]) ? isValid.password = true : isValid.password = false;
  valuesForm.password = value;
}


const onPasswordRepeatValidate = function () {
  const value = passwordRepeat.value.trim();

  if (value !== password.value && value != '') {
    errorRepeat.className = "error";
    errorRepeat.innerHTML = ERROR_REPEAT_MESSAGE;
    passwordRepeat.classList.add('input-error');
    isValid.passwordRepeat = false;
    passwordRepeat.removeEventListener('blur', onPasswordRepeatValidate);
    passwordRepeat.addEventListener('input', onPasswordRepeatValidate);
  } else {
    errorRepeat.innerHTML = '';
    passwordRepeat.classList.remove('input-error');
    isValid.passwordRepeat = true;
  }

   (value == '') ? isValid.passwordRepeat = false : true;
}


document.addEventListener('change', function () {
  if (Object.keys(isValid).every((k) => isValid[k]) && checkbox.checked) {
    btnNext.disabled = false;
  } else {
    btnNext.disabled = true;
  }
})

btnNext.addEventListener('click', function () {
  formStep1.classList.add('modal-step--close');
  formStep2.classList.remove('modal-step--close');
  title.textContent = 'Шаг 2';
})


const getValueRadio = function (collection) {
  let value;
  collection.forEach(function (radio) {
    return radio.checked ? value = radio.value : false;
  })
  return value;
}

const getValueRubric = function () {
  let arr = [];
  radiosRubric.forEach(function (checkbox) {
    return checkbox.checked ? arr.push(checkbox.value) : false;
  })
  return arr;
}

form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  valuesForm.sex = getValueRadio(radiosSex);
  valuesForm.education = getValueRadio(radiosEducation);
  valuesForm.aboutYourself = textArea.value;
  valuesForm.rubric = getValueRubric();

  let json = JSON.stringify(valuesForm);
  console.log(json);
  closeModal();
})

