const cardList = document.getElementById("card-list");
const searchBox = document.getElementById("search");

const listPage = document.getElementById("list-page");
const detailPage = document.getElementById("detail-page");

const detailImage = document.getElementById("detail-image");
const detailName = document.getElementById("detail-name");
const detailType = document.getElementById("detail-type");
const detailCost = document.getElementById("detail-cost");
const detailAtk = document.getElementById("detail-atk");
const detailColor = document.getElementById("detail-color");
const detailEffect = document.getElementById("detail-effect");
const atkRow = document.getElementById("atk-row");

const backButton = document.getElementById("back-button");

let cards = [];

async function loadCards() {

    const response = await fetch("cards.json");

    cards = await response.json();

    showCards(cards);

}

function showCards(list) {

    cardList.innerHTML = "";

    list.forEach(card => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <img src="images/${card.image}" alt="${card.name}">
            <div class="card-name">${card.name}</div>
        `;

        div.onclick = () => openCard(card);

        cardList.appendChild(div);

    });

}

function openCard(card){

    listPage.classList.add("hidden");

    detailPage.classList.remove("hidden");

    detailImage.src = "images/" + card.image;

    detailName.textContent = card.name;

    detailType.textContent = card.type;

    detailCost.textContent = card.cost;

    detailColor.textContent = card.color.join("・");

    detailEffect.textContent = card.effect;

    if(card.atk == null){

        atkRow.style.display = "none";

    }else{

        atkRow.style.display = "";

        detailAtk.textContent = card.atk;

    }

}

backButton.onclick = () => {

    detailPage.classList.add("hidden");

    listPage.classList.remove("hidden");

};

searchBox.addEventListener("input", () => {

    const text = searchBox.value.toLowerCase();

    const result = cards.filter(card =>

        card.name.toLowerCase().includes(text)

    );

    showCards(result);

});

loadCards();
