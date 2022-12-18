import useSocketManager from "@hooks/useSocketManager";
import { ClientEvents } from "@piclash/shared/client/ClientEvents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { emitEvent } from "@utils/analytics";
import { Divider, Select } from "@mantine/core";

export default function Introduction() {
  const router = useRouter();
  const { sm } = useSocketManager();
  const [lobbyId, setLobbyId] = useState("");

  type InputEvent = React.ChangeEvent<HTMLInputElement>;

  useEffect(() => {
    if (router.query.lobby) {
      sm.emit({
        event: ClientEvents.LobbyJoin,
        data: {
          lobbyId: router.query.lobby,
        },
      });
    }
  }, [router]);

  const onCreateLobby = () => {
    sm.emit({
      event: ClientEvents.LobbyCreate,
    });
  };

  const onJoinLobby = () => {
    sm.emit({
      event: ClientEvents.LobbyJoin,
      data: {
        lobbyId: lobbyId,
      },
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-3xl text-center">Hello ! 👋</h2>

      <p className="mt-3 text-lg text-center">
        Welcome to a simple game to generate funny lil pics
      </p>

      <div className="mt-10 text-center flex flex-col gap-y-8 items-center">
        <button
          className="btn w-36 text-center"
          onClick={() => onCreateLobby()}
        >
          Create lobby
        </button>
        <h2 className="font-bold text-lg">--- OR ---</h2>
        <div className="flex gap-x-4">
          <input
            className="w-32 text-black text-lg font-semibold"
            type="text"
            maxLength={6}
            onChange={(event: InputEvent) => setLobbyId(event.target.value)}
          ></input>
          <button className="btn" onClick={() => onJoinLobby()}>
            Join lobby
          </button>
        </div>
      </div>
    </div>
  );
}
