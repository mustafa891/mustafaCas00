import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  getClientSeed,
  getTokenApi,
  updateClientSeed,
} from "../../utils/functions";
import { setAddUserHistory, setPayloadSocket } from "../bets/betSlice";
import { authenticatedFail, setBalance } from "../users/userSlice";

export const hiloSlice = createSlice({
  name: "hilo",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    resultNumber: null,
    win: null,
    baseCard: null,
    isPlaying: false,
    bet_amount: null,
    final_profit: "0.0000",
    skips: null,
    historyCards: [],
    gameMessage: null,
    gameStatus: null,
  },
  reducers: {
    sendRequest: (state) => {
      state.isLoading = true;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    hideAlerts: (state) => {
      state.errors = null;
      state.message = null;
    },
    setResultNumber: (state, action) => {
      state.resultNumber = action.payload.result_number;
      state.win = action.payload.win;
    },
    setBaseCard: (state, action) => {
      state.baseCard = action.payload;
      state.isLoading = false;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBetAmount: (state, action) => {
      state.bet_amount = action.payload;
    },
    setFinalProfit: (state, action) => {
      state.final_profit = action.payload;
    },
    setSkips: (state, action) => {
      state.skips = action.payload;
    },
    setNewHistoryCard: (state, action) => {
      state.historyCards = [action.payload, ...state.historyCards];
    },
    resetHistoryCard: (state) => {
      state.historyCards = [];
      state.gameMessage = null;
      state.gameStatus = null;
    },
    setGameMessage: (state, action) => {
      state.gameMessage = action.payload.message;
      state.gameStatus = action.payload.status;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  sendRequest,
  setMessage,
  setError,
  hideAlerts,
  setResultNumber,
  setBaseCard,
  setIsPlaying,
  setIsLoading,
  setBetAmount,
  setFinalProfit,
  setSkips,
  setNewHistoryCard,
  resetHistoryCard,
  setGameMessage,
} = hiloSlice.actions;

export default hiloSlice.reducer;

//Get the base card
export const getBaseCard = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        let client_seed = getClientSeed();
        const response = await clientAxios.get(
          "/api/games/hilo/" + client_seed
        );

        dispatch(setBaseCard(response.data.data.result));
        dispatch(setIsPlaying(response.data.data.is_playing));

        //dispatch(setNewHistoryCard(response.data.data.result));

        if (response.data.data.bet_amount !== null) {
          dispatch(setBetAmount(response.data.data.bet_amount));
        }
        if (response.data.data.profit !== null) {
          dispatch(setFinalProfit(response.data.data.profit));
        }
        dispatch(setSkips(response.data.data.skips));
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

/**
 * Start a new hilo game request
 * @param {*} data
 * @returns dispatch
 */
export const startHiloGameRequest = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        data.client_seed = getClientSeed();
        const response = await clientAxios.post(
          "/api/games/hilo/startgame",
          data
        );

        dispatch(setBalance(response.data.data.balance));
        dispatch(setIsPlaying(true));
        dispatch(setIsLoading(false));
        dispatch(setNewHistoryCard(response.data.data.result));
        dispatch(
          setGameMessage({
            message: null,
            status: null,
          })
        );
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

/**
 * Cashout from actual game
 * @param {*} data
 * @returns dispatch
 */
export const cashoutHiloRequest = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        let client_seed = getClientSeed();
        const response = await clientAxios.post("/api/games/hilo/cashout", {
          client_seed,
        });

        dispatch(
          setGameMessage({
            message: "You Win",
            status: "win",
          })
        );

        dispatch(setBalance(response.data.data.balance));
        dispatch(setFinalProfit("0.0000"));
        dispatch(setIsPlaying(response.data.data.is_playing));
        dispatch(setIsLoading(false));

        if (response.data.data.history !== null) {
          //Socket IO
          dispatch(setPayloadSocket(response.data.data.history));
          //End Socket IO
          dispatch(setAddUserHistory(response.data.data.history));
        }

        //Update client seed
        updateClientSeed();
        //dispatch(getBaseCard());
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

//Skip card
export const skipCard = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        let client_seed = getClientSeed();
        let data = {
          client_seed,
        };
        const response = await clientAxios.post(
          "/api/games/hilo/skipcard",
          data
        );

        dispatch(setBaseCard(response.data.data.result));
        dispatch(setSkips(response.data.data.skips));
        dispatch(setNewHistoryCard(response.data.data.result));
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

export const sendRequestHilo = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        data.client_seed = getClientSeed();
        const response = await clientAxios.post("/api/games/hilo", data);

        if (response.data.status === "success") {
          /*dispatch(
            setResultNumber({
              result_number: parseFloat(response.data.data.result),
              win: true,
            })
          );*/
          dispatch(setBaseCard(response.data.data.result));
          dispatch(setFinalProfit(response.data.data.profit));
          dispatch(setIsLoading(false));
          dispatch(setNewHistoryCard(response.data.data.result));
          if (response.data.data.history !== null) {
            dispatch(setIsPlaying(false));
            //Socket IO
            dispatch(setPayloadSocket(response.data.data.history));
            //End Socket IO
            dispatch(setAddUserHistory(response.data.data.history));

            dispatch(setBaseCard(parseInt(response.data.data.result)));
            dispatch(setFinalProfit("0.0000"));
            dispatch(setNewHistoryCard(parseInt(response.data.data.result)));

            //TODO: SET MESSAGE
          }
        } else if (response.data.status === "loss") {
          dispatch(setIsPlaying(false));
          //Socket IO
          dispatch(setPayloadSocket(response.data.data.history));
          //End Socket IO
          dispatch(setAddUserHistory(response.data.data.history));
          //updateClientSeed();
          //dispatch(getBaseCard());

          dispatch(
            setGameMessage({
              message: "You Lose",
              status: "loss",
            })
          );

          dispatch(
            setBaseCard(parseInt(response.data.data.history.game_result.result))
          );
          dispatch(setFinalProfit("0.0000"));
          dispatch(setIsLoading(false));
          dispatch(
            setNewHistoryCard(
              parseInt(response.data.data.history.game_result.result)
            )
          );
        }

        //dispatch(setMessage(response.data.message));
        //Socket IO
        //dispatch(setPayloadSocket(response.data.data.history));
        //End Socket IO
        //dispatch(setAddUserHistory(response.data.data.history));
        //dispatch(setBalance(response.data.data.balance));
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};
