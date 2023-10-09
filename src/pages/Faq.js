import React from "react";

const Faq = () => {
  return (
    <div className="p-10">
      <p className="text-black-300 text-4xl font-semibold text-center mb-5">
        FAQ
      </p>
      <p className="text-black-300 text-md">
        Welcome to our Casino FAQ page! Here you'll find answers to some of the
        most frequently asked questions about our platform. If you can't find
        the answer you're looking for here, don't hesitate to contact our
        customer support team for further assistance.
      </p>
      <div className="text-black-300 mt-2">
        <h2 className="text-xl mt-5 mb-2">What currencies do you accept?</h2>
        <p>
          We accept Bitcoin (BTC), Dogecoin (DOGE), Litecoin (LTC), and Bitcoin
          Cash (BCH), Ingame currencies for the most popular MMORPG's.
        </p>

        <h2 className="text-xl mt-5 mb-2">
          How do I deposit cryptocurrency into my account?
        </h2>
        <p>
          To deposit cryptocurrency into your account, go to the deposit section
          of your account and select the cryptocurrency you wish to deposit.
          You'll be given a unique address to send your cryptocurrency to. Once
          the transaction is confirmed on the blockchain, your account will be
          credited.
        </p>

        <h2 className="text-xl mt-5 mb-2">
          How do I deposit ingame currencies into my account?
        </h2>
        <p>To deposit ingame currencies you can use the P2P exchange.</p>

        <h2 className="text-xl mt-5 mb-2">How do I withdraw my winnings?</h2>
        <p>
          To withdraw your winnings, go to the withdrawal section of your
          account and select the cryptocurrency you wish to withdraw. You'll be
          prompted to enter the amount you wish to withdraw and your
          cryptocurrency address. Once the withdrawal request is processed, the
          funds will be sent to your address.
        </p>

        <p className="mt-3">
          For ingame currencies select the game you want to use and wait for a
          cashier to further help you with a manual withdrawel of your funds.
        </p>

        <h2 className="text-xl mt-5 mb-2">What games do you offer?</h2>
        <p>
          We offer a wide variety of games, including slots, table games, video
          poker, and live dealer games.
        </p>

        <h2 className="text-xl mt-5 mb-2">Are the games fair?</h2>
        <p>
          Yes, all of our games are provably fair. We use a cryptographic
          algorithm to ensure that the outcome of each game is completely random
          and cannot be manipulated.
        </p>

        <h2 className="text-xl mt-5 mb-2">Is my personal information safe?</h2>
        <p>
          Yes, we take the security of our users' personal information very
          seriously. We use industry-standard encryption protocols to protect
          your data, and we will never share your information with third
          parties.
        </p>

        <h2 className="text-xl mt-5 mb-2">Do you offer bonuses?</h2>
        <p>
          Yes, we offer a variety of bonuses, including welcome bonuses, deposit
          bonuses, and loyalty rewards. Be sure to check our promotions page for
          the latest offers.
        </p>

        <h2 className="text-xl mt-5 mb-2">Can I play on mobile devices?</h2>
        <p>
          Yes, our platform is fully mobile-optimized and can be accessed on any
          device with an internet connection.
        </p>

        <h2 className="text-xl mt-5 mb-2">
          How can I contact customer support?
        </h2>
        <p>
          You can contact our customer support team via email, live chat, or
          phone. Our support team is available 24/7 to assist you with any
          questions or issues you may have.
        </p>
      </div>
    </div>
  );
};

export default Faq;
