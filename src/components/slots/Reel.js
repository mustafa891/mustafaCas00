import Suit from "./Suit.js";

export default class Reel {
  constructor(reelContainer, idx, initialSuits) {
    this.reelContainer = reelContainer;
    this.idx = idx;

    this.suitContainer = document.createElement("div");
    this.suitContainer.classList.add("suits");
    this.reelContainer.appendChild(this.suitContainer);

    this.animation = this.suitContainer.animate(
      [
        { transform: "none", filter: "blur(0)" },
        { filter: "blur(2px)", offset: 0.5 },
        {
          transform: `translateY(-${
            ((Math.floor(this.factor) * 10) /
              (3 + Math.floor(this.factor) * 10)) *
            100
          }%)`,
          filter: "blur(0)",
        },
      ],
      {
        duration: this.factor * 1000,
        easing: "ease-in-out",
      }
    );
    this.animation.cancel();

    initialSuits.forEach((suit) =>
      this.suitContainer.appendChild(new Suit(suit).img)
    );
  }

  get factor() {
    return 1 + Math.pow(this.idx / 2, 2);
  }

  renderSuits(nextSuits) {
    const fragment = document.createDocumentFragment();

    for (let i = 3; i < 3 + Math.floor(this.factor) * 10; i++) {
      const suit = new Suit(
        i >= 10 * Math.floor(this.factor) - 2
          ? nextSuits[i - Math.floor(this.factor) * 10]
          : undefined
      );
      fragment.appendChild(suit.img);
    }

    this.suitContainer.appendChild(fragment);
  }

  spin() {
    const animationPromise = new Promise(
      (resolve) => (this.animation.onfinish = resolve)
    );
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, this.factor * 1000)
    );

    this.animation.play();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.animation.playState !== "finished") this.animation.finish();

      const max = this.suitContainer.children.length - 3;

      for (let i = 0; i < max; i++) {
        this.suitContainer.firstChild.remove();
      }
    });
  }
}