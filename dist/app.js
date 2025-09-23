import { cardDetails } from './cardDetails.js';
import { shuffledCard } from './shufflecard.js';
import { saveToLocalStorage, getItemFromLocalStorage, removeItemFromLocalStorage } from './localStorage.js';
let shuffleCard = [];
let numberOfTry = 0;
let isProcessing = false;
const numberOfTryBtn = document.getElementById('tryId');
const startGameBtn = document.getElementById('startGame');
startGameBtn === null || startGameBtn === void 0 ? void 0 : startGameBtn.addEventListener('click', () => {
    console.log(startGameBtn.innerText);

    startGameBtn.innerText = 'Restart Game';
});
if (getItemFromLocalStorage("numberOfTry")) {
    numberOfTry = parseInt(JSON.parse(getItemFromLocalStorage("numberOfTry")));
    if (numberOfTryBtn) {
        numberOfTryBtn.innerText = `Number of tries : ${numberOfTry} `;
    }
}
if (getItemFromLocalStorage("shuffledCard")) {
    shuffleCard = JSON.parse(getItemFromLocalStorage("shuffledCard"));
}
else {
    shuffleCard = [...cardDetails, ...cardDetails];
    shuffleCard = shuffledCard(shuffleCard);
    saveToLocalStorage("shuffledCard", JSON.stringify(shuffleCard));
}
let clickedCard = {
    firstCardId: -1,
    secondCardId: -1
};
function initializedCard() {
    const ele = document.getElementById("cardContainer");
    shuffleCard.forEach((item, index) => {
        if (ele !== null)
            if (!item.matched) {
                console.log("false one");
                ele.innerHTML += `<div id=${index} class="cardContainerItem">
            <img id=img-${index} src=${item.image} alt="">
            <p>${item.value}</p>
                                </div>`;
            }
            else {
                console.log("true one");
                ele.innerHTML += `<div id=${index} class="cardContainerItem removeimg showText">
            <img id=img-${index} src=${item.image} alt="" >
            <p>${item.value}</p>
                                </div>`;
            }
    });
    console.log(shuffleCard);
    ele === null || ele === void 0 ? void 0 : ele.addEventListener("click", (event) => {
        if (isProcessing) {
            return;
        }
        const target = event.target;
        if (target.tagName === "IMG") {
            const parentCard = target.closest(".cardContainerItem");
            console.log(parentCard);
            let id;
            if (parentCard !== null) {
                id = parseInt(parentCard.id);
                console.log(id);
                parentCard === null || parentCard === void 0 ? void 0 : parentCard.classList.add("removeimg");
                parentCard === null || parentCard === void 0 ? void 0 : parentCard.classList.add("showText");
                if ((clickedCard === null || clickedCard === void 0 ? void 0 : clickedCard.firstCardId) == -1) {
                    clickedCard.firstCardId = id;
                }
                else if ((clickedCard === null || clickedCard === void 0 ? void 0 : clickedCard.firstCardId) != -1 && (clickedCard === null || clickedCard === void 0 ? void 0 : clickedCard.secondCardId) == -1) {
                    clickedCard.secondCardId = id;
                    numberOfTry++;
                    saveToLocalStorage("numberOfTry", JSON.stringify(numberOfTry));
                    if (numberOfTryBtn) {
                        numberOfTryBtn.innerText = `Number of tries : ${numberOfTry} `;
                    }
                    isProcessing = true;
                    compareCards(clickedCard);
                }
            }
        }
    });
}
initializedCard();
function compareCards(compareCardsProps) {
    var _a, _b;
    console.log("id of one:" + compareCardsProps.firstCardId);
    console.log("id of one:" + compareCardsProps.secondCardId);
    console.log(shuffleCard[compareCardsProps.firstCardId]);
    if (((_a = shuffleCard[compareCardsProps.firstCardId]) === null || _a === void 0 ? void 0 : _a.value) == ((_b = shuffleCard[compareCardsProps.secondCardId]) === null || _b === void 0 ? void 0 : _b.value)) {
        const match1 = shuffleCard[compareCardsProps.firstCardId];
        const match2 = shuffleCard[compareCardsProps.secondCardId];
        if (match1)
            match1.matched = true;
        if (match2)
            match2.matched = true;
        console.log(shuffleCard + "from matched");
        saveToLocalStorage("shuffledCard", JSON.stringify(shuffleCard));
        clickedCard.firstCardId = -1;
        clickedCard.secondCardId = -1;
        let countTrue = 0;
        shuffleCard.forEach((item) => {
            if (item.matched == true)
                countTrue++;
            if (countTrue == 12) {
                console.log("rechaed here");
                removeItemFromLocalStorage("shuffledCard");
                removeItemFromLocalStorage("numberOfTry");
                alert("you have won the game");
            }
        });
        isProcessing = false;
        console.log("matched");
    }
    else {
        console.log("unmatched");
        setTimeout(() => {
            const card1 = document.getElementById(`${compareCardsProps.firstCardId}`);
            const card2 = document.getElementById(`${compareCardsProps.secondCardId}`);
            card1 === null || card1 === void 0 ? void 0 : card1.classList.remove('showText');
            card1 === null || card1 === void 0 ? void 0 : card1.classList.remove('removeimg');
            card2 === null || card2 === void 0 ? void 0 : card2.classList.remove('showText');
            card2 === null || card2 === void 0 ? void 0 : card2.classList.remove('removeimg');
            clickedCard.firstCardId = -1;
            clickedCard.secondCardId = -1;
            isProcessing = false;
        }, 2000);
    }
}
//# sourceMappingURL=app.js.map