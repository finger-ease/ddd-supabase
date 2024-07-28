import { Player } from "../../../../domain/entities/Player.ts";
import { UniqueIdentifier } from "../../../../domain/value-objects/UniqueIdentifier.ts";

export interface IPlayerRepository {
  find(id: UniqueIdentifier): Promise<Player | null>;
  store(player: Player): Promise<void>;
}
