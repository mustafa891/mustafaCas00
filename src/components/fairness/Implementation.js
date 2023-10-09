import React from "react";

const Implementation = () => {
  return (
    <div className="bg-theme rounded-md p-6 w-full">
      <p className="text-black-300 font-semibold uppercase text-2xl ">
        Implementation
      </p>
      <p className="text-black-300 mt-5">
        Every game have game events that are translation of the randomly
        generated floats into a relatable outcome that is game specific. This
        includes anything from the outcome of a dice roll to the order of the
        cards in a deck.
      </p>
      <p className="text-black-300 mt-2">
        Below is a detailed explanation as to how we translate floats into
        events for each particular different game on our platform.
      </p>
      <p className="text-black-300 font-semibold uppercase text-xl mt-8 ">
        Dice Roll, Faucet Roll Number
      </p>
      <p className="text-black-300 mt-2">
        In our version of dice, we cover a possible roll spread of 0 to 10000,
        which has a range of 10,000 possible outcomes. The game event
        translation is done dividing the lucky by number of possible outcomes.
      </p>
      <pre className="mt-5 bg-theme p-3 rounded text-black-400">
        <code>// Game event translation</code>
        <br />
        <code>const roll = lucky % 10000;</code>
      </pre>
      <p className="text-black-300 font-semibold uppercase text-xl mt-8 ">
        Limbo
      </p>
      <p className="text-black-300 mt-2">
        In our limbo version, we get a floatNumber and multiply by 1000000.
        After that we divide 1000000 by (roll number multiply by 0.99). All this
        divide by 1.
      </p>
      <pre className="mt-5 bg-theme p-3 rounded text-black-400">
        <code>// Game event translation</code>
        <br />
        <code>const roll = floatNumber * 1000000;</code>
        <br />
        <code>const multiplier = ((1000000 / (roll + 1) * 0.99)) / 1;</code>
      </pre>
      <p className="text-black-300 font-semibold uppercase text-xl mt-8 ">
        Roulette
      </p>
      <p className="text-black-300 mt-2">
        In the Roulette game, we get a floatNumber divided by 15. We parse the
        result to a integer number.
      </p>
      <pre className="mt-5 bg-theme p-3 rounded text-black-400">
        <code>// Game event translation</code>
        <br />
        <code>const roll = parseInt(floatNumber % 15);</code>
      </pre>
      <p className="text-black-300 font-semibold uppercase text-xl mt-8 ">
        HILO
      </p>
      <p className="text-black-300 mt-2">
        To generate series of cards, we use a floatNumber to draw randomized
        cards stream. In a standard deck of cards, there are 52 unique possible
        outcomes.
      </p>
      <pre className="mt-5 bg-theme p-3 rounded text-black-400">
        <code>// Game event translation</code>
        <br />
        <code>// Index of 0 to 51 : ♦2 to ♣A</code>
        <br />
        <code>
          const CARDS = [ ♦2, ♥2, ♠2, ♣2, <br /> ♦3, ♥3, ♠3, ♣3, ..., ♦K, ♥K,
          ♠K, ♣K, <br /> ♦A, ♥A, ♠A, ♣A ];
        </code>
        <br />
        <code>// Game event translation</code>
        <br />
        <code>const card = CARDS[Math.floor(floatNumber * 52)];</code>
      </pre>
    </div>
  );
};

export default Implementation;
