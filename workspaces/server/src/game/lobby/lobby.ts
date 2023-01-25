import { AuthenticatedSocket } from '@app/game/types';
import { Socket, Server } from 'socket.io';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';

export class Lobby {
  public readonly id: string = Math.random().toString(36).substring(2, 8);
  public readonly createdAt: Date = new Date();
  public readonly clients: Map<string, AuthenticatedSocket> = new Map<
    string,
    AuthenticatedSocket
  >();
  // public readonly instance: Instance = new Instance(this);

  constructor(private readonly server: Server) {}

  public addClient(client: AuthenticatedSocket): void {
    this.clients.set(client.handshake.auth.sessionId, client);
    client.join(this.id);
    client.data.lobby = this;
    client.data.name = 'Player' + Math.floor(Math.random() * 10).toString();
    // return all client name information to browsers
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
      names: Object.fromEntries(this.getClientNames()),
    };
    console.log(payload);
    this.dispatchToLobby(ServerEvents.LobbyState, payload);
  }

  // Refactor?
  public getClientNames(): Map<string, string> {
    const names = new Map<string, string>();
    this.clients.forEach((client) => {
      names.set(client.handshake.auth.sessionId, client.data.name);
    });
    return names;
  }

  public dispatchToLobby<T>(event: ServerEvents, payload: T): void {
    this.server.to(this.id).emit(event, payload);
  }
}
