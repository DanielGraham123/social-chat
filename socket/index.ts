import { Server, Socket } from "socket.io";
import User from "./types.ts";
import { createServer } from "http";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

let activeUsers: User[] = [];

io.on("connection", (socket: Socket) => {
  // new user joins the chat socket
  socket.on("join", (user: User) => {
    if (!activeUsers.includes(user)) {
      activeUsers.push({ ...user, socketId: socket.id });
      console.log(`${user.name} joined the chat`);
    }

    // send active users to the frontend
    io.emit("activeUsers", activeUsers);
  });

  // disconnect socket
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.id !== socket.id);
    console.log(`${socket.id} disconnected`);
  });
});

httpServer.listen(3300, () => {
  console.log("Socket server is listening on port 3300");
});
