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

export class PlayerController {
  constructor(
    private readonly _playerCreateService: PlayerCreateService,
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
}
