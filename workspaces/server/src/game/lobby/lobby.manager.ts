import { Lobby } from '@app/game/lobby/lobby';
import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket } from '@app/game/types';
import { ServerException } from '@app/game/server.exception';
import { SocketExceptions } from '@shared/server/SocketExceptions';
import { LOBBY_MAX_PLAYERS } from '@app/game/constants';

export class LobbyManager
{
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<Lobby['id'], Lobby>();

  public initializeSocket(client: Socket): void
  {
    (client as AuthenticatedSocket).data.lobby = null;
  }

  public terminateSocket(client: AuthenticatedSocket): void
  {
    if (client.data.lobby) {
      client.data.lobby.removeClient(client);
    }
  }

  public createLobby(): Lobby
  {
    const lobby = new Lobby(this.server);

    this.lobbies.set(lobby.id, lobby);

    return lobby;
  }

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void
  {
    const lobby = this.lobbies.get(lobbyId);

    if (!lobby) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby not found');
    }

    if (lobby.players.size >= LOBBY_MAX_PLAYERS) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby already full');
    }

    lobby.addClient(client);
  }
}