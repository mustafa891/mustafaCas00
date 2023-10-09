import LogoImage from "../../assets/img/csgocrazy/logo.png";

const CardSmall = () => {
  return (
    <div className="border border-gray-300 w-32 rounded-xl py-4 text-roulette-red-300 bg-gray-100">
      <p className="text-4xl font-semibold pl-5">K</p>
      <img
        src={LogoImage}
        className="w-20 mx-auto my-5 grayscale opacity-20"
        alt="Logo"
      />
      <p className="text-4xl pt-2 mt-0 inline-block pr-5 float-right">
        &#9830;
      </p>
    </div>
  );
};

export default CardSmall;
