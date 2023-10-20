import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  getTokenApi,
  setTokenApi,
  removeTokenApi,
} from "../../utils/functions";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    errors: null,
    message: null,
    isLoading: true,
    loadingButton: false,
    isAuthenticated: false,
    user: null,
    showEmailVerification: false,
    twoFAData: null,
    twoFaEnabled: false,
    otpCode: null,
    bonusesUser: {},
    publicProfile: {},
  },
  reducers: {
    sendRequest: (state) => {
      state.loadingButton = true;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.loadingButton = false;
    },
    setError: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
      state.loadingButton = false;
    },
    hideAlerts: (state) => {
      state.errors = null;
      state.message = null;
    },
    setUserAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
      state.loadingButton = false;
    },
    authenticatedFail: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.loadingButton = false;
    },
    setEmailVerification: (state, action) => {
      state.showEmailVerification = action.payload;
    },
    set2FAData: (state, action) => {
      state.twoFAData = action.payload;
      state.loadingButton = false;
    },
    set2FaStatus: (state, action) => {
      state.twoFaEnabled = action.payload;
      state.twoFAData = null;
    },
    setOtpCode: (state, action) => {
      state.otpCode = action.payload;
      state.loadingButton = false;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setBalance: (state, action) => {
      state.user.balance = action.payload;
    },
    setPrivateProfile: (state, action) => {
      state.user.private_profile = action.payload;
    },
    setBonusesUser: (state, action) => {
      state.bonusesUser = action.payload;
      state.loadingButton = false;
    },
    setPublicProfile: (state, action) => {
      state.publicProfile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  sendRequest,
  setMessage,
  setError,
  hideAlerts,
  setUserAuthenticated,
  setEmailVerification,
  authenticatedFail,
  set2FAData,
  set2FaStatus,
  setOtpCode,
  setLogout,
  setBalance,
  setPrivateProfile,
  setBonusesUser,
  setPublicProfile,
} = userSlice.actions;

export default userSlice.reducer;

export const registerUser = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.post("/api/users/register", data);
      dispatch(setEmailVerification(true));
      dispatch(setMessage(response.data.message));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

export const loginUser = (data) => {
  console.log(data)
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.post("http://localhost:4000/api/users/login", data);
        console.log(response.data.data)
      // if (response.data.status === "success_otp") {
        // dispatch(setOtpCode(response.data.data));
      // } else {
        setTokenApi(response.data.data.user._id); // for test 
        dispatch(setUserAuthenticated(response.data.data.user));
        dispatch(setMessage(response.data.message));
        setTimeout(() => {
          dispatch(hideAlerts());
        }, 3000);
      // }
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

//Login user OTP
export const loginUserOTP = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    try {
      const response = await clientAxios.post("/api/users/login-otp", data);
      setTokenApi(response.data.data.token);
      dispatch(setUserAuthenticated(response.data.data.user));
      dispatch(setMessage(response.data.message));
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

export const profileUser = (data) => {
  return async (dispatch) => {
    //dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post("/api/users/profile", data);
        dispatch(setUserAuthenticated(response.data.data));
      }
    } catch (error) {
      dispatch(authenticatedFail());
      dispatch(setError(error.response));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

//Change password
export const changePassword = (data) => {
  return async (dispatch) => {
    const token = getTokenApi();
    dispatch(sendRequest());
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post(
          "/api/users/change-password",
          data
        );
        dispatch(setMessage(response.data.message));
        setTimeout(() => {
          dispatch(hideAlerts());
        }, 3000);
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

//Get OTP/2FA Status
export const getTwoFactorStatus = () => {
  return async (dispatch) => {
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.get("/api/users/otp-status");
        dispatch(set2FaStatus(response.data.data));
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

//Generate secret 2FA
export const generateSecretTwoFA = () => {
  return async (dispatch) => {
    const token = getTokenApi();
    dispatch(sendRequest());
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.get("/api/users/setup-otp");
        dispatch(set2FAData(response.data.data));
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

//Enable/Disable 2FA
export const enableTwoFA = (data) => {
  return async (dispatch) => {
    const token = getTokenApi();
    dispatch(sendRequest());
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post("/api/users/enable-otp", data);
        dispatch(set2FaStatus(response.data.data));
        dispatch(setMessage(response.data.message));
        //Hide alert after 3 seconds
        setTimeout(() => {
          dispatch(hideAlerts());
        }, 3000);
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

//Private profile status
export const updatePrivateProfile = () => {
  return async (dispatch) => {
    const token = getTokenApi();
    dispatch(sendRequest());
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.put("/api/users/private-profile");
        dispatch(setPrivateProfile(response.data.data));
        dispatch(setMessage(response.data.message));
        //Hide alert after 3 seconds
        setTimeout(() => {
          dispatch(hideAlerts());
        }, 3000);
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

//Get bonuses balances
export const getBonusesBalances = () => {
  return async (dispatch) => {
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.get("/api/users/bonuses");
        if (response && response.data) {
          //console.log(response.data.data);
          dispatch(setBonusesUser(response.data.data));
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

//Claim unlocked balance (bonus)
export const claimUnlockedBalance = () => {
  return async (dispatch) => {
    const token = getTokenApi();
    dispatch(sendRequest());
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        const response = await clientAxios.post(
          "/api/users/bonuses/claim-unlocked"
        );
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

export const logoutUser = () => {
  return (dispatch) => {
    try {
      removeTokenApi();
      dispatch(setLogout());
    } catch (error) {
      dispatch(setError(error));
    }
  };
};

export const getPublicProfile = (id) => {
  return async (dispatch) => {
    //dispatch(sendRequest());
    try {
      const response = await clientAxios.get("/api/users/public-profile/" + id);
      dispatch(setPublicProfile(response.data.data));
    } catch (error) {
      dispatch(setError(error.response));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};
