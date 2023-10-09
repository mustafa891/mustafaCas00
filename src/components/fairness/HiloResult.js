import React from "react";
import Card from "../hilo/Card";

const HiloResult = ({ allCards }) => {
  return (
    <>
      <div className="grid">
        <div className="wrap-card-small">
          <div className="wrap-card-small-2">
            <div className="card-scroll-small">
              <div className="card-slide-down">
                {allCards.map((item, key) => (
                  <Card
                    key={key}
                    position={key}
                    cardNumber={parseInt(item)}
                    isSmall={true}
                    isFairness={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HiloResult;
