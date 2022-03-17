const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.login;
const errorsContainerEl = document.querySelector('.errors');

const query = window.location.search;
if (query) {
  const emailFromQuery = query.split('=')[1];
  formEl.elements.email.value = emailFromQuery;
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginUserData = {
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
  };

  loginUser(loginUserData);
});
async function loginUser(loginUserData) {
  const resp = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  });
  const respinJS = await resp.json();
  if (respinJS.success === false) {
    handleErrors(respinJS.error);
  }
  if (respinJS.success === true) {
    localStorage.setItem('login_token', respinJS.data);
    window.location.replace('groups.html');
  }
}

async function handleErrors(errorArray) {
  const alertEl = document.createElement('h4');
  alertEl.className = 'alert';
  errorArray.forEach((err) => {
    alertEl.innerHTML += `<p style="color:#ff1a1a">${err.message}</p>`;
    document.body.prepend(alertEl);
  });
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
  formEl.reset();
}
