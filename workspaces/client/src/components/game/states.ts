import { atom } from "recoil";
import { ServerPayloads } from "@piclash/shared/server/ServerPayloads";
import { ServerEvents } from "@piclash/shared/server/ServerEvents";

export const CurrentLobbyState = atom<
  ServerPayloads[ServerEvents.LobbyState] | null
>({
  key: "CurrentLobbyState",
  default: null,
});
