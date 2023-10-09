import CoinImage from "../../../assets/img/coin.png";

const Input = ({
  type,
  name,
  icon = "",
  placeholder,
  value,
  onChange = () => {},
  onBlur = () => {},
  readOnly,
  isLoading = false,
  isAutoOn = false,
  className = "w-full",
  iconPosition = "start",
  defaultValue = null,
  inputClass = "bg-theme text-sm font-medium w-full py-3 rounded-md text-black-200 focus:outline-none focus:bg-theme placeholder:text-black-400",
}) => {
  let iconImg = "";
  switch (icon) {
    case "coins":
      iconImg = <img src={CoinImage} className="w-5" alt="Icon" />;
      break;
    case "percentage":
      iconImg = "%";
      break;
    case "multiplier":
      iconImg = "X";
      break;
    case "usd":
      iconImg = "$";
      break;
    case "qr":
      iconImg = <i className="fa-solid fa-qrcode"></i>;
      break;

    default:
      break;
  }

  let RenderInput = "";
  if (defaultValue !== null) {
    RenderInput = (
      <div className={`relative w-full`}>
        <div className="absolute inset-y-0 left-4 flex items-center text-xl text-black-300">
          {iconImg}
        </div>
        <input
          type={type}
          name={name}
          className={`${inputClass} pl-11 pr-4`}
          value={defaultValue}
          readOnly={true}
          autoComplete="off"
        />
      </div>
    );
  } else {
    if (iconPosition === "start") {
      RenderInput = (
        <div className={`relative ${className}`}>
          <div className="absolute inset-y-0 left-4 flex items-center text-xl text-black-300">
            {iconImg}
          </div>
          <input
            type={type}
            name={name}
            id={name}
            className={`${inputClass} pl-11 pr-4`}
            placeholder={placeholder}
            value={value}
            step="0.1"
            onChange={onChange}
            onBlur={onBlur}
            disabled={isLoading || isAutoOn ? true : false}
            readOnly={readOnly}
            autoComplete="off"
          />
        </div>
      );
    } else if (iconPosition === "none") {
      RenderInput = (
        <div className={`relative ${className}`}>
          <input
            type={type}
            name={name}
            id={name}
            className={`${inputClass} px-4`}
            placeholder={placeholder}
            value={value}
            step="0.1"
            onChange={onChange}
            onBlur={onBlur}
            disabled={isLoading || isAutoOn ? true : false}
            readOnly={readOnly}
            autoComplete="off"
          />
        </div>
      );
    } else if (iconPosition === "end") {
      RenderInput = (
        <div className={`relative ${className}`}>
          <input
            type={type}
            name={name}
            id={name}
            className={`${inputClass} pr-7 pl-4`}
            placeholder={placeholder}
            value={value}
            step="0.1"
            onChange={onChange}
            onBlur={onBlur}
            disabled={isLoading || isAutoOn ? true : false}
            readOnly={readOnly}
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-3 flex items-center text-xl text-black-300">
            {iconImg}
          </div>
        </div>
      );
    }
  }

  return <>{RenderInput}</>;
};

export default Input;
