import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsePipes } from '@nestjs/common';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ClientEvents } from '@shared/client/ClientEvents';
import { WsValidationPipe } from '@app/websocket/ws.validation-pipe';

@UsePipes(new WsValidationPipe())
@WebSocketGateway()
export class GameGateway implements OnGatewayConnection {
  @SubscribeMessage(ClientEvents.LobbyCreate)
  onLobbyCreate(
    client: AuthenticatedSocket,
    data: LobbyCreateDto,
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    const lobby = this.lobbyManager.createLobby(
      data.mode,
      data.delayBetweenRounds,
    );
    lobby.addClient(client);

    return {
      event: ServerEvents.GameMessage,
      data: {
        color: 'green',
        message: 'Lobby created',
      },
    };
  }
}
