import { useState, useEffect, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";
import GamePage from "../components/template/Games/GamePage";
import GameMenu from "../components/GameMenu";
import GamePanel from "../components/template/Games/GamePanel";
import BetHistory from "../components/history/BetHistory";
import Label from "../components/template/Inputs/Label";
import Input from "../components/template/Inputs/Input";

import SlotScreenBorder from "../assets/img/aussie-slots/slots-border-redone.png";
import PlaySound from "../assets/sounds/slot-machine.wav";
import DoubleUpBg from "../assets/img/aussie-slots/double-up-modal-bg.png";

import Slot from "../components/slots/Slot";
import Card from "../components/slots/Card";
import CardBack from "../components/slots/CardBack";

const AussieSlots = () => {
  const { isAuthenticated } = useSelector((state) => state.users);
  const {
    errors,
    message,
    isLoading,
    isLoadingData,
    bet_amount,
    roll_numbers,
    amountProfit,
    is_double_up_active,
    double_up_result,
    double_up_history,
  } = useSelector((state) => state.slots);
  const dispatch = useDispatch();
  const soundPlay = new Audio(PlaySound);

  //Auth modal
  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  const slotDOM = useRef();
  const slotReels = useRef();
  const slotReel = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const slot = useRef();
  const spinBtn = useRef();
  const flipCoverBetDisplay = useRef();
  const betIncrementBtn = useRef();
  const betInput = useRef();
  const maxBetBtn = useRef();
  const [doubleUpModalState, setDoubleUpModalState] = useState(0);
  const [doubleUpColorSelected, setDoubleUpColorSelected] = useState("");
  const [doubleUpSelectedCard, setDoubleUpColorSelectedCard] = useState(0);

  const start = () => {
    spinBtn.current.disabled = true;
    slot.current.spin();
  };

  const config = {
    inverted: false, // true: reels spin from top to bottom; false: reels spin from bottom to top
    onSpinStart: (suits) => {
      console.log("onSpinStart", suits);
      soundPlay.play();
    },
    onSpinEnd: (suits) => {
      console.log("onSpinEnd", suits);
      spinBtn.current.disabled = false;
    },
  };

  useEffect(() => {
    if (!slot.current) slot.current = new Slot(slotDOM.current, config);
  });

  return (
    <div className="mt-12">
      <GamePage>
        <div className="bg-theme rounded-md rounded-br-none rounded-bl-none flex-col-reverse md:flex-row flex shadow-xl">
          <div className="w-full md:w-2/6 bg-theme md:rounded-tl-md rounded-bl-md rounded-br-md md:rounded-br-none py-5 px-4">
            <Label text="Aussie Slots" />
          </div>
        </div>
        <div className="w-full px-3 py-10 shadow-inner bg-theme rounded-tl-md md:rounded-tl-none rounded-tr-md md:rounded-br-md">
          <div className="page_content aussie_slots_game">
            {doubleUpModalState >= 0 ? (
              <div
                id="double-up-modal"
                style={{ backgroundImage: `url(${DoubleUpBg})` }}
              >
                {doubleUpModalState === 0 ? (
                  <div className="my-20">
                    <h2 className="text-center text-3xl">Double Up</h2>
                    <p className="text-center my-2">
                      Gamble your winnings for a chance to collect twice the
                      amount or collect your winnings now.
                    </p>
                    <div className="double-up-home-button-row">
                      <div className="flex justify-around">
                        <input
                          className="double-up-button"
                          type="button"
                          value="Gamble"
                          onClick={() => {
                            setDoubleUpModalState(1);
                          }}
                        />
                        <input
                          className="double-up-button"
                          type="button"
                          value="Collect"
                          onClick={() => {
                            setDoubleUpModalState(-1);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : doubleUpModalState === 1 ? (
                  <div className="flex justify-around items-center">
                    <div>
                      <input
                        type="button"
                        className="double-up-button"
                        value="RED"
                        onClick={() => setDoubleUpColorSelected("RED")}
                      />
                    </div>
                    <div>
                      {doubleUpColorSelected === "RED" ? (
                        <div className="double-up-result">You Win</div>
                      ) : doubleUpColorSelected === "BLACK" ? (
                        <div className="double-up-result">You Lose</div>
                      ) : null}

                      {!doubleUpColorSelected ? (
                        <CardBack />
                      ) : (
                        <Card cardNumber={doubleUpSelectedCard} />
                      )}
                    </div>
                    <div>
                      <input
                        type="button"
                        className="double-up-button"
                        value="BLACK"
                        onClick={() => setDoubleUpColorSelected("BLACK")}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="slot">
              <img
                className="slot-frame"
                src={SlotScreenBorder}
                alt="SlotFrame"
              />
              <div id="slot" ref={slotDOM}>
                <div id="reels" ref={slotReels}>
                  <div class="reel" ref={slotReel[0]}></div>
                  <div class="reel" ref={slotReel[1]}></div>
                  <div class="reel" ref={slotReel[2]}></div>
                  <div class="reel" ref={slotReel[3]}></div>
                  <div class="reel" ref={slotReel[4]}></div>
                </div>
              </div>
            </div>

            {/* <div class="flip-cover-bet" style={{width: "80px"}} ref={flipCoverBetDisplay}>
              <div class="bet-button">
                <input type="number" placeholder="100" />
              </div>
              <div class="bet-cover">
                <div class="bet-outer"></div>
                <div class="bet-inner"></div>
              </div>
            </div> */}
            <div class="grid grid-cols-3">
              <div className="col-start-2 col-span-1 glow-on-hover">
                <span>Winnings</span>
                <br />
                <span>0</span>
              </div>
              <button
                class="spinButton col-start-3 col-span-1"
                onClick={start}
                ref={spinBtn}
              >
                <span>Spin</span>
              </button>
            </div>
          </div>
        </div>
      </GamePage>
    </div>
  );
};

export default AussieSlots;
