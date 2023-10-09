import React from "react";

const Overview = () => {
  return (
    <div className="bg-theme rounded-md p-6 w-full">
      <p className="text-black-300 font-semibold uppercase text-2xl ">
        Probably Fair Overview
      </p>
      <p className="text-black-300 mt-5">
        We use a cryptographic provably fair algorithm which allows users to
        check and analyze the legitimacy of every bet and confirm they are not
        manipulated. Our random numbers are generated through the use of two
        seeds (a server seed and a client seed) and nonce number.
      </p>
      <p className="text-black-300 font-semibold uppercase text-xl mt-8 ">
        PARAMETERS
      </p>
      <p className="text-black-300 mt-2">
        First of all, each game requires certain parameters:
      </p>
      <div className="text-black-300 mt-4 ml-5">
        <p className=" uppercase text-lg">Server Seed</p>
        <p className="text-black-300 mt-2">
          The server seed is generated by our system as a random 64-character
          hex string. You are then provided with an encrypted hash of that
          generated server seed before you place any bets. The reason we provide
          you with the encrypted form of the server seed is to ensure that the
          un-hashed server seed cannot be changed by the casino operator, and
          that the player cannot calculate the results beforehand.
          <br />
          <br />
          To reveal the server seed from its hashed version, the seed must be
          rotated by the player, which triggers the replacement with a newly
          generated one.
          <br />
          <br />
          From this point you are able to verify that the hashed server seed
          matches that of the un-hashed server seed. This process can be
          verified via our un-hashed server seed function found in the menu
          above.
        </p>
        <p className=" uppercase text-lg mt-4">Client Seed</p>
        <p className="text-black-300 mt-2">
          The client seed belongs to the player and is used to ensure the player
          also has influence on the randomness of the outcomes generated.
          Without this component of the algorithm, the server seed alone would
          have complete leverage over the outcome of each bet.
          <br />
          <br />
          All players are free to edit and change their client seed regularly to
          create a new chain of random upcoming outcomes. This ensures the
          player has absolute control over the generation of the result, similar
          to cutting the deck at a brick and mortar casino.
          <br />
          <br />
          During registration, a client seed is created for you by your browser,
          to ensure your initial experience with the site goes uninterrupted.
          Whilst this randomly generated client seed is considered suitable, we
          highly recommend that you choose your own, so that your influence is
          included in the randomness.
          <br />
          <br />
          You can do this via the fairness modal.
        </p>
        <p className=" uppercase text-lg mt-4">Nonce</p>
        <p className="text-black-300 mt-2">
          The nonce is simply a number that increments as every new bet is made.
          Due to the nature of the SHA256 cryptographic function, this creates a
          completely new result each time, without having to generate a new
          client seed and server seed.
          <br />
          <br />
          The implementation of nonce, ensures we remain committed to your
          client seed and server seed pair, whilst generating new results for
          each bet placed.
        </p>
      </div>
    </div>
  );
};

export default Overview;
