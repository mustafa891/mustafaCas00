import Reel from "./Reel.js";
import Suit from "./Suit.js";

export default class Slot {
  constructor(domElement, config = {}) {
    Suit.preload();

    this.currentSuits = [
      ["4", "4", "4"],
      ["4", "4", "4"],
      ["4", "4", "4"],
      ["4", "4", "4"],
      ["4", "4", "4"],
    ];

    this.nextSuits = [
      ["4", "4", "4"],
      ["4", "4", "4"],
      ["4", "4", "4"],
      ["4", "4", "4"],
      ["4", "4", "4"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSuits[idx])
    );

    // this.spinButton = document.getElementById("spin");
    // this.spinButton.addEventListener("click", () => this.spin());

    // this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin() {
    this.spinNext([
      //Will determine displayed results
      [Suit.random(), Suit.random(), Suit.random()],
      [Suit.random(), Suit.random(), Suit.random()],
      [Suit.random(), Suit.random(), Suit.random()],
      [Suit.random(), Suit.random(), Suit.random()],
      ["10", "10", "10"],
    ]);
  }

  spinNext(next) {
    this.currentSuits = this.nextSuits;
    this.nextSuits = next;
    this.onSpinStart(this.nextSuits);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSuits(this.nextSuits[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(this.nextSuits));
  }

  onSpinStart(suits) {
    // this.spinButton.disabled = true;

    this.config.onSpinStart?.(suits);
  }

  onSpinEnd(suits) {
    // this.spinButton.disabled = false;

    this.config.onSpinEnd?.(suits);
    this.reels[4].suitContainer.childNodes.forEach((c) => {
      c.classList.add("spin", "imgShake");
    });

    // if (this.autoPlayCheckbox.checked) {
    //   return window.setTimeout(() => this.spin(), 200);
    // }
  }
}
