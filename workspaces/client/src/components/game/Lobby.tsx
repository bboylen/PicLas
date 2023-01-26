import useSocketManager from "@hooks/useSocketManager";
import { ClientEvents } from "@piclash/shared/client/ClientEvents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { lobbyState } from "./types";

export default function Lobby(props: lobbyState) {
  const { lobbyState } = props;

  const { sm } = useSocketManager();
  const [lobbyId, setLobbyId] = useState("");
  const sessionId = sessionStorage.getItem("sessionId");

  const names = Object.entries(lobbyState.names);

  const router = useRouter();

  useEffect(() => {
    setLobbyId(router.query.lobby as string);
  }, [router.query.lobby]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    sm.emit({
      event: ClientEvents.NameChange,
      data: { name: event.target.value },
    });
  };

  // Add ready up feature

  return (
    <div>
      <h1>Lobby</h1>
      <h2>Players:</h2>
      <ul className="mt-4 flex flex-col gap-y-4">
        {names.map(([nameSessionId, name]) => {
          if (sessionId === nameSessionId) {
            return (
              <input
                key={nameSessionId}
                className="w-64 text-black font-semibold py-1 px-2"
                type="text"
                value={name}
                onChange={handleChange}
                maxLength={25}
                minLength={1}
              />
            );
          }
          return <li key={nameSessionId}>{name}</li>;
        })}
      </ul>
    </div>
  );
}
