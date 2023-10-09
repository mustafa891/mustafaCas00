const GamePage = (props) => {
  const { children } = props;
  return (
    <div className="dbg-wrap">
      <div className="dbg-content flex justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
};

export default GamePage;
