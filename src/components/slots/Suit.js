const cache = {};

export default class Suit {
  constructor(name = Suit.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      import(`../../assets/img/aussie-slots/${name}.png`).then(img => {
        this.img.src = img.default;
        cache[name] = this.img;
      });
    }
  }

  static preload() {
    Suit.suits.forEach((suit) => new Suit(suit));
  }

  static get suits() {
    return [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ];
  }

  static random() {
    return this.suits[Math.floor(Math.random() * this.suits.length)];
  }
}