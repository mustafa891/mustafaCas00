import CoinImage from "../../assets/img/coin.png";

const YourClaims = ({ userHistory }) => {
  return (
    <div>
      <div className="flex justify-center ">
        <table className="w-full">
          <thead className="rounded-md">
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
                Lucky Number
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-black-400 px-6 py-5 text-right"
              >
                Payout
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
                >
                  <td
                    className={`${
                      index % 2 !== 0 && "rounded-tl-md rounded-bl-md"
                    } px-6 py-4 text-sm text-black-300 left`}
                  >
                    <i className="fa-solid fa-faucet-drip mr-5"></i>
                    <span>Faucet</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black-300 text-right">
                    {item.roll_number}
                  </td>
                  <td
                    className={`${
                      index % 2 !== 0 && "rounded-tr-md rounded-br-md"
                    } text-green-400 px-6 py-4 whitespace-nowrap text-sm font-medium text-right`}
                  >
                    +{item.payout}
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
                  colSpan="3"
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

export default YourClaims;
