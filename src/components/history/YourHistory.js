import { useDispatch } from "react-redux";
import CoinImage from "../../assets/img/coin.png";
import { setBetId, setBetOpen } from "../../store/modals/modalSlice";
import { toFixedTrunc } from "../../utils/Helpers";

const YourHistory = ({ userHistory }) => {
  const dispatch = useDispatch();

  const ImageComponent = (game) => {
    let imageResponse;

    switch (game) {
      case "hilo":
        imageResponse = (
          <i className="fa-solid fa-down-left-and-up-right-to-center mr-5"></i>
        );
        break;
      case "cases":
        imageResponse = <i className="fa-solid fa-box-open mr-5"></i>;
        break;
      case "dice":
        imageResponse = <i className="fa-solid fa-dice-five mr-5"></i>;
        break;
      case "roulette":
        imageResponse = (
          <i className="fa-solid fa-arrow-up-wide-short mr-5"></i>
        );
        break;
      case "limbo":
        imageResponse = <i className="fa-solid fa-bullseye mr-5"></i>;
        break;
      case "crash":
        imageResponse = <i className="fa-solid fa-chart-line mr-5"></i>;
        break;

      default:
        break;
    }

    return imageResponse;
  };

  const handleOpenBet = (betid) => {
    dispatch(setBetId(betid));
    dispatch(setBetOpen(true));
  };

  return (
    <div>
      <div className="flex justify-center ">
        <table className="w-full">
          <thead className="rounde-md">
            <tr>
              <th
                scope="col"
                className="text-sm font-semibold text-black-400 px-6 py-5 text-left"
              >
                Game
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
              >
                Bet Amount
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
              >
                Multiplier
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
              >
                Profit
              </th>
            </tr>
          </thead>
          <tbody className="rounded-md">
            {userHistory.length > 0 ? (
              userHistory.map((item, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-theme" : "bg-theme"
                  } hover:opacity-50 cursor-pointer`}
                  key={index}
                  onClick={() => handleOpenBet(item._id)}
                >
                  <td
                    className={`${
                      index % 2 !== 0 && "rounded-tl-md rounded-bl-md"
                    } px-6 py-4 text-sm text-black-300 left`}
                  >
                    {ImageComponent(item.game)}
                    <span className="capitalize font-medium">{item.game}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                    {toFixedTrunc(item.bet_amount, 4)}
                    <img
                      src={CoinImage}
                      className="w-5 inline-block ml-2"
                      alt="Coin"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                    {toFixedTrunc(item.multiplier, 2)}x
                  </td>
                  <td
                    className={`${
                      index % 2 !== 0 && "rounded-tr-md rounded-br-md"
                    } ${
                      parseFloat(item.profit) > 0
                        ? "text-green-400"
                        : "text-black-400"
                    } px-6 py-4 whitespace-nowrap text-sm font-medium text-right`}
                  >
                    {item.profit}
                    <img
                      src={CoinImage}
                      className="w-5 inline-block ml-2"
                      alt="Coin"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-rose-600">
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-300 w-1/2 text-center"
                  colSpan="4"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourHistory;
