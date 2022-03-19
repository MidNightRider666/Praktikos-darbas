const BASE_URL = 'http://localhost:3000';
const PostDestination = document.querySelector('.Mainrows');
const buttonDestination = document.querySelector('.navbar-start');
const formEl = document.forms.CreatingPost;

function LoggoutFromWeb() {
  const btn = document.createElement('button');
  btn.className = 'navbar-item2';
  btn.innerHTML = 'Loggout';
  btn.onclick = () => loggout();
  buttonDestination.prepend(btn);
}

async function loggout() {
  const loggoutConfirm = confirm('are you sure you want to loggout?');
  if (loggoutConfirm) {
    window.location.reload('index.html');
    const resp = localStorage.removeItem('login_token');
    const atsJs = await resp.json();
    if (atsJs.success) {
      window.location.reload('index.html');
    }
  }
}
LoggoutFromWeb();

async function GetGroups() {
  const token = localStorage.getItem('login_token');
  const resp = await fetch(`${BASE_URL}/accounts/8`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dataInJs = await resp.json();
  if (dataInJs.success === false) {
    alert('This is restricted area for non registered users, redirecting....');
    window.location.replace('index.html');
  }
  renderGroups(dataInJs.data);
}

GetGroups();

function makeGroup(group) {
  const Groupel = document.createElement('div');
  Groupel.className = 'groups';
  const h1El = document.createElement('h2');
  h1El.className = 'GroupID';
  h1El.textContent = 'ID : ' + group.id;
  const pEl = document.createElement('p');
  pEl.className = 'GroupName';
  pEl.textContent = group.name;
  Groupel.append(h1El, pEl);
  return Groupel;
}

function renderGroups(groupArray) {
  const postEl = document.querySelector('.bills');
  postEl.className = 'posts';
  groupArray.forEach((group) => {
    const token = localStorage.getItem('login_token');
    fetch(`${BASE_URL}/bills/` + group.id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const singleGroup = makeGroup(group);
    const BtnEl = document.createElement('button');
    BtnEl.className = 'navbar-item1';
    BtnEl.innerHTML = `<a href="bills.html?group_id=${group.id}">Select this group</a>`;
    BtnEl.onclick = () => TransferBill();
    singleGroup.append(BtnEl);
    postEl.append(singleGroup);
  });
}
async function TransferBill() {
  const ChoseGroup = confirm('Is this the correct group?');
  if (ChoseGroup) {
    window.location.replace('bills.html');
  }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const { group_id } = formEl.elements;
  const createPost = {
    group_id: group_id.value,
  };
  createNewGroup(createPost);
});

async function createNewGroup(NewBillData) {
  const CreateConfirm = confirm('Create this group?');
  if (CreateConfirm) {
    const token = localStorage.getItem('login_token');
    if (token === null) throw new Error('token not found');
    const resp = await fetch(`${BASE_URL}/accounts/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(NewBillData),
    });
    const atsJs = await resp.json();
    if (atsJs.success === true) {
      handleSuccess();
    } else {
      handleErrors(atsJs.errors);
    }
  }
}
function handleSuccess() {
  const alertEl = document.createElement('h4');
  alertEl.className = 'alert';
  alertEl.textContent = 'Congratulations, the group has been created';
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
    window.location.reload();
  }, 3000);
  formEl.reset();
}
async function handleErrors(errorArray) {
  const alertEl = document.createElement('h4');
  alertEl.className = 'alert';
  errorArray.forEach((err) => {
    alertEl.innerHTML += `<p>${err.message}</p>`;
    document.body.prepend(alertEl);
  });
  formEl.reset();
}
