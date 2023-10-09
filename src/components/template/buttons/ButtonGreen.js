const ButtonGreen = ({
  type = "button",
  text = "Button",
  icon = "",
  isLoading = false,
  disabled = false,
  className = "template-bg-linear-green text-dark-green-200 px-8 py-4",
  onClick = () => {},
}) => {
  return (
    <>
      <button
        type={type}
        className={`${className} mt-4 w-full template-btn-green capitalize font-semibold text-sm rounded-md hover:opacity-80`}
        disabled={isLoading || disabled ? true : false}
        onClick={onClick}
      >
        {isLoading ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin ml-2"></i>
            <span className="opacity-0">.</span>
          </>
        ) : (
          icon !== "" && (
            <>
              <i className={`fa-solid ${icon} mr-1`}></i> <span>{text}</span>
            </>
          )
        )}
      </button>
    </>
  );
};

export default ButtonGreen;
