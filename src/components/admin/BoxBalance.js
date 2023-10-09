import ChipImage from "../../assets/img/coin.png";

const BoxBalance = ({ value, title, withChip = true }) => {
  return (
    <div className="text-center w-full md:w-1/2 border border-rose-300 py-2 rounded">
      <p className="text-black-400 text-sm">{title}</p>
      {withChip && (
        <img className="w-5 inline mr-2" src={ChipImage} alt="chips" />
      )}
      <p className="text-black-300 text-base mt-1 inline">{value}</p>
    </div>
  );
};

export default BoxBalance;
