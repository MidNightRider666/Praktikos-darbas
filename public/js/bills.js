const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.CreatingPost;
const buttonDestination = document.querySelector('.navbar-start');

function LoggoutFromWeb() {
  const btn = document.createElement('button');
  btn.className = 'navbar-item2';
  btn.innerHTML = 'Loggout';
  btn.onclick = () => loggout();
  buttonDestination.prepend(btn);
}

async function loggout() {
  const loggoutConfirm = confirm('Are you sure you want to loggout?');
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

async function GetBills() {
  const query = window.location.search;
  const groupFromQuery = query.split('=')[1];
  const token = localStorage.getItem('login_token');
  const resp = await fetch(`${BASE_URL}/bills/` + groupFromQuery, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dataInJs = await resp.json();
  if (dataInJs.success === false) {
    alert('This is restricted area for non registered users, redirecting....');
    window.location.replace('index.html');
  }
  renderbills(dataInJs.data);
}
GetBills();

function makebills(bills) {
  const artEl = document.createElement('tr');
  artEl.className = 'rows';
  const h1El = document.createElement('th');
  h1El.className = 'BillID';
  h1El.innerHTML = `ID <br>` + bills.id;
  const pEl = document.createElement('td');
  pEl.className = 'BillName';
  pEl.innerHTML = `Description <br>` + bills.description;
  const pEl1 = document.createElement('td');
  pEl1.className = 'BillAmount';
  pEl1.innerHTML = `Amount <br> $ ` + bills.amount;
  artEl.append(h1El, pEl, pEl1);
  return artEl;
}

function renderbills(billsArray) {
  const Billel = document.querySelector('.bills');
  billsArray.forEach((bills) => {
    const singleGroup = makebills(bills);
    Billel.append(singleGroup);
  });
}
formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = window.location.search;
  const groupfromSeacrBar = query.split('=')[1];
  const group_id = groupfromSeacrBar;
  const { amount, description } = formEl.elements;
  const createPost = {
    description: description.value,
    amount: amount.value,
    group_id: group_id,
  };
  createNewBill(createPost);
});

async function createNewBill(NewBillData) {
  const CreateConfirm = confirm('Create this bill?');
  if (CreateConfirm) {
    const token = localStorage.getItem('login_token');
    if (token === null) throw new Error('token not found');
    const resp = await fetch(`${BASE_URL}/bills/post`, {
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
  alertEl.textContent = 'Congratulations, the bill has been created';
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
