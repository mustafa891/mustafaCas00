import { useState, useEffect, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Wheel } from "react-custom-roulette";
import { setAuthModalForm, setAuthOpen } from "../store/modals/modalSlice";
import GamePage from "../components/template/Games/GamePage";
import GameMenu from "../components/GameMenu";
import GamePanel from "../components/template/Games/GamePanel";
import BetHistory from "../components/history/BetHistory";
import Label from "../components/template/Inputs/Label";
import Input from "../components/template/Inputs/Input";
import ButtonGreen from "../components/template/buttons/ButtonGreen";
import PlaySound from "../assets/sounds/rolling-roulette.mp3";
import ClickSound from "../assets/sounds/click.mp3";
import {
  sendRequestCaseContents,
  simpleSendRequestCases,
  sendRequestCases,
  resetProfitLoss,
  setRolledCases,
  setCasesContent,
} from "../store/games/casesSlice";

const categoryToIndex = (category, casesContent) => {
  let index = casesContent.findIndex(cc => cc.category.toLowerCase() === category.toLowerCase());
  if (index < 0) index = 0;
  return index;
}

const wheelDataFunc = (casesContent) => {
  return casesContent.map((cc) => {
    let color = "";
    switch (cc.category) {
      case "common": {
        color = "grey";
        break;
      }
      case "uncommon": {
        color = "green";
        break;
      }
      case "rare": {
        color = "blue";
        break;
      }
      case "epic": {
        color = "purple";
        break;
      }
      case "legendary": {
        color = "yellowgold";
        break;
      }
      case "deity": {
        color = "white";
        break;
      }
      default: {
        color = "lightgrey";
      }
    }

    return {
      option: cc.name,
      image: {
        uri: cc.image,
        sizeMultiplier: 0.5,
      },
      style: {
        backgroundColor: color,
      },
    };
  });
};

const Cases = () => {
  const { errors, isLoading, message, casesContent } = useSelector(
    (state) => state.cases
  );
  const { isAuthenticated } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [isMuteOn, setIsMuteOn] = useState(false);

  const [caseOpenAmount, setCaseOpenAmount] = useState("1");
  const [isRunning, setIsRunning] = useState(false);

  const [mustSpin, setMustSpin] = useState(false);
  const [spinToCase, setSpinToCase] = useState(0);

  const [sRolledCases, setsRolledCases] = useState([]);
  const [showCaseIndex, setShowCaseIndex] = useState(0);
  const [showCases, setShowCases] = useState([]);
  const [lastResults, setLastResults] = useState([]);

  const soundPlay = new Audio(PlaySound);

  const sendRequestFunc = () => {
    if (!isMuteOn) soundPlay.play();
    setShowCases([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRunning(true);
    setTimeout(() => {
      sendRequestFunc();
      setMustSpin(true);
    }, 1000);
  };

  //Auth modal
  const openNewModal = (modal) => {
    dispatch(setAuthOpen(true));
    dispatch(setAuthModalForm(modal));
  };

  const setupMultiSpin = () => {
    console.log("stopping");
    if (sRolledCases.length < 1) {
      setSpinToCase(0);
      setShowCaseIndex(0);
      setMustSpin(false);
      setIsRunning(false);
      setRolledCases([]);
      return;
    }

    setShowCases([...showCases, sRolledCases[showCaseIndex]]);

    if (sRolledCases.length - showCaseIndex > 1) {
      console.log("Start next spin in 1 sec.");
      setMustSpin(false);
      setTimeout(() => {
        setSpinToCase(categoryToIndex(sRolledCases[showCaseIndex + 1].case.category, casesContent));
        setMustSpin(true);
        setShowCaseIndex(showCaseIndex + 1);
      }, 1000);
    } 
    else {
      setSpinToCase(0);
      setShowCaseIndex(0);
      setMustSpin(false);
      setIsRunning(false);
      setRolledCases([]);
    }
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
  }, [errors, message, dispatch]);

  useEffect(() => {
    console.log(isRunning);
    if (!isRunning) return;
    simpleSendRequestCases({
      case_open_amount: parseInt(caseOpenAmount),
    }).then(rc => {
      setsRolledCases(rc)
      setSpinToCase(categoryToIndex(rc[0].case.category, casesContent))
    });
  }, [caseOpenAmount, isRunning, casesContent]);

  useEffect(() => {
    return () => {
      dispatch(
        setRolledCases({
          rolledCases: null,
        })
      );
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(sendRequestCaseContents());
    console.log("jinkies");
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetProfitLoss());
    };
  }, [dispatch]);

  return (
    <div className="mt-12">
      <GamePage>
        <div className="bg-theme rounded-md rounded-br-none rounded-bl-none flex-col-reverse md:flex-row flex shadow-xl">
          <div className="w-full md:w-2/6 bg-theme md:rounded-tl-md rounded-bl-md rounded-br-md md:rounded-br-none py-5 px-4">
            <Label text="Cases To Open" />
            <div className="flex justify-between flex-col lg:flex-row">
              <Input
                type="number"
                name="case_open_amount"
                icon="coins"
                placeholder="0.0000"
                value={caseOpenAmount}
                onChange={(e) => setCaseOpenAmount(e.target.value)}
                onBlur={(e) => setCaseOpenAmount(parseInt(e.target.value))}
                readOnly={false}
                isLoading={isLoading || isRunning ? true : false}
                className="w-full lg:w-8/12 mr-1"
              />
            </div>
            {isAuthenticated ? (
              <ButtonGreen
                type="button"
                text="Bet"
                icon="fa-play"
                isLoading={isLoading || isRunning ? true : false}
                onClick={(e) => handleSubmit(e)}
              />
            ) : (
              <ButtonGreen
                type="button"
                text="Bet"
                icon="fa-play"
                onClick={() => openNewModal("login")}
              />
            )}
          </div>
          <GamePanel>
            <div className="page_content cases_game">
            <div className="cases-container">
              { casesContent.length > 0 ? <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={spinToCase}
                  data={wheelDataFunc(casesContent)}
                  onStopSpinning={setupMultiSpin}
              />: null}
              </div>
              <div className="show-cases">
                {showCases && showCases?.length > 0
                  ? showCases.map((c, i) => {
                      return (
                        <>
                          <img src={c.case.image} alt={c.case.name} key={i}/>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </GamePanel>
        </div>
        <GameMenu setIsMuteOn={setIsMuteOn} isMuteOn={isMuteOn} game="cases" />
        <BetHistory isAuthenticated={isAuthenticated} />
      </GamePage>
    </div>
  );
};

export default Cases;
