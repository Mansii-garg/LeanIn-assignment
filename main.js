const customer = [
  {
    id: 01,
    name: "Akshita",
    type: " savings",
    account_No: 12345566,
    transaction: [
      [2000, new Date(2000, 11, 12)],
      [-2290, new Date(2000, 10, 2)],
      [2788, new Date(2000, 11, 12)],
      [-2290, new Date(2000, 10, 2)],
    ],
  },
  {
    id: 02,
    name: "Ruchi",
    type: "savings",
    account_No: 45678990,
    transaction: [
      [2000, new Date(2000, 11, 12)],
      [-2290, new Date(2000, 10, 2)],
      [6007, new Date(2000, 01, 12)],
      [-3290, new Date(2000, 10, 2)],
    ],
  },
  {
    id: 03,
    name: "Nisha",
    type: "savings",
    acoount_No: 14335464,
    transaction: [
      [2000, new Date(2000, 11, 12)],
      [-2290, new Date(2000, 10, 2)],
      [2560, new Date(2000, 11, 12)],
      [-1290, new Date(2000, 10, 2)],
    ],
  },
];

const inputName = document.querySelector("#name");
const heading = document.querySelector(".main__heading");
const cards = document.querySelector(".main__cards");
const eachCard = document.querySelectorAll(".main__card");
let acc_name = document.querySelector("#acc_name");
let acc_no = document.querySelector("#acc_no");
let acc_type = document.querySelector("#Acc_type");
let balance = document.querySelector("#Balance");
let acc_holder_details = document.querySelector(".account__holder_detail");
let withdrawPalet = document.querySelector(".account__transaction__withdraw");
let depositPalet = document.querySelector(".account__transaction__deposit");
const withdrawText = document.querySelector(".withdraw_text");

const depositCards = document.querySelector(".deposit__cards");
const depositButton = document.querySelector(".deposit__button");
const depositInput = document.querySelector(".deposit__input");
const depositSort = document.querySelector(".deposit__sort");

const withdrawCards = document.querySelector(".withdraw__cards");
const withdrawButton = document.querySelector(".withdraw__button");
const withdrawInput = document.querySelector(".withdraw__input");
const withdrawSort = document.querySelector(".withdraw__sort");

const loanInput = document.querySelector(".loan_input");
const loanButton = document.querySelector(".loan_button");
const loanOutput = document.querySelector(".loan_output");

let total_balance = 0;

cards.addEventListener("click", (event) => {
  eachCard.forEach((elem) => elem.classList.remove("active__card"));
  const elem = event.target.closest(".main__card");
  elem.classList.add("active__card");
  const htmlArr = [...eachCard];
  const inactiveElems = htmlArr.filter(
    (elem) => elem.classList.contains("active__card") === false
  );
  console.log(inactiveElems);
  const [a, b] = inactiveElems;
  const newElem = [a, elem, b];
  cards.innerHTML = "";
  newElem.forEach((elem) => cards.insertAdjacentElement("beforeend", elem));
});

const convertToDate = (today) => {
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yy = today.getFullYear();
  today = dd + "/" + mm + "/" + yy;
  return today;
};

const loan_approval = (balance, value) => {
  if(balance >= (10/100)*(value)){
    loanOutput.innerHTML = "Loan is approved!!";
  }
  else{
    loanOutput.innerHTML = "You don't have enough balance";
  }
};

const displayCards = (amount, type, parent, date) => {
  const html = `<div class="main__method-card">
  Rs. ${amount} ${type} Dated : ${convertToDate(date)}
  </div>`;

  parent.insertAdjacentHTML("afterbegin", html);
};

function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
};

depositButton.addEventListener("click", function () {
  displayCards(depositInput.value, "deposit", depositCards, new Date());
  depositInput.value = "";
});

withdrawButton.addEventListener("click", function () {
  if(withdrawInput.value <= total_balance){
    displayCards(withdrawInput.value, "withdraw", withdrawCards, new Date());
  }
  else{
    withdrawText.innerHTML = "Don't have enough balance.";
  }
  withdrawInput.value = "";
});

depositSort.addEventListener("click", function () {   //Di sort button is not working
  depositArray.sort(sortFunction);
});

withdrawSort.addEventListener("click", function () {
  withdrawArray.sort(sortFunction);
});

loanButton.addEventListener("click", function() {
  loan_approval(total_balance, loanInput.value);
  loanInput.value = "";
});

inputName.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    let user = inputName.value;
    inputName.value = "";
    heading.innerHTML = `Welcome to our Bank ${user}`;
    for(details in customer){
      if(user === customer[details].name){
        acc_name.innerHTML = `Name: ${customer[details].name}`;
        acc_no.innerHTML = `Account No: ${customer[details].account_No}`;
        acc_type.innerHTML = `Type: ${customer[details].type}`;
        break;
      }
      else{
        acc_name.innerHTML = "Don't have any account with this name";
      }
  }
    const userdata = customer.filter((elem) => elem.name == user);
    const transferData = userdata[0].transaction;
    console.log(userdata);
    let depositAmount = 0;
    let withdrawlAmount = 0;
    let depositArray = [];
    let withdrawArray = [];
    transferData.forEach((elem) => {
      if (elem[0] > 0) {
        depositAmount += elem[0];
        displayCards(elem[0], "deposit", depositCards, elem[1]);
        depositArray.push(elem);
        total_balance += elem[0];
      } else {
        withdrawlAmount += elem[0] * -1;
        displayCards(elem[0] * -1, "withdraw", withdrawCards, elem[1]);
        withdrawArray.push(elem[0]);
        total_balance += elem[0];
      }
    });
    userdata.withdraws = withdrawArray;
    userdata.deposits = depositArray;
    console.log(userdata);
    AccountHolder = userdata;
    depositPalet.innerHTML = "Rs" + " " + String(depositAmount);
    withdrawPalet.innerHTML = "Rs" + " " + withdrawlAmount;
    balance.innerHTML = `Balance: ${total_balance}`;
  }
});