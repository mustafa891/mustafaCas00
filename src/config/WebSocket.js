import React, { createContext } from "react";
import io from "socket.io-client";
//import { WS_BASE } from "./config";
import { useDispatch } from "react-redux";
import { addMessageChat } from "../store/chats/chatSlice";
import { setAddHistory } from "../store/bets/betSlice";
import { setAddHistory as setAddHistoryFaucet } from "../store/games/faucetSlice";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export const { BACKEND_URL } = window;

export default ({ children }) => {
  let socket;
  let ws;

  //const WS_BASE = process.env.REACT_APP_BACKEND_URL;
  const WS_BASE =
    process.env.REACT_APP_MODE === "development"
      ? process.env.REACT_APP_BACKEND_URL
      : BACKEND_URL;

  const dispatch = useDispatch();

  //Add in game Message to chat
  const sendInGameMessage = (payload) => {
    //Socket IO
    socket.emit("new-ingame-message-chat", payload);
    //End Socket IO
  };

  //Add Message to chat
  const sendMessage = (payload) => {
    //Socket IO
    socket.emit("new-message-chat", payload);
    //End Socket IO
  };

  //Add Bet history
  const addBetHistory = (payload) => {
    //Socket IO
    socket.emit("new-bet-history", payload);
    //End Socket IO
  };

  //Add Faucet claim history
  const addFaucetHistory = (payload) => {
    //Socket IO
    socket.emit("new-faucet-claim", payload);
    //End Socket IO
  };

  if (!socket) {
    socket = io.connect(WS_BASE);

    //Chat Messages
    socket.on("response-chat-messages", (data) => {
      dispatch(addMessageChat(data));
    });

    //Bet history
    socket.on("response-bet-history", (data) => {
      dispatch(setAddHistory(data));
    });

    //Faucet History
    socket.on("response-faucet-claim", (data) => {
      dispatch(setAddHistoryFaucet(data));
    });

    ws = {
      socket: socket,
      sendMessage,
      addBetHistory,
      addFaucetHistory,
      sendInGameMessage,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
