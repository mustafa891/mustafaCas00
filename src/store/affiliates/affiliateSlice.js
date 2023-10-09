import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { getTokenApi } from "../../utils/functions";
import { authenticatedFail, setBonusesUser } from "../users/userSlice";

export const affiliateSlice = createSlice({
  name: "affiliates",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    affiliates: [],
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
    setAffiliates: (state, action) => {
      state.affiliates = [...action.payload.affiliates];
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
  setAffiliates,
  setLoadingFalse,
} = affiliateSlice.actions;

export default affiliateSlice.reducer;

export const getAffiliates = (page) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const itemsPerPage = 2;
        const response = await clientAxios.get(
          "/api/affiliates?page=" + page + "&limit=" + itemsPerPage
        );
        if (response && response.data.status !== "error") {
          dispatch(
            setAffiliates({
              affiliates: response.data.data.affiliates,
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

//Claim affiliates rewards (bonus)
export const claimAffiliatesRewards = () => {
  return async (dispatch) => {
    const token = getTokenApi();
    dispatch(sendRequest());
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post("/api/affiliates/claim");
        dispatch(setBonusesUser(response.data.data));
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
