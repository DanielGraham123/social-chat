import { Server, Socket } from "socket.io";
import User from "./types.ts";
import { createServer } from "http";
import dotenv from "dotenv";

const httpServer = createServer();
const hostname = "0.0.0.0";
const port = 3300;

dotenv.config();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
  allowRequest: (req, callback) => {
    const noOrigin = req.headers.origin === undefined;
    callback(null, noOrigin);
  },
  // transports: ["websocket", "polling"],
});

let activeUsers: User[] = [];

io.on("connection", (socket: Socket) => {
  let currentSocketId = socket.id;

  // new user joins the chat socket
  socket.on("join", (user: User) => {
    if (!activeUsers.includes(user)) {
      console.log(`${user.username} joining`);
      activeUsers.push({ ...user, socketId: currentSocketId });
      console.log(`${user.username} joined the chat`);
    }

    console.log("activeUsers: ", activeUsers);
    // send active users to the frontend
    io.emit("activeUsers", activeUsers);
  });

  // disconnect socket
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter(
      (user) => user.socketId !== currentSocketId
    );
    // console.log("activeUsers: ", activeUsers);
    console.log(`${currentSocketId} disconnected`);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    console.log("activeUsers send: ", activeUsers);
    const user = activeUsers.find((user) => user.id === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data, user);
    if (user) {
      console.log("Sending message to: ", user.username);
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

httpServer.listen(port, hostname, () => {
  console.log("node_env: ", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    console.log(`Socket server running at http://${hostname}:${port}/`);
  } else {
    console.log(`Socket server running at http://${hostname}/`);
  }
});
