import { httpErrors } from "@oak/oak";

import { IPlayerRepository } from "../../infrastructure/persistence/repositories/playerRepository/IPlayerRepository.ts";
import { PlayerData } from "../dto/PlayerData.ts";
import { UniqueIdentifier } from "../../domain/value-objects/UniqueIdentifier.ts";

export class PlayerFindService {
  constructor(private readonly _playerRepository: IPlayerRepository) {
  }

  public execute = async (id: UniqueIdentifier): Promise<PlayerData> => {
    const player = await this._playerRepository.find(id);

    if (!player) {
      throw new httpErrors.NotFound("Player not found");
    }

    return new PlayerData(player);
  };
}
