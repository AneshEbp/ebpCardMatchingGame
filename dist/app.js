import { cardDetails } from './cardDetails.js';
function shuffleCards(cardDetails) {
    let shuffledcard = cardDetails;
    return shuffledcard;
}
console.log(shuffleCards(cardDetails));
function initializedCard() {
    const ele = document.getElementById("cardContainer");
    cardDetails.forEach((item, index) => {
        if (ele !== null)
            ele.innerHTML += `<div id=${index} class="cardContainerItem">
            <img src=${item.image} alt="">
        </div>`;
    });
}
initializedCard();
//# sourceMappingURL=app.js.map