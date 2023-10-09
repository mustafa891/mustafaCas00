import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import InterrogationImage from "../../assets/img/interrogation.png";
import CheckImage from "../../assets/img/check.png";
import CrossedImage from "../../assets/img/crossed.png";
import { useEffect, useState } from "react";

const GameResult = ({ multiplier, resultNumber, win }) => {
  const [printImage, setPrintImage] = useState(
    <img style={{ width: 32 }} src={InterrogationImage} alt="Result" />
  );

  const calculePercetage = () => {
    let percentage = 0;
    if (multiplier <= 10) {
      percentage = (multiplier * 100) / 20;
    } else if (multiplier > 10 && multiplier <= 120) {
      percentage = (multiplier * 25) / 120;
      percentage = percentage + 50;
    } else if (multiplier > 120) {
      percentage = (multiplier * 25) / 990;
      percentage = percentage + 75;
    }

    return percentage;
  };

  const getColorR = () => {
    if (resultNumber === null) {
      return "#dfedf8";
    } else {
      if (win) {
        return "#67de7d";
      } else {
        return "#ed4f5c";
      }
    }
  };

  const calculeResult = () => {
    let percentage = 0;
    if (resultNumber !== null) {
      if (resultNumber <= 10) {
        percentage = (resultNumber * 100) / 20;
      } else if (resultNumber > 10 && resultNumber <= 120) {
        percentage = (resultNumber * 25) / 120;
        percentage = percentage + 50;
      } else if (resultNumber > 120) {
        percentage = (resultNumber * 25) / 990;
        percentage = percentage + 75;
      }
    }

    return percentage;
  };

  useEffect(() => {
    if (resultNumber !== null && win) {
      setPrintImage(
        <img style={{ width: 32 }} src={CheckImage} alt="Result" />
      );
    } else if (resultNumber !== null && !win) {
      setPrintImage(
        <img style={{ width: 32 }} src={CrossedImage} alt="Result" />
      );
    } else {
      setPrintImage(
        <img style={{ width: 32 }} src={InterrogationImage} alt="Result" />
      );
    }
  }, [resultNumber, win]);

  return (
    <div className="flex justify-center mx-auto w-1/2 lg:w-1/3">
      <CircularProgressbarWithChildren
        value={calculePercetage()}
        strokeWidth={4}
        styles={buildStyles({
          pathColor: getColorR(),
          trailColor: "transparent",
          backgroundColor: "#213743",
        })}
        background={true}
        backgroundPadding={2}
      >
        {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
        <div style={{ width: "85%" }}>
          <CircularProgressbarWithChildren
            value={calculeResult()}
            strokeWidth={50}
            styles={buildStyles({
              strokeLinecap: "butt",
              pathColor: getColorR(),
              trailColor: "#2a4554",
              backgroundColor: "#2a4554",
              textColor: "#dfedf8",
            })}
            background={true}
            backgroundPadding={3}
          >
            <div style={{ width: "35%" }}>
              <CircularProgressbarWithChildren
                value={100}
                strokeWidth={50}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#2a4554",
                  trailColor: "#2a4554",
                  backgroundColor: "#213743",
                })}
                background={true}
                backgroundPadding={8}
              >
                {printImage}
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default GameResult;
