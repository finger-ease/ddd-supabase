import { Player } from "../../domain/entities/Player.ts";
import { AttackPoint } from "../../domain/value-objects/AttackPoint.ts";
import { DefensePoint } from "../../domain/value-objects/DefensePoint.ts";
import { HitPoint } from "../../domain/value-objects/HitPoint.ts";
import { IPlayerRepository } from "../../infrastructure/persistence/repositories/playerRepository/IPlayerRepository.ts";
import { PlayerData } from "../dto/PlayerData.ts";

export class PlayerCreateService {
  constructor(private readonly _playerRepository: IPlayerRepository) {
  }

  public execute = async (
    hitPoint: HitPoint,
    attackPoint: AttackPoint,
    defensePoint: DefensePoint,
  ): Promise<PlayerData> => {
    const player = Player.create(
      hitPoint,
      attackPoint,
      defensePoint,
    );
    await this._playerRepository.store(player);

    return new PlayerData(player);
  };
}
