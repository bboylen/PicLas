import { IsInt, IsString, Max, Min } from 'class-validator';

// export class LobbyCreateDto {
//   @IsString()
//   mode: 'solo' | 'duo';

//   @IsInt()
//   @Min(1)
//   @Max(5)
//   delayBetweenRounds: number;
// }

export class LobbyJoinDto {
  @IsString()
  lobbyId: string;
}
