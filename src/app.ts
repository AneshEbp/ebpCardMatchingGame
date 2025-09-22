import {cardDetails} from './cardDetails'

 type CardDetails = {
    id: number;
    image: string;
    matched: boolean;
}
function shuffleCards(cardDetails:Array<CardDetails>):Array<CardDetails> {
    let shuffledcard:Array<CardDetails>=cardDetails;

    return shuffledcard
}

console.log(shuffleCards(cardDetails));
function initializedCard(): void {
    const ele=document.getElementById("cardContainer");
    cardDetails.forEach((item,index:number)=>{
        if(ele !== null)
            ele.innerHTML+=`<div id=${index} class="cardContainerItem">
            <img src=${item.image} alt="">
        </div>`
    })
}

initializedCard();