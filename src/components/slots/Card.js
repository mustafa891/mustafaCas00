import { useEffect, useState } from "react";
import LogoImage from "../../assets/img/csgocrazy/logo.png";

const suits = ["diamonds", "hearts", "spades", "clubs"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

const Card = ({
  cardNumber = null,
  isSmall = false,
  position = 0,
  isFairness = false,
}) => {
  const [printSuit, setPrintSuit] = useState(<span>&#9830;</span>);
  const [cardColor, setCardColor] = useState("gray-100");

  const cardList = [];

  values.forEach((value) => {
    if (typeof value === "number") {
      suits.forEach((suit) => {
        cardList.push({ suit: suit, value: value });
      });
    }
  });

  values.forEach((value) => {
    if (typeof value === "string") {
      suits.forEach((suit) => {
        cardList.push({ suit: suit, value: value });
      });
    }
  });

  //console.log(cardList[4]);

  useEffect(() => {
    if (cardNumber !== null) {
      switch (cardList[cardNumber].suit) {
        case "diamonds":
          setPrintSuit(<span>&#9830;</span>);
          setCardColor("roulette-red-300");
          break;
        case "hearts":
          setPrintSuit(<span>&#9829;</span>);
          setCardColor("roulette-red-300");
          break;
        case "spades":
          setPrintSuit(<span>&#9824;</span>);
          setCardColor("gray-900");
          break;
        case "clubs":
          setPrintSuit(<span>&#9827;</span>);
          setCardColor("gray-900");
          break;

        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, [cardNumber]);

  return (
    <>
      {isSmall ? (
        <div className="cursor-default px-1">
          <div
            className={`border-2 border-gray-300 w-28 rounded-xl py-4 text-${cardColor} bg-gray-200 h-40`}
          >
            <div className="hidden text-black-900"></div>
            <div className="hidden text-roulette-red-300"></div>
            <p className="text-3xl font-semibold pl-4">
              {cardNumber !== null && cardList[cardNumber].value}
            </p>
            <img
              src={LogoImage}
              className="w-16 mx-auto my-4 grayscale opacity-0"
              alt="Logo"
            />
            <p className="text-3xl pt-2 mt-0 inline-block pr-4 float-right">
              {cardNumber !== null && printSuit}
            </p>
          </div>
          {position === 1 && !isFairness && (
            <p className="text-dark-green-500 font-semibold text-center text-sm bg-blue-white-200 rounded-md mt-1 mx-2">
              Previous
            </p>
          )}
          {position === 0 && !isFairness && (
            <p className="text-dark-green-200 font-semibold text-center text-sm template-bg-linear-green rounded-md mt-1 mx-2">
              Current
            </p>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-gray-300 w-52 rounded-xl py-4 text-${cardColor} bg-gray-200`}
        >
          <div className="hidden text-black-900"></div>
          <div className="hidden text-roulette-red-300"></div>
          <p className="text-7xl font-semibold pl-5">
            {cardNumber !== null && cardList[cardNumber].value}
          </p>
          <img
            src={LogoImage}
            className="w-32 mx-auto my-10 grayscale"
            alt="Logo"
          />
          <div className="text-right">
            <p className="text-7xl pt-2 mt-0 inline-block pr-5">
              {cardNumber !== null && printSuit}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
