import React from "react";
import Input from "../template/Inputs/Input";
import Label from "../template/Inputs/Label";

const AutoDetails = ({
  isLoading,
  numberBets,
  setNumberBets,
  winIncrease,
  setWinIncrease,
  winAmount,
  setWinAmount,
  lossIncrease,
  setLossIncrease,
  lossAmount,
  setLossAmount,
  stopProfit,
  setStopProfit,
  stopLoss,
  setStopLoss,
  isAutoOn,
}) => {
  //Min Max Number of bets
  const validateNBets = (e) => {
    let nBets;
    if (e.target.value !== "") {
      nBets = parseInt(e.target.value);
    } else {
      nBets = 10;
    }

    if (nBets < 3) {
      nBets = 3;
    } else if (nBets > 999) {
      nBets = 999;
    }
    setNumberBets(Math.abs(nBets));
  };

  const hanleSetNumberBets = (e) => {
    setNumberBets(e.target.value);
  };

  const onWinChange = (e) => {
    setWinAmount(e.target.value);
  };
  const onWinBlur = (e) => {
    setWinAmount(parseFloat(Math.abs(e.target.value)).toFixed(2));
  };

  const onLossChange = (e) => {
    setLossAmount(e.target.value);
  };
  const onLossBlur = (e) => {
    setLossAmount(parseFloat(Math.abs(e.target.value)).toFixed(2));
  };

  const onStopProfitChange = (e) => {
    setStopProfit(e.target.value);
  };
  const onStopProfitBlur = (e) => {
    setStopProfit(parseFloat(Math.abs(e.target.value)).toFixed(2));
  };

  const onStopLossChange = (e) => {
    setStopLoss(e.target.value);
  };
  const onStopLossBlur = (e) => {
    setStopLoss(parseFloat(Math.abs(e.target.value)).toFixed(2));
  };

  return (
    <>
      <Label text="Number of Bets" />
      <div className="flex justify-between">
        <Input
          type="number"
          name="number_bets"
          icon=""
          iconPosition="none"
          placeholder="0"
          value={numberBets}
          onChange={hanleSetNumberBets}
          onBlur={validateNBets}
          readOnly={false}
          isLoading={isLoading}
          isAutoOn={isAutoOn}
          className="w-6/12 mr-1"
        />
        <button
          className="w-3/12 bg-theme text-black-400 text-sm font-medium rounded-md hover:bg-theme"
          onClick={() => setNumberBets(3)}
          disabled={isLoading || isAutoOn ? true : false}
        >
          Min
        </button>
        <button
          className="w-3/12 relative bg-theme text-black-400 text-sm font-medium rounded-md
                   hover:bg-theme after:absolute after:w-1 after:bg-theme after:-left-0.5
                   after:top-1/4 after:bottom-1/4
                   "
          onClick={() => setNumberBets(999)}
          disabled={isLoading || isAutoOn ? true : false}
        >
          Max
        </button>
      </div>
      <Label text="On Win" />
      <div className="flex justify-between">
        <button
          className={`w-3/12 text-black-400 text-sm font-medium rounded-md ${
            !winIncrease
              ? "bg-theme"
              : "bg-theme hover:bg-theme"
          }`}
          onClick={() => setWinIncrease(false)}
          disabled={isLoading || isAutoOn || !winIncrease ? true : false}
        >
          Reset
        </button>
        <button
          className={`w-5/12 relative text-black-400 text-sm font-medium rounded-md after:absolute after:w-1 after:bg-theme after:-left-0.5
                   after:top-1/4 after:bottom-1/4
                   ${
                     winIncrease
                       ? "bg-theme"
                       : "bg-theme hover:bg-theme"
                   }`}
          onClick={() => setWinIncrease(true)}
          disabled={isLoading || isAutoOn || winIncrease ? true : false}
        >
          Increase by:
        </button>
        <Input
          type="number"
          name="on_win"
          icon="percentage"
          iconPosition="end"
          placeholder="0"
          value={winAmount}
          onChange={onWinChange}
          onBlur={onWinBlur}
          readOnly={false}
          isLoading={isLoading || !winIncrease ? true : false}
          isAutoOn={isAutoOn}
          className={`${!winIncrease && "opacity-75"} w-6/12 ml-1`}
        />
      </div>
      <Label text="On Loss" />
      <div className="flex justify-between">
        <button
          className={`w-3/12 text-black-400 text-sm font-medium rounded-md ${
            !lossIncrease
              ? "bg-theme"
              : "bg-theme hover:bg-theme"
          }`}
          onClick={() => setLossIncrease(false)}
          disabled={isLoading || isAutoOn || !lossIncrease ? true : false}
        >
          Reset
        </button>
        <button
          className={`w-5/12 relative text-black-400 text-sm font-medium rounded-md after:absolute after:w-1 after:bg-theme after:-left-0.5
                   after:top-1/4 after:bottom-1/4
                   ${
                     lossIncrease
                       ? "bg-theme"
                       : "bg-theme hover:bg-theme"
                   }`}
          onClick={() => setLossIncrease(true)}
          disabled={isLoading || isAutoOn || lossIncrease ? true : false}
        >
          Increase by:
        </button>
        <Input
          type="number"
          name="on_loss"
          icon="percentage"
          iconPosition="end"
          placeholder="0"
          value={lossAmount}
          onChange={onLossChange}
          onBlur={onLossBlur}
          readOnly={false}
          isLoading={isLoading || !lossIncrease ? true : false}
          isAutoOn={isAutoOn}
          className={`${!lossIncrease && "opacity-75"} w-6/12 ml-1`}
        />
      </div>
      <Label text="Stop on Profit" />
      <Input
        type="number"
        name="stop_profit"
        icon="coins"
        iconPosition="end"
        placeholder="0"
        value={stopProfit}
        onChange={onStopProfitChange}
        onBlur={onStopProfitBlur}
        readOnly={false}
        isLoading={isLoading}
        isAutoOn={isAutoOn}
      />
      <Label text="Stop on Loss" />
      <Input
        type="number"
        name="stop_profit"
        icon="coins"
        iconPosition="end"
        placeholder="0"
        value={stopLoss}
        onChange={onStopLossChange}
        onBlur={onStopLossBlur}
        readOnly={false}
        isLoading={isLoading}
        isAutoOn={isAutoOn}
      />
    </>
  );
};

export default AutoDetails;
