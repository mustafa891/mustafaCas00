import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  getClientSeed,
  getTokenApi,
  updateClientSeed,
} from "../../utils/functions";
import { authenticatedFail, profileUser } from "../users/userSlice";

export const faucetSlice = createSlice({
  name: "faucet",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    isLoadingData: false,
    rollNumber: null,
    allHistory: [],
    userHistory: [],
    payloadSocket: null,
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
    setRollNumber: (state, action) => {
      state.rollNumber = action.payload;
    },
    setAllHistory: (state, action) => {
      state.allHistory = [...action.payload];
      state.isLoadingData = false;
    },
    setAddHistory: (state, action) => {
      state.allHistory = [
        action.payload,
        ...state.allHistory.slice(0, state.allHistory.length - 1),
      ];
    },
    setUserHistory: (state, action) => {
      state.userHistory = [...action.payload];
      state.isLoadingData = false;
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
  },
});

// Action creators are generated for each case reducer function
export const {
  sendRequest,
  sendRequestData,
  setMessage,
  setError,
  hideAlerts,
  setRollNumber,
  setAllHistory,
  setAddHistory,
  setUserHistory,
  setAddUserHistory,
  setPayloadSocket,
} = faucetSlice.actions;

export default faucetSlice.reducer;

export const sendRequestFaucet = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        let client_seed = getClientSeed();
        const response = await clientAxios.post("/api/games/faucet", {
          client_seed,
        });
        //dispatch(addMessageChat(response.data.data));

        dispatch(setMessage(response.data.message));
        dispatch(setRollNumber(response.data.data.roll_number));
        //Socket IO
        dispatch(setPayloadSocket(response.data.data.history));
        //End Socket IO
        dispatch(setAddUserHistory(response.data.data.history));
        dispatch(profileUser());
        setTimeout(() => {
          dispatch(hideAlerts());
        }, 30000);
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

//Get all faucet history
export const getAllHistory = () => {
  return async (dispatch) => {
    dispatch(sendRequestData());
    try {
      const response = await clientAxios.get("/api/games/faucet/all");
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
    dispatch(sendRequestData());
    try {
      const response = await clientAxios.get("/api/games/faucet");
      dispatch(setUserHistory(response.data.data));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};
