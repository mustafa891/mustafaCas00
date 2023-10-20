import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./LegacyOfDead.css";
const LegacyOfDead = () => {

    const { isAuthenticated, user } = useSelector((state) => state.users);
    const renderRef = useRef(false);
    useEffect(() => {

        if (renderRef.current) {
            return;
        }
        console.log("asdfasdf");
        renderRef.current = true;
        // Import the external JavaScript file
        const script = document.createElement('script');
        script.src = '/asset/Playngo/LegacyOfDead/playngoAsccw/Content/javascript/iframedviewbundle?v=dhjHFR72K9sXR41i-Mx-AfMLeA6jYRWh3hr4ZAh2ack1';
        script.async = true;
        document.body.appendChild(script);

        const script1 = document.createElement('script');
        script1.src = '/asset/main/js/jquery-3.6.0.min.js';
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = '/asset/Playngo/LegacyOfDead/Main/1.js';
        script2.async = true;
        document.body.appendChild(script2);

    }, []);
    setTimeout(() => {
        console.log(user)
        originalValue = changingValue = user.balance;
    }, 1000)
    return (
        <html>
            <head>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </head>
            <body >
                <div id="pngPreloaderWrapper" className="png-white-text">
                    <div id="pngPreloaderBG"></div>
                    <div id="pngLogoWrapper" className="pngLogoImg pngCenter"></div>
                    <div id="pngSpinTextWrapper">

                        <div className="pngSpinnerWrapperContainer">
                            <div id="pngSpinnerWrapper">
                                <span id="pngFirst" className="pngBall pngCenter"></span>
                                <span id="pngSecond" className="pngBall pngCenter"></span>
                                <span id="pngThird" className="pngBall pngCenter"></span>
                            </div>
                        </div>
                        <div className="pngTextWrapperContainer">
                            <div id="pngLoaderMessage" className="pngCenter pngRemove png-text-center"></div>
                        </div>
                    </div>
                    <div id="pngProgressContainer" className="pngCenter pngHide">
                        <div id="pngProgressBar" rawvalue="0" className="png-text-center png-white-text pngConnecting"></div>
                    </div>
                    <span id="pngReconnectText" className="pngCenter pngHide png-text-center"></span>
                </div>
                <script>
                </script>
                <div id="game-grid">
                    <div id="left-column" className="side-column"> </div>
                    <div id="game-column">
                        <div id="game-row-top"></div>
                        <div id="pngCasinoGame" className="game-wrapper"></div>
                        <div id="game-row-bottom"></div>
                    </div>
                    <div id="right-column" className="side-column" ></div>
                </div>
            </body>
        </html>
    );
}

export default LegacyOfDead;