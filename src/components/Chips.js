import ChipImage from "../assets/img/coin.png";

const Chips = ({ className }) => {
  return <img src={ChipImage} className={`${className}`} alt="Chips" />;
};

export default Chips;
