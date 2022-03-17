const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.register;
const errorsContainerEl = document.querySelector('.errors');

const query = window.location.search;
if (query) {
  const emailFromQuery = query.split('=')[1];
  formEl.elements.email.value = emailFromQuery;
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const RegisterUserData = {
    full_name: formEl.elements.full_name.value,
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
    confirmPassword: formEl.elements.confirmPassword.value,
  };
  RegisterUser(RegisterUserData);
});

async function RegisterUser(RegisterUserData) {
  console.log('we are tryng to register with===', RegisterUserData);
  const resp = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(RegisterUserData),
  });
  const respinJS = await resp.json();
  console.log('respinJS===', respinJS);
  if (respinJS.success === false) {
    handleErrors(respinJS.error);
  }
  if (respinJS.success === true) {
    window.location.replace(`login.html?username=${RegisterUserData.email}`);
  }
}
async function handleErrors(errorArray) {
  const alertEl = document.createElement('h4');
  alertEl.className = 'alert';
  errorArray.forEach((err) => {
    alertEl.innerHTML += `<p style="color:#ff1a1a">${err.message}</p>`;
    document.body.prepend(alertEl);
    console.log('err===', err);
  });
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
  formEl.reset();
}
