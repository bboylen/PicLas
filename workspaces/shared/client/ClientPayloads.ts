import { ClientEvents } from "./ClientEvents";

export type ClientPayloads = {
  [ClientEvents.LobbyJoin]: {
    lobbyId: string;
  };
  [ClientEvents.NameChange]: {
    name: string;
  };
};
