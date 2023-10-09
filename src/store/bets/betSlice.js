import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { getTokenApi } from "../../utils/functions";
import { authenticatedFail } from "../users/userSlice";

export const betSlice = createSlice({
  name: "bet",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    allHistory: [],
    userHistory: [],
    payloadSocket: null,
    betDetails: {},
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
    setAllHistory: (state, action) => {
      state.allHistory = [...action.payload];
      state.isLoading = false;
    },
    setAddHistory: (state, action) => {
      state.allHistory = [
        action.payload,
        ...state.allHistory.slice(0, state.allHistory.length - 1),
      ];
    },
    setUserHistory: (state, action) => {
      state.userHistory = [...action.payload];
      state.isLoading = false;
    },
    setAddUserHistory: (state, action) => {
      state.userHistory = [
        action.payload,
        ...state.userHistory.slice(0, state.userHistory.length - 1),
      ];
    },
    setPayloadSocket: (state, action) => {
      state.payloadSocket = action.payload;
    },
    setBetDetails: (state, action) => {
      state.betDetails = action.payload;
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
  setAllHistory,
  setAddHistory,
  setUserHistory,
  setAddUserHistory,
  setPayloadSocket,
  setBetDetails,
} = betSlice.actions;

export default betSlice.reducer;

//Get all faucet history
export const getAllHistory = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.get("/api/bets/all");
      dispatch(setAllHistory(response.data.data));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

//Get user faucet history
export const getUserHistory = () => {
  return async (dispatch) => {
    const token = getTokenApi();
    dispatch(sendRequest());
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.get("/api/bets");
        dispatch(setUserHistory(response.data.data));
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

//Get bet by id
export const getBetById = (id) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.get("/api/bets/bet/" + id);
      dispatch(setBetDetails(response.data.data));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};
