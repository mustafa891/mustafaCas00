import { useEffect, useRef, useState, useContext } from "react";
import { WebSocketContext } from "../config/WebSocket";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatOpen,
  setUserId,
  setUserOpen,
} from "../store/modals/modalSlice";
import {
  getChats,
  addChat,
  hideAlerts,
  blockUser,
} from "../store/chats/chatSlice";

import RexImage from "../assets/img/rex-head.png";
import ChatImage from "../assets/img/chat.png";
import GlobeImage from "../assets/img/worldwide.png";
import Badge from "./Badge";
import { toast } from "react-hot-toast";
import PerfectScrollbar from "perfect-scrollbar";

const Chat = () => {
  const bottomRef = useRef(null);
  const { messages, message, alert, errors } = useSelector(
    (state) => state.chats
  );
  const { chatOpen } = useSelector((state) => state.modals);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const ws = useContext(WebSocketContext);

  const [scrollbar, setScrollbar] = useState(null);
  useEffect(() => {
    if (scrollbar) {
      console.log("Shikai");
      return;
    }

    const ps = new PerfectScrollbar("#chatmessages");
    setScrollbar(ps);
    console.log("bankai");
  }, [setScrollbar]);

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      const element = bottomRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (message !== null) {
      let payload = message;
      setInput("");
      setShowEmojis(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      ws.sendMessage(payload);
      dispatch(hideAlerts());
    }

    /*if (errors !== null) {
      toast.error(errors, {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
    }*/

    //console.log(alert);
    if (alert !== null) {
      toast.success(alert, {
        position: "top-right",
        style: {
          background: "#2f4553",
          color: "#fff",
          padding: "14px",
          borderRadius: "3px",
        },
      });
    }

    // eslint-disable-next-line
  }, [message, dispatch, errors, alert]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      //console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();

        // 👇️ call submit function here
        handleSubmitKey();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [input]);

  const handleSubmitKey = () => {
    try {
      dispatch(
        addChat({
          message: input,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        addChat({
          message: input,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const clickedMsg = () => {
    setShowEmojis(false);
  };

  const handleCloseChat = () => {
    //document.body.classList.remove("template-modal-open");
    dispatch(setChatOpen(false));
  };

  const mouseEnter = () => {
    //document.body.classList.add("template-modal-open");
  };

  const mouseLeave = () => {
    //document.body.classList.remove("template-modal-open");
  };

  const handleOpenUser = (userid) => {
    dispatch(setUserId(userid));
    dispatch(setUserOpen(true));
  };

  const handleBlockUser = (id) => {
    dispatch(
      blockUser({
        user_id: id,
      })
    );
    //dispatch(getChats());
  };

  return (
    <div
      className={`${
        chatOpen ? "translate-x-0" : "md:translate-x-[400px] translate-x-full"
      } bg-theme border-l-2 border-rose-300 fixed block md:w-[400px] w-full transition-all ease-in-out duration-300 lg:h-screen lg:min-h-screen template-min-heigth px-2 py-3 z-20 right-0 top-0`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="w-full">
        <div className="text-black-100 text-md ml-2 leading-none flex items-center">
          <span
            className="px-3 py-2 bg-theme rounded-md cursor-pointer hover:opacity-80"
            onClick={() => handleCloseChat()}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
          <img className="w-5 h-5 ml-4" src={ChatImage} alt="Chat" />
          <span className="ml-3 font-medium">CHAT</span>
        </div>
        <div className="border-b border-rose-300 mt-3"></div>
        <p className="text-black-300 text-sm mt-3 rounded-md cursor-pointer font-medium border border-green-light-200 inline-block px-3 py-1">
          <img
            src={GlobeImage}
            className="w-4 inline mr-1.5 pb-[2px]"
            alt="general"
          />
          Global
        </p>
        <div className="flex-col">
          <div
            id="chatmessages"
            className="mt-3 shadow-inner chat-box bottom-16 md:bottom-[70px] w-full left-0"
            ref={bottomRef}
          >
            {messages.map((item, index) => (
              <div
                key={index}
                className="bg-theme border-t border-rose-300 py-3 px-3 text-black-200 text-sm"
                onClick={() => clickedMsg()}
              >
                <div className="flex">
                  <div>
                    <img
                      className="w-10 h-10 mr-2 border border-rose-300 p-1 rounded-full"
                      src={`https://www.gravatar.com/avatar/${item?.user?._id}?d=retro&f=y`}
                      alt="user"
                    />
                  </div>
                  <div>
                    <p onClick={() => handleOpenUser(item?.user?._id)}>
                      <Badge level={item?.user?.level} size="w-5" />
                      <span className="font-medium cursor-pointer">
                        {item?.user.username}
                      </span>
                      <span className="bg-yellow-400 text-dark-green-200 px-2 ml-1.5 rounded text-sm py-[0.8px]">
                        LVL {item?.user?.level}
                      </span>
                      {item?.user?.role === "admin" && (
                        <span className="ml-2 text-green-light-200 text-xs font-bold">
                          ADMIN
                        </span>
                      )}
                      {item?.user?.is_cashier && (
                        <span className="ml-2 text-green-400 text-xs font-bold">
                          CASHIER
                        </span>
                      )}
                      {item?.user?.chat_info?.isMod && (
                        <span className="ml-2 text-blue-400 text-xs font-bold">
                          MOD
                        </span>
                      )}
                      {(user?.chat?.isMod || user?.role === "admin") && (
                        <span className="text-center ml-5">
                          <i
                            className={`${
                              item?.user?.chat_info?.isBlocked
                                ? "text-blue-500"
                                : "text-red-500"
                            } fa-solid fa-ban cursor-pointer hover:opacity-50`}
                            onClick={() => handleBlockUser(item?.user?._id)}
                          ></i>
                        </span>
                      )}
                    </p>
                    <p className="mt-1">
                      <span className="text-black-300">{item.message}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 w-full pr-5">
        <div className="relative">
          <div className="absolute bottom-14 right-16 z-10">
            {showEmojis && (
              <div>
                <Picker
                  data={data}
                  onEmojiSelect={addEmoji}
                  perLine={7}
                  maxFrequentRows={3}
                  previewPosition="none"
                  navPosition="bottom"
                  theme="dark"
                />
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              name="message"
              id="message"
              autoComplete="off"
              className={`bg-theme w-full text-black-300 rounded-md pl-4 pr-12 text-sm py-2 placeholder:text-black-400 h-12 focus:outline-none focus:bg-theme`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your message..."
            />
            <button
              type="button"
              className="absolute top-2.5 right-20 text-black-300 text-xl"
              onClick={() => setShowEmojis(!showEmojis)}
            >
              <i className="fa-regular fa-face-smile"></i>
            </button>
            {user?.chat?.isBlocked ? (
              <button
                type="button"
                className="ml-2 px-5 py-2 bg-roulette-red-300 template-btn-green hover:opacity-80 text-dark-green-500 font-semibold text-md rounded-md"
              >
                <i className="fa-solid fa-ban"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="ml-2 px-5 py-2 template-bg-linear-green template-btn-green hover:opacity-80 text-dark-green-500 font-semibold text-md rounded-md"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
