import React, { useState } from "react";

const initialBuckets = {
  drops: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

const Game = () => {
  const [buckets, setBuckets] = useState(initialBuckets);

  function updateStat(selector, count, percent) {
    const element = document.querySelector(selector);
    element.textContent = count;
    const percentElement = document.querySelector(selector + "_percent");
    percentElement.textContent = percent;
  }

  function updateBuckets() {
    const selectors = ["#one", "#two", "#three", "#four", "#five"];
    selectors.forEach((selector, i) => {
      const count = buckets[i + 1];
      const percent = ((buckets[i + 1] / buckets.drops) * 100).toFixed(2) + "%";
      updateStat(selector, count, percent);
    });
  }

  function getRandom() {
    const random = Math.floor(Math.random() * 2);
    return random === 0 ? -1 : 1;
  }

  function getBucket(chip) {
    let total = 0;
    chip.path.forEach((value) => {
      total += value;
    });
    switch (total) {
      case -4:
        buckets[1]++;
        break;
      case -2:
        buckets[2]++;
        break;
      case 0:
        buckets[3]++;
        break;
      case 2:
        buckets[4]++;
        break;
      case 4:
        buckets[5]++;
        break;
      default:
        break;
    }
    buckets.drops++;
    updateBuckets();
    chip.el.remove();
  }

  function printPath(path) {
    const directions = path.map((e) => (e < 0 ? "left" : "right"));
    console.table(directions);
    return directions;
  }

  return <div>Game</div>;
};

export default Game;
