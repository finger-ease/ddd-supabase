import {
  httpErrors,
  RouterContext,
  Status,
} from "https://deno.land/x/oak/mod.ts";

import { PlayerCreateService } from "../../application/services/PlayerCreateService.ts";
import { PostPlayerRequest } from "../requests/PostPlayerRequest.ts";
import { HitPoint } from "../../domain/value-objects/HitPoint.ts";
import { AttackPoint } from "../../domain/value-objects/AttackPoint.ts";
import { DefensePoint } from "../../domain/value-objects/DefensePoint.ts";
import { PlayerFindService } from "../../application/services/PlayerFindService.ts";
import { UniqueIdentifier } from "../../domain/value-objects/UniqueIdentifier.ts";
import { PlayerUpdateService } from "../../application/services/PlayerUpdateService.ts";
import { PutPlayerRequest } from "../requests/PutPlayerRequest.ts";
import { PlayerDeleteService } from "../../application/services/PlayerDeleteService.ts";

export class PlayerController {
  constructor(
    private readonly _playerCreateService: PlayerCreateService,
    private readonly _playerFindService: PlayerFindService,
    private readonly _playerUpdateService: PlayerUpdateService,
    private readonly _playerDeleteService: PlayerDeleteService,
  ) {}

  public postPlayer = async (
    context: RouterContext<string>,
  ) => {
    const request = await context.request.body.json();
    const validated = PostPlayerRequest.validate(request);
    const { hitPoint, attackPoint, defensePoint } = validated;
    const data = await this._playerCreateService.execute(
      new HitPoint(hitPoint),
      new AttackPoint(attackPoint),
      new DefensePoint(defensePoint),
    );

    context.response.status = Status.Created;
    context.response.body = data;
  };

  public getPlayer = async (
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

  public putPlayer = async (
    context: RouterContext<string>,
  ) => {
    const { id } = context.params;

    if (!UniqueIdentifier.isValid(id)) {
      throw new httpErrors.BadRequest("Invalid id");
    }

    const request = await context.request.body.json();
    const validated = PutPlayerRequest.validate(request);
    const { hitPoint, attackPoint, defensePoint } = validated;
    const data = await this._playerUpdateService.execute(
      new UniqueIdentifier(id),
      hitPoint === null ? null : new HitPoint(hitPoint),
      attackPoint === null ? null : new AttackPoint(attackPoint),
      defensePoint === null ? null : new DefensePoint(defensePoint),
    );

    context.response.status = Status.OK;
    context.response.body = data;
  };

  public deletePlayer = async (
    context: RouterContext<string>,
  ) => {
    const { id } = context.params;

    if (!UniqueIdentifier.isValid(id)) {
      throw new httpErrors.BadRequest("Invalid id");
    }

    await this._playerDeleteService.execute(new UniqueIdentifier(id));

    context.response.status = Status.NoContent;
  };
}
