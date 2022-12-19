import { ServerEvents } from "./ServerEvents";

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string;
    names: string[];
  };

  [ServerEvents.GameMessage]: {
    message: string;
    color?: "green" | "red" | "blue" | "orange";
  };
};
