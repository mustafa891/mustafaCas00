import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateGameResult,
  hideAlerts,
  setCalculateResult,
} from "../../store/fairness/fairnessSlice";
import ButtonGreen from "../template/buttons/ButtonGreen";
import Input from "../template/Inputs/Input";
import Label from "../template/Inputs/Label";
import CrashResult from "./CrashResult";
import DiceResult from "./DiceResult";
import FaucetResult from "./FaucetResult";
import HiloResult from "./HiloResult";
import LimboResult from "./LimboResult";
import RouletteResult from "./RouletteResult";

const games = [
  { name: "crash", icon: "fa-chart-line" },
  { name: "dice", icon: "fa-dice-five" },
  { name: "faucet", icon: "fa-faucet-drip" },
  { name: "limbo", icon: "fa-bullseye" },
  { name: "roulette", icon: "fa-arrow-up-wide-short" },
  { name: "hilo", icon: "fa-down-left-and-up-right-to-center" },
];

const Calculation = () => {
  const [selected, setSelected] = useState(games[0]);
  const [clientSeed, setClientSeed] = useState("");
  const [serverSeed, setServerSeed] = useState("");
  const [nonce, setNonce] = useState(0);

  const { errors, message, calculateResult, isLoading } = useSelector(
    (state) => state.fairness
  );

  const dispatch = useDispatch();

  const gameResult = (data) => {
    let gamePrint = "";
    switch (data.game) {
      case "dice":
        gamePrint = <DiceResult rollNumber={data.result} />;
        break;
      case "faucet":
        gamePrint = <FaucetResult rollNumber={data.result} />;
        break;
      case "limbo":
        gamePrint = <LimboResult resultNumber={data.result} />;
        break;
      case "roulette":
        gamePrint = <RouletteResult showNumber={data.result} />;
        break;
      case "hilo":
        gamePrint = <HiloResult allCards={data.result} />;
        break;
      case "crash":
        gamePrint = <CrashResult crashPoint={data.result} />;
        break;

      default:
        break;
    }

    return gamePrint;
  };

  const handleCalculate = () => {
    let data = {
      client_seed: clientSeed,
      server_seed: serverSeed,
      nonce,
      game: selected?.name || "dice",
    };
    dispatch(calculateGameResult(data));
  };

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors, {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
    }
    if (message !== null) {
      toast.success(message, {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
      dispatch(hideAlerts());
    }

    // eslint-disable-next-line
  }, [errors, message, dispatch]);

  useEffect(() => {
    return () => {
      return dispatch(setCalculateResult({}));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Label text="Game" />
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-md bg-theme border border-rose-200 
                    py-3 pl-5 pr-10 text-left text-blue-white-200
                   hover:opacity-80 focus:outline-none sm:text-sm"
          >
            <span className="block truncate capitalize">
              <i className={`fa-solid ${selected.icon} mr-2.5`}></i>
              <span className="font-medium">{selected.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <i className="fa-solid fa-chevron-down text-black-400"></i>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-md bg-theme pb-3 pt-2 px-2 text-base shadow-xl ring-2 ring-dark-green-300 ring-opacity-10 focus:outline-none sm:text-sm">
              {games.map((game, gameIdx) => (
                <Listbox.Option
                  key={gameIdx}
                  className={({ active, selected }) =>
                    `relative cursor-default select-none py-3 pl-10 pr-4 rounded-md bg-theme mt-1 ${
                      active || selected
                        ? "border border-green-light-200 text-blue-white-200"
                        : "border border-rose-200 text-blue-white-200"
                    }`
                  }
                  value={game}
                >
                  {({ selected }) => (
                    <>
                      <i className={`fa-solid ${game.icon} mr-2.5`}></i>
                      <span
                        className={`truncate inline capitalize ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {game.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-light-200">
                          <i className="fa-solid fa-check"></i>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <Label text="Client Seed" />
      <Input
        type="text"
        name="client_seed"
        iconPosition="none"
        placeholder=""
        value={clientSeed}
        onChange={(e) => setClientSeed(e.target.value)}
        onBlur={() => {}}
        readOnly={false}
        isLoading={false}
        isAutoOn={false}
        className="w-full"
        inputClass="bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400"
      />
      <Label text="Server Seed" />
      <Input
        type="text"
        name="server_seed"
        iconPosition="none"
        placeholder=""
        value={serverSeed}
        onChange={(e) => setServerSeed(e.target.value)}
        onBlur={() => {}}
        readOnly={false}
        isLoading={false}
        isAutoOn={false}
        className="w-full"
        inputClass="bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400"
      />
      <Label text="Nonce" />
      <Input
        type="text"
        name="nonce"
        iconPosition="none"
        placeholder=""
        value={nonce}
        onChange={(e) => setNonce(e.target.value)}
        onBlur={() => {}}
        readOnly={false}
        isLoading={false}
        isAutoOn={false}
        className="w-full"
        inputClass="bg-theme text-sm w-full py-3 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400"
      />
      <ButtonGreen
        type="button"
        text="Verify"
        icon="fa-scale-balanced"
        isLoading={isLoading}
        onClick={handleCalculate}
      />
      <div className="mt-5">{gameResult(calculateResult)}</div>
    </>
  );
};

export default Calculation;
