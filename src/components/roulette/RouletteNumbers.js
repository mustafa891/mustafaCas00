import React from "react";

const numbersList = [
  {
    class: "bg-roulette-red-300",
    number: "1",
  },
  {
    class: "bg-theme",
    number: "14",
  },
  {
    class: "bg-roulette-red-300",
    number: "2",
  },
  {
    class: "bg-theme",
    number: "13",
  },
  {
    class: "bg-roulette-red-300",
    number: "3",
  },
  {
    class: "bg-theme",
    number: "12",
  },
  {
    class: "bg-roulette-red-300",
    number: "4",
  },
  {
    class: "bg-green-400",
    number: "0",
  },
  {
    class: "bg-theme",
    number: "11",
  },
  {
    class: "bg-roulette-red-300",
    number: "5",
  },
  {
    class: "bg-theme",
    number: "10",
  },
  {
    class: "bg-roulette-red-300",
    number: "6",
  },
  {
    class: "bg-theme",
    number: "9",
  },
  {
    class: "bg-roulette-red-300",
    number: "7",
  },
  {
    class: "bg-theme",
    number: "8",
  },
];

const RouletteNumbers = () => {
  const repeatedList = numbersList.concat(
    numbersList,
    numbersList,
    numbersList,
    numbersList,
    numbersList
  );

  return (
    <div className="numbers-container">
      {repeatedList.map((item, index) => (
        <div
          className={`number ${item.class} ${
            item.number === "0" ? "text-dark-green-200" : ""
          }`}
          key={index}
        >
          {item.number}
        </div>
      ))}
    </div>
  );
};

export default RouletteNumbers;
