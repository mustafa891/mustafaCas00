import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { getTokenApi } from "../../utils/functions";
import { authenticatedFail } from "../users/userSlice";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    coins: [],
    depositAddress: null,
    prices: {},
    transactions: [],
    pageCount: 0,
    totalItems: 0,
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
    setCoins: (state, action) => {
      state.coins = action.payload;
      state.isLoading = false;
    },
    setDepositAddress: (state, action) => {
      state.depositAddress = action.payload;
      state.isLoading = false;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
      state.isLoading = false;
    },
    setTransactions: (state, action) => {
      state.transactions = [...action.payload.transactions];
      state.pageCount = action.payload.pageCount;
      state.totalItems = action.payload.totalItems;
      state.isLoading = false;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  sendRequest,
  setMessage,
  setError,
  hideAlerts,
  setCoins,
  setDepositAddress,
  setPrices,
  setTransactions,
  setLoadingFalse,
} = walletSlice.actions;

export default walletSlice.reducer;

//Get coins
export const getCoins = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.get("/api/coins/");
      dispatch(setCoins(response.data.data));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

//Generate deposit address
export const generateDepositAddress = (coin) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post(
          "/api/users/deposit/generate-address",
          {
            coin,
          }
        );
        dispatch(setDepositAddress(response.data.data));
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

//Get deposit address
export const getDepositAddress = (coin) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.get(
          "/api/users/deposit/get-address/" + coin
        );
        dispatch(setDepositAddress(response.data.data));
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

//Withdraw request
export const withdrawRequest = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post(
          "/api/transactions/withdraw",
          data
        );
        dispatch(setMessage(response.data.message));
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

//Get transactions
export const getTransactions = (page) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const itemsPerPage = 5;
        const response = await clientAxios.get(
          "/api/transactions?page=" + page + "&limit=" + itemsPerPage
        );
        if (response && response.data.status !== "error") {
          dispatch(
            setTransactions({
              transactions: response.data.data.transactions,
              pageCount: Math.ceil(
                response.data.data.totalItems / itemsPerPage
              ),
              totalItems: response.data.data.totalItems,
            })
          );
        } else {
          dispatch(setLoadingFalse());
        }
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

//Get crypto prices
export const getCryptoPrices = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.get("/api/transactions/prices");
      dispatch(setPrices(response.data.data));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};
