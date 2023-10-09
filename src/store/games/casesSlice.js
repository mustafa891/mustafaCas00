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

export const casesSlice = createSlice({
  name: "cases",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    isLoadingData: false,
    rolledCases: [],
    casesContent: [],
    amountProfit: 0,
    amountLoss: 0,
    allHistory: [],
  },
  reducers: {
    sendRequest: (state) => {
      state.isLoading = true;
    },
    sendRequestData: (state) => {
      state.isLoadingData = true;
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
    setRolledCases: (state, action) => {
      let rolledCases = action.payload.rolledCases;
      if (rolledCases === null) rolledCases = [];
      state.rolledCases = [...rolledCases];
      state.isLoadingData = false;
    },
    setCasesContent: (state, action) => {
      let casesContent = action.payload.casesContent;
      if (casesContent === null) casesContent = [];
      state.casesContent = [...casesContent];
      state.isLoadingData = false;
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
  sendRequestData,
  setMessage,
  setError,
  hideAlerts,
  setRolledCases,
  setCasesContent,
  setProfit,
  setLoss,
  resetProfitLoss,
} = casesSlice.actions;

export default casesSlice.reducer;

export const sendRequestCaseContents = () => {
  return async (dispatch) => {
    dispatch(sendRequestData());
    const response = await clientAxios.get("api/games/cases/content");
    dispatch(
      setCasesContent({
        casesContent: response.data.data,
      })
    );
  };
};

export const simpleSendRequestCases = async (data) => {
  const token = getTokenApi();
  if (!token) return -1;
  tokenAuth(token);
  data.client_seed = getClientSeed();
  const response = await clientAxios.post("/api/games/cases", data);
  return response.data.data.history.game_result.cases;
}

export const sendRequestCases = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        data.client_seed = getClientSeed();
        const response = await clientAxios.post("/api/games/cases", data);

        dispatch(
          setRolledCases({
            rolledCases: response.data.data.history.game_result.cases,
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
    updateClientSeed();
  };
};
