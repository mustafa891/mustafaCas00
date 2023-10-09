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

export const limboSlice = createSlice({
  name: "limbo",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    resultNumber: null,
    win: null,
    amountProfit: 0,
    amountLoss: 0,
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
    setProfit: (state, action) => {
      state.amountProfit = state.amountProfit + action.payload;
    },
    setLoss: (state, action) => {
      state.amountLoss = state.amountLoss + action.payload;
    },
    resetProfitLoss: (state) => {
      state.amountLoss = 0;
      state.amountProfit = 0;
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
  setProfit,
  setLoss,
  resetProfitLoss,
} = limboSlice.actions;

export default limboSlice.reducer;

export const sendRequestLimbo = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        data.client_seed = getClientSeed();
        const response = await clientAxios.post("/api/games/limbo", data);

        //Update client seed
        //updateClientSeed();

        dispatch(
          setResultNumber({
            result_number: parseFloat(
              response.data.data.history.game_result.result
            ),
            win: response.data.data.history.win,
          })
        );
        dispatch(setMessage(response.data.message));
        //Socket IO
        dispatch(setPayloadSocket(response.data.data.history));
        //End Socket IO
        dispatch(setAddUserHistory(response.data.data.history));
        dispatch(setBalance(response.data.data.balance));

        if (parseFloat(response.data.data.history.profit) > 0) {
          dispatch(setProfit(Math.abs(response.data.data.history.profit)));
        } else {
          dispatch(setLoss(Math.abs(response.data.data.history.profit)));
        }
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
    //Update client seed
    updateClientSeed();
  };
};
