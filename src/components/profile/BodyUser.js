import CoinImage from "../../assets/img/coin.png";

const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const BodyUser = ({ wagared, bets, created }) => {
  return (
    <>
      <p className="text-black-400 text-sm mt-3 border rounded border-rose-300 px-2 py-1.5">
        Member since{" "}
        {new Date(created).toLocaleDateString("en-US", DATE_OPTIONS)}
      </p>
      <div className="flex space-x-3 mt-3">
        <div className="text-center w-full md:w-1/2 border border-rose-300 py-2 rounded">
          <p className="text-black-400 text-sm">Wagared</p>
          <img className="w-5 inline mr-2" src={CoinImage} alt="coins" />
          <p className="text-black-300 text-base mt-1 inline">
            {parseFloat(wagared).toFixed(4)}
          </p>
        </div>
        <div className="text-center w-full md:w-1/2 border border-rose-300 py-2 rounded">
          <p className="text-black-400 text-sm">Bets</p>
          <p className="text-black-300 text-base mt-1">{bets}</p>
        </div>
      </div>
    </>
  );
};

export default BodyUser;
