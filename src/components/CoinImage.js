import BTCImage from "../assets/img/base-BTC.png";
import BCHImage from "../assets/img/base-BCH.png";
import DOGEImage from "../assets/img/base-DOGE.png";
import LTCImage from "../assets/img/base-LTC.png";

const CoinImage = ({
  coin = "btc",
  className = "inline mr-1.5 w-5",
  custom = false,
}) => {
  let coinPrint = "";
  if (!custom) {
    switch (coin) {
      case "btc":
        coinPrint = (
          <img src={BTCImage} className={`${className}`} alt="Coin" />
        );
        break;
      case "bch":
        coinPrint = (
          <img src={BCHImage} className={`${className}`} alt="Coin" />
        );
        break;
      case "doge":
        coinPrint = (
          <img src={DOGEImage} className={`${className}`} alt="Coin" />
        );
        break;
      case "ltc":
        coinPrint = (
          <img src={LTCImage} className={`${className}`} alt="Coin" />
        );
        break;

      default:
        coinPrint = (
          <img src={BTCImage} className={`${className}`} alt="Coin" />
        );
        break;
    }
  } else {
    coinPrint = <img src={coin} className={`${className}`} alt="Coin" />;
  }

  return <>{coinPrint}</>;
};

export default CoinImage;
