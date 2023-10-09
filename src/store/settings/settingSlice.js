import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { getTokenApi } from "../../utils/functions";
import { authenticatedFail } from "../users/userSlice";

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    generalSettings: {},
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
    setGeneralSettings: (state, action) => {
      state.generalSettings = action.payload;
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
  setGeneralSettings,
} = settingSlice.actions;

export default settingSlice.reducer;

//Get settings
export const getGeneralSettings = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.get("/api/settings/general_settings");
      dispatch(setGeneralSettings(response.data.data));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};
