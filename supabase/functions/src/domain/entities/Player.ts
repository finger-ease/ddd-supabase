import { AttackPoint } from "../value-objects/AttackPoint.ts";
import { DefensePoint } from "../value-objects/DefensePoint.ts";
import { HitPoint } from "../value-objects/HitPoint.ts";
import { UniqueIdentifier } from "../value-objects/UniqueIdentifier.ts";

export class Player {
  constructor(
    public readonly id: UniqueIdentifier,
    public readonly hitPoint: HitPoint,
    public readonly attackPoint: AttackPoint,
    public readonly defensePoint: DefensePoint,
  ) {
  }

  public static create = (
    hitPoint: HitPoint,
    attackPoint: AttackPoint,
    defensePoint: DefensePoint,
  ): Player => {
    return new Player(
      UniqueIdentifier.generate(),
      hitPoint,
      attackPoint,
      defensePoint,
    );
  };
}
