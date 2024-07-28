import { httpErrors } from "https://deno.land/x/oak/mod.ts";

import { IPlayerRepository } from "../../infrastructure/persistence/repositories/playerRepository/IPlayerRepository.ts";
import { UniqueIdentifier } from "../../domain/value-objects/UniqueIdentifier.ts";

export class PlayerDeleteService {
  constructor(private readonly _playerRepository: IPlayerRepository) {
  }

  public execute = async (
    id: UniqueIdentifier,
  ) => {
    const player = await this._playerRepository.find(id);

    if (!player) {
      throw new httpErrors.NotFound("Player not found");
    }

    await this._playerRepository.delete(id);
  };
}
