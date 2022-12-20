import useSocketManager from "@hooks/useSocketManager";
import { ClientEvents } from "@piclash/shared/client/ClientEvents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { lobbyState } from "./types";

export default function Lobby(props: lobbyState) {
  const { lobbyState } = props;

  const { sm } = useSocketManager();
  const [lobbyId, setLobbyId] = useState("");

  const names = Array(Object.values(lobbyState.names));

  const router = useRouter();

  useEffect(() => {
    setLobbyId(router.query.lobby as string);
  }, [router.query.lobby]);

  return (
    <div>
      <h1>Lobby</h1>
      <h2>Players:</h2>
      <ul>
        {names.map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
    </div>
  );
}
