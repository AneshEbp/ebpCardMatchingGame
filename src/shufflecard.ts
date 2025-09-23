import type { CardDetails } from "./types/cardDetails";
export function shuffledCard(cardDetails:CardDetails[]):CardDetails[]{
    cardDetails.sort(()=>0.5-Math.random())
return cardDetails
}