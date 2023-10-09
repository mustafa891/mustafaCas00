import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import DragSound from "../../../assets/sounds/drag.mp3";

const marks = {
  0: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  5: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  10: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  15: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  20: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  25: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  30: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  35: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  40: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  45: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  50: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  55: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  60: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  65: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  70: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  75: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  80: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  85: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  90: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  95: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
  100: {
    style: {
      color: "transparent",
    },
    label: ".",
  },
};

const RangeInput = ({ handleMultiplierFromRange }) => {
  const [value, setValue] = useState(25);

  const funChangeValueMul = (val) => {
    let rValue = 1.0102;
    switch (val) {
      case 0:
        rValue = 1.0102;
        break;
      case 5:
        rValue = 1.05;
        break;
      case 10:
        rValue = 1.1;
        break;
      case 15:
        rValue = 1.25;
        break;
      case 20:
        rValue = 1.5;
        break;
      case 25:
        rValue = 1.65;
        break;
      case 30:
        rValue = 2;
        break;
      case 35:
        rValue = 3;
        break;
      case 40:
        rValue = 5;
        break;
      case 45:
        rValue = 7.5;
        break;
      case 50:
        rValue = 10;
        break;
      case 55:
        rValue = 15;
        break;
      case 60:
        rValue = 20;
        break;
      case 65:
        rValue = 25;
        break;
      case 70:
        rValue = 30;
        break;
      case 75:
        rValue = 40;
        break;
      case 80:
        rValue = 50;
        break;
      case 85:
        rValue = 100;
        break;
      case 90:
        rValue = 300;
        break;
      case 95:
        rValue = 500;
        break;
      case 100:
        rValue = 990;
        break;

      default:
        break;
    }
    return rValue;
  };

  const soundDrag = new Audio(DragSound);
  const handleRange = (val) => {
    soundDrag.play();
    let rValue = funChangeValueMul(val);
    setValue(val);
    handleMultiplierFromRange(rValue);
  };

  const handleMinus = () => {
    if (value > 0) {
      soundDrag.play();
      let rValue = funChangeValueMul(value - 5);
      handleMultiplierFromRange(rValue);
      setValue(value - 5);
    }
  };

  const handlePlus = () => {
    if (value < 100) {
      soundDrag.play();
      let rValue = funChangeValueMul(value + 5);
      handleMultiplierFromRange(rValue);
      setValue(value + 5);
    }
  };

  return (
    <>
      <div className="flex justify-between space-x-5 items-center">
        <div className="">
          <button
            className="px-3 py-1 text-black-300 rounded-md cursor-pointer bg-gradient-to-t from-dark-green-400 to-dark-green-300 hover:opacity-80"
            onClick={handleMinus}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
        <Slider
          min={0}
          marks={marks}
          onChange={handleRange}
          step={null}
          defaultValue={25}
          value={value}
          rackStyle={{ backgroundColor: "#192127", height: 10 }}
          handleStyle={{
            borderColor: "#67de7d",
            backgroundColor: "#67de7d",
            height: 18,
            width: 18,
            marginTop: -6,
            boxShadow: "0 0 0 5px #67de7d",
          }}
          railStyle={{
            backgroundColor: "#192127",
            height: 10,
            marginTop: "-2px",
          }}
          dotStyle={{
            backgroundColor: "#192127",
            border: "none",
            height: "0px",
          }}
          trackStyle={{
            backgroundColor: "#192127",
          }}
        />
        <div className="">
          <button
            className="px-3 py-1 text-black-300 rounded-md cursor-pointer bg-gradient-to-t from-dark-green-400 to-dark-green-300 hover:opacity-80"
            onClick={handlePlus}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default RangeInput;
