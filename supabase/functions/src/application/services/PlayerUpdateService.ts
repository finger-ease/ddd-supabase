import { httpErrors } from "https://deno.land/x/oak/mod.ts";

import { IPlayerRepository } from "../../infrastructure/persistence/repositories/playerRepository/IPlayerRepository.ts";
import { PlayerData } from "../dto/PlayerData.ts";
import { UniqueIdentifier } from "../../domain/value-objects/UniqueIdentifier.ts";
import { HitPoint } from "../../domain/value-objects/HitPoint.ts";
import { AttackPoint } from "../../domain/value-objects/AttackPoint.ts";
import { DefensePoint } from "../../domain/value-objects/DefensePoint.ts";

export class PlayerUpdateService {
  constructor(private readonly _playerRepository: IPlayerRepository) {
  }

  public execute = async (
    id: UniqueIdentifier,
    hitPoint: HitPoint | null,
    attackPoint: AttackPoint | null,
    defensePoint: DefensePoint | null,
  ): Promise<PlayerData> => {
    const player = await this._playerRepository.find(id);

    if (!player) {
      throw new httpErrors.NotFound("Player not found");
    }

    const updatedPlayer = player.update(hitPoint, attackPoint, defensePoint);
    await this._playerRepository.store(updatedPlayer);

    return new PlayerData(updatedPlayer);
  };
}
