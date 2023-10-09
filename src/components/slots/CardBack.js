import LogoImage from "../../assets/img/csgocrazy/logo.png";

const CardBack = () => {
  return (
    <div
      className={`border-8 border-gray-100 w-52 rounded-xl py-4 text-black bg-back-card`}
    >
      <p className="text-7xl font-semibold pl-5 opacity-0">?</p>
      <img
        src={LogoImage}
        className="w-32 mx-auto my-10 grayscale opacity-80"
        alt="Logo"
      />
      <p className="text-7xl pt-2 mt-0 inline-block pr-5 float-right opacity-0">
        ?
      </p>
    </div>
  );
};

export default CardBack;
