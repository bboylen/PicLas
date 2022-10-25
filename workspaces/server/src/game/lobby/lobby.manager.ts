import { Cron } from '@nestjs/schedule';
export class LobbyManager {
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<
    Lobby['id'],
    Lobby
  >();

  public initializeSocket(client: AuthenticatedSocket): void {
    client.data.lobby = null;
  }

  public terminateSocket(client: AuthenticatedSocket): void {
    client.data.lobby?.removeClient(client);
  }

  public createLobby(mode: LobbyMode, delayBetweenRounds: number): Lobby {}

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void {}

  // Periodically clean up lobbies
  @Cron('* * * /1 * *')
  private lobbiesCleaner(): void {}
}
