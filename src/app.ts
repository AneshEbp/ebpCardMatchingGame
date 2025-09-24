import {cardDetails} from './cardDetails.js'
import type { CardDetails } from './types/cardDetails.js';
import { shuffledCard } from './shufflecard.js';
import {saveToLocalStorage, getItemFromLocalStorage, removeItemFromLocalStorage} from './localStorage.js'

let shuffleCard:CardDetails[]=[]
let numberOfTry:number=0;
let isProcessing:boolean=false;
let clickedCard:{
    firstCardId:number;
    secondCardId:number;
}={
    firstCardId:-1,
    secondCardId:-1
};


const numberOfTryBtn=document.getElementById('tryId');
const startGameBtn=document.getElementById('startGame');

function restartBtn():void{
    console.log("function entered");
      if(numberOfTry!=0 && startGameBtn){
                        if(startGameBtn.innerText=='Start Game')
                        {
                            startGameBtn.innerText="Restart Game"
                        }
                    }
}
startGameBtn?.addEventListener('click',()=>{
    console.log("clicked startbtn");
     if(startGameBtn.innerText=='Restart Game')
         {
            removeItemFromLocalStorage("shuffledCard");
            removeItemFromLocalStorage("numberOfTry")
            location.reload();
        }
})

if(getItemFromLocalStorage("numberOfTry")){
    numberOfTry=parseInt(JSON.parse(getItemFromLocalStorage("numberOfTry")))
     if(numberOfTryBtn){
        numberOfTryBtn.innerText=`Number of tries : ${numberOfTry} `;
        restartBtn();
    }
}

if(getItemFromLocalStorage("shuffledCard")){
  shuffleCard=JSON.parse(getItemFromLocalStorage("shuffledCard"))
}else{
shuffleCard=[...cardDetails,...cardDetails]
shuffleCard=shuffledCard(shuffleCard);
saveToLocalStorage("shuffledCard",JSON.stringify(shuffleCard));
}



function compareCards(compareCardsProps:{ firstCardId:number; secondCardId:number;}):void{
        if(shuffleCard[compareCardsProps.firstCardId]?.value == shuffleCard[compareCardsProps.secondCardId]?.value ){
           
               const match1= shuffleCard[compareCardsProps.firstCardId];
                const match2= shuffleCard[compareCardsProps.secondCardId];
               if(match1 )
                    match1.matched=true;
                if(match2)
                    match2.matched=true;
            console.log(shuffleCard+"from matched");
            saveToLocalStorage("shuffledCard",JSON.stringify(shuffleCard));
            clickedCard.firstCardId=-1;
            clickedCard.secondCardId=-1;
            let countTrue:number=0;
            shuffleCard.forEach((item)=>{
                if(item.matched==true)
                    countTrue++;
                if(countTrue==12)
                {
                    console.log("rechaed here");
                    removeItemFromLocalStorage("shuffledCard");
                    removeItemFromLocalStorage("numberOfTry")
                    setTimeout(()=>{
                        alert("you have won the game")
                        location.reload();
                    },1000)
                }
            })
            isProcessing=false;
            console.log("matched");
        }else{
            console.log("unmatched");
            setTimeout(()=>{
                const card1=document.getElementById(`${compareCardsProps.firstCardId}`)
                const card2=document.getElementById(`${compareCardsProps.secondCardId}`)
                card1?.classList.remove('showText')
                card1?.classList.remove('removeimg')
                card2?.classList.remove('showText')
                card2?.classList.remove('removeimg')
                clickedCard.firstCardId=-1;
                clickedCard.secondCardId=-1;
                isProcessing=false;
            },2000)
        }
    }


function initializedCard(): void {
    const ele=document.getElementById("cardContainer");
    shuffleCard.forEach((item,index:number)=>{
        if(ele !== null)
        if(!item.matched){
            console.log("false one")
                ele.innerHTML += `<div id=${index} class="cardContainerItem">
            <img id=img-${index} src=${item.image} alt="">
            <p>${item.value}</p>
                                </div>`;
            }else{
                console.log("true one")
                ele.innerHTML += `<div id=${index} class="cardContainerItem removeimg showText">
            <img id=img-${index} src=${item.image} alt="" >
            <p>${item.value}</p>
                                </div>`;
            }
    })
        ele?.addEventListener("click",(event)=>{
            if(isProcessing){
                return;
            }
           const target = event.target as HTMLElement;
            if(target.tagName==="IMG"){
              const parentCard = target.closest(".cardContainerItem");
              console.log(parentCard);
    
              let id:number;
              if(parentCard !== null){
                  id=parseInt(parentCard.id);
                  console.log(id);
                   parentCard?.classList.add("removeimg")
                   parentCard?.classList.add("showText")
                if(clickedCard?.firstCardId == -1 ){
                    clickedCard.firstCardId=id;
                }else if(clickedCard?.firstCardId != -1 && clickedCard?.secondCardId == -1){
                    clickedCard.secondCardId=id;
                    numberOfTry++;
                    restartBtn();
                    saveToLocalStorage("numberOfTry", JSON.stringify(numberOfTry))
                  
                    if(numberOfTryBtn){
                        numberOfTryBtn.innerText=`Number of tries : ${numberOfTry} `;
                    }
                    isProcessing=true;
                    compareCards(clickedCard);
                }
              }
        }
    })
    }
   

initializedCard();

