import useSocketManager from "@hooks/useSocketManager";
import { ClientEvents } from "@piclash/shared/client/ClientEvents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { lobbyState } from "./types";

export default function Lobby(props: lobbyState) {
  const { lobbyState } = props;

  const { sm } = useSocketManager();
  const [lobbyId, setLobbyId] = useState("");

  return <div>hi</div>;
}
