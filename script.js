let coin = document.getElementById("coin");
let selectBlack = document.getElementById("coinBlack");
let selectRed = document.getElementById("coinRed");

var ammount = document.getElementById("ammount").value;

selectBlack.addEventListener("click", selectBlackCoin);
selectRed.addEventListener("click", selectRedCoin);

var balance = 100;
var selectedBlack = new Boolean(true);
var selectedCoin = new Boolean(false);
var blackWon = new Boolean(true);
var flipping = new Boolean(false);
var randomnum;
document.getElementById("balance").innerHTML = "Balance: " + balance + "$";

function selectBlackCoin() {
  if (flipping == false) {
    selectedBlack = true;
    selectBlack.style.border = "4px solid white";
    selectRed.style.border = "0px solid white";
    selectedCoin = true;
  }
}
function selectRedCoin() {
  if (flipping == false) {
    selectedBlack = false;
    selectRed.style.border = "4px solid white";
    selectBlack.style.border = "0px solid white";
    selectedCoin = true;
  }
}

function flip() {
  if (flipping == false) {
    ammount = document.getElementById("ammount").value;
    console.log(ammount);
    if (balance - ammount >= 0 && ammount > 0 && selectedCoin == true) {
      balance = balance - ammount;
      document.getElementById("balance").innerHTML =
        "Balance: " + balance + "$";
      coin.className = "None";
      document.getElementById("won").innerHTML = "";
      flipping = true;
      setTimeout(() => {
        randomnum = Math.random() * 100;
        if (randomnum > 50) {
          coin.className = "flipRed";
          blackWon = false;
        } else {
          coin.className = "flipBlack";
          blackWon = true;
        }
      }, 1000);
      setTimeout(() => {
        result();
      }, 4000);
    } else if (ammount == 0) {
      document.getElementById("won").style.color = "red";
      document.getElementById("won").innerHTML = "Enter ammount to bet!";
    } else if (selectedCoin == false) {
      document.getElementById("won").style.color = "red";
      document.getElementById("won").innerHTML = "You need to select a coin!";
    } else {
      document.getElementById("won").style.color = "red";
      document.getElementById("won").innerHTML =
        "You don't have enough balance!";
    }
  }
}

function result() {
  document.getElementById("ticket").innerHTML = "Ticket: " + randomnum;
  if (
    (selectedBlack == true && blackWon == true) ||
    (selectedBlack == false && blackWon == false)
  ) {
    document.getElementById("won").style.color = "green";
    document.getElementById("won").innerHTML = "You Won " + ammount + "$" + "!";
    balance = balance + ammount * 2;
    document.getElementById("balance").innerHTML = "Balance: " + balance + "$";
    selectBlack.style.border = "0px solid white";
    selectRed.style.border = "0px solid white";
    selectedCoin = false;
  } else {
    document.getElementById("won").style.color = "red";
    document.getElementById("won").innerHTML =
      "You Lost " + ammount + "$" + "!";
    selectRed.style.border = "0px solid white";
    selectBlack.style.border = "0px solid white";
    selectedCoin = false;
  }

  flipping = false;
}

function updateMoneyCookie() {
  cookievalue = balance;
  document.cookie = "balance=" + cookievalue;
  document.write("balance=" + cookievalue);
}
