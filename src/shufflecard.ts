import type { CardDetails } from "./types/cardDetails.type.js";
//function to shuffle card details
export function shuffledCard(cardDetails: CardDetails[]): CardDetails[] {
  cardDetails.sort(() => 0.5 - Math.random());
  return cardDetails;
}
