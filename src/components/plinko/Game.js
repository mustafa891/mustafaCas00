import React, { useState, useRef } from "react";

const Chip = ({ boardId, speed }) => {
  const boardRef = useRef(null);
  const [location, setLocation] = useState({ x: 0, y: 0 });
  const [lastStep, setLastStep] = useState(0);

  const animateTo = (offset) => {
    const step = {
      x: boardRef.current.offsetHeight / 11,
      y: boardRef.current.offsetWidth / 17,
    };
    const newLocation = {
      x: location.x + step.x * offset.x,
      y: location.y + step.y * offset.y,
    };
    setLocation(newLocation);
    setLastStep(lastStep + 1);
    if (lastStep < 4) {
      const newOffset = path[lastStep] < 0 ? -2 : 2;
      animateTo({ x: newOffset, y: 2 });
    } else {
      getBucket();
    }
  };

  const start = () => {
    const path = [];
    for (let i = 0; i < 4; i++) {
      path.push(getRandom());
    }
    printPath(path);
    animateTo({ x: 0, y: 0 });
  };

  const getBucket = () => {
    // TODO: Implement getBucket function
  };

  const getRandom = () => {
    // TODO: Implement getRandom function
  };

  const printPath = (path) => {
    // TODO: Implement printPath function
  };

  return (
    <div
      className="chip"
      style={{ left: location.x, top: location.y }}
      ref={boardRef}
    ></div>
  );
};

const Game = () => {
  const [faucet, setFaucet] = useState("off");
  const [intervalId, setIntervalId] = useState(null);

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.keyCode === 32) {
      const chip = new Chip("plinko-board", 500);
      chip.start();
    } else if (e.keyCode === 79) {
      // toggle faucet
      if (faucet === "on") {
        setFaucet("off");
        setIntervalId(
          window.setInterval(() => {
            const chip = new Chip("plinko-board", 500);
            chip.start();
          }, 30)
        );
      } else {
        setFaucet("on");
        window.clearInterval(intervalId);
      }
    }
  };

  return <div onKeyDown={handleKeyDown}></div>;
};

export default Game;
