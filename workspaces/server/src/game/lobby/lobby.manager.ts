export class LobbyManager {
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<
    Lobby['id'],
    Lobby
  >();

  public initializeSocket(client: AuthenticatedSocket): void {}

  public terminateSocket(client: AuthenticatedSocket): void {}

  public createLobby(mode: LobbyMode, delayBetweenRounds: number): Lobby {}

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void {}

  // Periodically clean up lobbies
  @Cron('*/5 * * * *')
  private lobbiesCleaner(): void {}
}
