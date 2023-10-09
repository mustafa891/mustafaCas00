import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { getTokenApi } from "../../utils/functions";
import { authenticatedFail } from "../users/userSlice";

export const chatSlice = createSlice({
  name: "chats",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    messages: [],
    alert: null,
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
    setMessagesChat: (state, action) => {
      state.messages = [...action.payload];
    },
    addMessageChat: (state, action) => {
      state.messages = [...state.messages.slice(-49), action.payload];
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
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
  setMessagesChat,
  addMessageChat,
  setAlert,
} = chatSlice.actions;

export default chatSlice.reducer;

export const addChat = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post("/api/chats/send", data);
        //dispatch(addMessageChat(response.data.data));

        dispatch(setMessage(response.data.data));
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

export const getChats = () => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.get("/api/chats");
      dispatch(setMessagesChat(response.data.data));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

export const blockUser = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post("/api/chats/block-user", data);

        dispatch(setAlert(response.data.message));
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
