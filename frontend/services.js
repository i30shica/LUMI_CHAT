import { io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";

const socket = io(SERVER_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
});

export default socket;
