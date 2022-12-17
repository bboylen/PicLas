import useSocketManager from "@hooks/useSocketManager";
import { ClientEvents } from "@piclash/shared/client/ClientEvents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { emitEvent } from "@utils/analytics";
import { Divider, Select } from "@mantine/core";

export default function Introduction() {
  const router = useRouter();
  const { sm } = useSocketManager();

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

  return (
    <div className="mt-4">
      <h2 className="text-2xl">Hello ! 👋</h2>

      <p className="mt-3 text-lg">
        Welcome to a simple game to generate funny lil pics
      </p>

      <div className="mt-5 text-center flex justify-between">
        <button className="btn" onClick={() => onCreateLobby()}>
          Create lobby
        </button>
      </div>
    </div>
  );
}
