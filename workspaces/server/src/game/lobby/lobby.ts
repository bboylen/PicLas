import { v4 } from 'uuid';
import { AuthenticatedSocket } from '@app/game/types';
import { Socket, Server } from 'socket.io';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';

export class Lobby {
  public readonly id: string = v4();
  public readonly createdAt: Date = new Date();
  public readonly clients: Map<Socket['id'], AuthenticatedSocket> = new Map<
    Socket['id'],
    AuthenticatedSocket
  >();
  // public readonly instance: Instance = new Instance(this);

  constructor(private readonly server: Server) {}

  public addClient(client: AuthenticatedSocket): void {
    this.clients.set(client.id, client);
    client.join(this.id);
    client.data.lobby = this;

    // if (this.clients.size >= this.maxClients) {
    //   this.instance.triggerStart();
    // }

    this.dispatchLobbyState();
  }

  public removeClient(client: AuthenticatedSocket): void {
    this.clients.delete(client.id);
    client.leave(this.id);
    client.data.lobby = null;

    // this.instance.triggerFinish();

    this.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(
      ServerEvents.GameMessage,
      {
        color: 'blue',
        message: 'Opponent left lobby',
      },
    );
  }

  public dispatchLobbyState(): void {
    const payload: ServerPayloads[ServerEvents.LobbyState] = {
      lobbyId: this.id,
    };

    this.dispatchToLobby(ServerEvents.LobbyState, payload);
  }

  public dispatchToLobby<T>(event: ServerEvents, payload: T): void {
    this.server.to(this.id).emit(event, payload);
  }
}
