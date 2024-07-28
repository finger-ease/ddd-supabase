import {
  httpErrors,
  RouterContext,
  Status,
} from "https://deno.land/x/oak/mod.ts";

import { PlayerCreateService } from "../../application/services/PlayerCreateService.ts";
import { CreatePlayerRequest } from "../requests/CreatePlayerRequest.ts";
import { HitPoint } from "../../domain/value-objects/HitPoint.ts";
import { AttackPoint } from "../../domain/value-objects/AttackPoint.ts";
import { DefensePoint } from "../../domain/value-objects/DefensePoint.ts";
import { PlayerFindService } from "../../application/services/PlayerFindService.ts";
import { UniqueIdentifier } from "../../domain/value-objects/UniqueIdentifier.ts";

export class PlayerController {
  constructor(
    private readonly _playerCreateService: PlayerCreateService,
    private readonly _playerFindService: PlayerFindService,
  ) {}

  public createPlayer = async (
    context: RouterContext<string>,
  ) => {
    const request = await context.request.body.json();
    const validated = CreatePlayerRequest.validate(request);
    const { hitPoint, attackPoint, defensePoint } = validated;
    const data = await this._playerCreateService.execute(
      new HitPoint(hitPoint),
      new AttackPoint(attackPoint),
      new DefensePoint(defensePoint),
    );

    context.response.status = Status.Created;
    context.response.body = data;
  };

  public findPlayer = async (
    context: RouterContext<string>,
  ) => {
    const { id } = context.params;

    if (!UniqueIdentifier.isValid(id)) {
      throw new httpErrors.BadRequest("Invalid id");
    }

    const data = await this._playerFindService.execute(
      new UniqueIdentifier(id),
    );

    context.response.status = Status.OK;
    context.response.body = data;
  };
}
