import { Player } from "../../../../domain/entities/Player.ts";

export interface IPlayerRepository {
  store(player: Player): Promise<void>;
}
