import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { getTokenApi } from "../../utils/functions";
import { authenticatedFail } from "../users/userSlice";

export const fairnessSlice = createSlice({
  name: "fairness",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    isLoadingData: false,
    seedsData: {
      server_seed: "",
      nonce: "",
    },
    calculateResult: {},
    serverSeedRevealed: "",
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
    setSeedsData: (state, action) => {
      state.seedsData = action.payload;
    },
    setCalculateResult: (state, action) => {
      state.calculateResult = action.payload;
      state.isLoading = false;
    },
    setServerSeedRevealed: (state, action) => {
      state.serverSeedRevealed = action.payload;
      state.isLoading = false;
    },
    reset: (state) => {
      state.seedsData.server_seed = "";
      state.seedsData.nonce = "";
      state.calculateResult = {};
      state.serverSeedRevealed = "";
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  sendRequest,
  sendRequestData,
  setMessage,
  setError,
  hideAlerts,
  setSeedsData,
  setCalculateResult,
  setServerSeedRevealed,
  reset,
} = fairnessSlice.actions;

export default fairnessSlice.reducer;

//Get user fairness seeds
export const getFairnessSeeds = (game) => {
  return async (dispatch) => {
    dispatch(sendRequestData());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.get("/api/fairness/" + game);
        dispatch(setSeedsData(response.data.data));
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

//Update fairness server seeds
export const updateServerSeed = (data) => {
  return async (dispatch) => {
    dispatch(sendRequestData());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.put(
          "/api/fairness/seeds/server",
          data
        );
        dispatch(setSeedsData(response.data.data));
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

//Update fairness client seeds
/*
export const updateClientSeed = () => {
  return async (dispatch) => {
    dispatch(sendRequestData());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.put("/api/fairness/seeds/client");
        dispatch(setClientSeed(response.data.data.client_seed));
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
*/

//Calculate games Results
export const calculateGameResult = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.post("/api/fairness/calculate", data);
      dispatch(setCalculateResult(response.data.data));
    } catch (error) {
      //dispatch(authenticatedFail());
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

/**
 * Reveal server seed
 */
export const revealServerSeed = (bet_id) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.post("/api/fairness/reveal", {
        bet_id,
      });
      dispatch(setServerSeedRevealed(response.data.data));
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
 * Reset Store
 */
export const resetState = () => {
  return async (dispatch) => {
    dispatch(reset());
  }
}
