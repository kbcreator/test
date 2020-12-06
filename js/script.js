"use strict";

window.addEventListener("load", Initialise);

// Globale variabelen
var flexContainer;
var slcFilter;
var dataFile;
var flexCartContainer;
var divTotalPrice;
var spanTotal;

function Initialise() {
	// Inlezen DOM elementen
	flexContainer = document.querySelector("#flexContainer");
  slcFilter = document.querySelector("#slcFilter");
  flexCartContainer = document.querySelector("#flexCartContainer");
  divTotalPrice = document.querySelector('#divTotalPrice');
  spanTotal = document.querySelector('.spanTotal');
	// Toevoegen Eventlisteners
	slcFilter.addEventListener("change", FilterItems);
	// Functies

  FetchData();
}

function FetchData() {
	fetch("https://howest-gp-wfa.github.io/st-2021-1-S2-a-wfa-pe03-BourgeoisKjartan/api/data.json")
		.then(function (resp) {
			return resp.json();
		})
		.then(function (data) {
			dataFile = data;
			FillFilter();
      FilterItems();
		});
}


function FillFilter() {
	for (let filter in dataFile) {
		slcFilter.options[slcFilter.length] = new Option(filter, filter);
	}
}

function FilterItems() {
	let selected = slcFilter.options[slcFilter.selectedIndex].value;
  flexContainer.innerHTML = "";

  if (Array.isArray(dataFile[selected])){

    for(let i = 0; i < dataFile[selected].length; i++){

      let imageCard;
      let divCard;
      let itemText;
      let money;
      let btnAdd;
  
      imageCard = document.createElement("img");
      divCard = document.createElement("div");
      itemText = document.createElement("span");
      money = document.createElement("span");
      btnAdd = document.createElement("button");
  
      imageCard.className = "imageItem";
      divCard.className = "divCard";
      itemText.className = "itemText";
      money.className = "money";
      btnAdd.className = "btnAdd";
  
      imageCard.setAttribute("src", dataFile[selected][i].Foto);
      itemText.innerHTML = `${dataFile[selected][i].Merk} ${dataFile[selected][i].Type}`;
      money.innerHTML = "€" + dataFile[selected][i].Prijs;
      btnAdd.innerHTML = "Voeg toe";

      btnAdd.addEventListener('click',AddToCart);
  
      flexContainer.appendChild(divCard);
      divCard.appendChild(imageCard);
      divCard.appendChild(itemText);
      divCard.appendChild(money);
      divCard.appendChild(btnAdd);
    }
  }
}

function AddToCart(e){
  let divItem = e.target.parentElement;
  let imageSrc = e.target.parentElement.firstChild.src;
  let itemTitle = divItem.children[1].firstChild.data;
  let stringPrice = divItem.children[2].firstChild.data;
  let price = stringPrice.replace("€", "");

  let divCart = document.createElement('div');
  let divImage = document.createElement('div');
  let divItemTitle = document.createElement('div');
  let divAmount = document.createElement('div');
  let divPrice = document.createElement('div');
  let divRemove = document.createElement('div');

  let image = document.createElement('img');
  let title = document.createElement('span');
  let amount = document.createElement('input');
  let spanPrice = document.createElement('span');
  let buttonRemove = document.createElement('button');

  
  image.setAttribute('src', imageSrc);
  amount.setAttribute("type", "number");
  amount.setAttribute("value", "1");

  divCart.className = 'divCart';
  divImage.className = 'divImage';
  divItemTitle.className = 'divItemTitle';
  divAmount.className = 'divAmount';
  divPrice.className = 'divPrice';
  divRemove.className = 'divRemove';

  image.className = 'image';
  title.className = 'title';
  amount.className = 'amount';
  spanPrice.className = 'spanPrice';
  buttonRemove.className = 'buttonRemove';

  title.innerHTML = itemTitle;
  spanPrice.innerHTML = `€${price}`;
  buttonRemove.innerHTML = 'X';

  amount.addEventListener('change', ChangeAmount);
  buttonRemove.addEventListener('click', RemoveItem);

  flexCartContainer.appendChild(divCart);
  divCart.appendChild(divImage);
  divCart.appendChild(divItemTitle);
  divCart.appendChild(divAmount);
  divCart.appendChild(divPrice);
  divCart.appendChild(divRemove);
  
  divImage.appendChild(image);
  divItemTitle.appendChild(title);
  divAmount.appendChild(amount);
  divPrice.appendChild(spanPrice);
  divRemove.appendChild(buttonRemove);

  UpdateCart();
}

function ChangeAmount(e){
  let input = e.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1 ;
  }
  UpdateCart();
}

function RemoveItem(e){

  let buttonClick = e.target;
  let divRemove = buttonClick.parentElement;
  let divCart = divRemove.parentElement;
  divCart.remove();
  UpdateCart();

}

function UpdateCart(){
  let cartItems = flexCartContainer.children;
  let total = 0;
  for(let i = 0; i < cartItems.length; i++){
    let cartItem = cartItems[i];
    let divPrice = cartItem.children[3];
    let divAmount = cartItem.children[2];
    let amount = divAmount.children[0].value;
    let spanPrice = divPrice.children[0].innerText;
    let price = parseFloat(spanPrice.replace('€', ''));

    total = total + (price * amount);

  }

  spanTotal.innerHTML = `Totaal : €${total}`;

}






