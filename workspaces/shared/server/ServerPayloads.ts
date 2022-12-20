import { ServerEvents } from "./ServerEvents";
import { Socket } from "socket.io";

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string;
    names: { [k: string]: string };
  };

  [ServerEvents.GameMessage]: {
    message: string;
    color?: "green" | "red" | "blue" | "orange";
  };
};
