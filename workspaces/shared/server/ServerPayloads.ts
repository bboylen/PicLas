import { ServerEvents } from "./ServerEvents";

export type ServerPayloads = {
  [ServerEvents.GameMessage]: {
    message: string;
    color?: "green" | "red" | "blue" | "orange";
  };
};
