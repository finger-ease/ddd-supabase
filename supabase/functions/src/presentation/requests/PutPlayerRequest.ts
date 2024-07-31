import { httpErrors } from "@oak/oak";

export class PutPlayerRequest {
  constructor(
    public readonly hitPoint: number | null,
    public readonly attackPoint: number | null,
    public readonly defensePoint: number | null,
  ) {}

  public static validate(request: any): PutPlayerRequest {
    const { hitPoint, attackPoint, defensePoint } = request;

    if (
      (typeof hitPoint !== "number" &&
        hitPoint !== null) ||
      (typeof attackPoint !== "number" &&
        attackPoint !== null) ||
      (typeof defensePoint !== "number" &&
        defensePoint !== null)
    ) {
      throw new httpErrors.BadRequest("Invalid parameters");
    }

    return new PutPlayerRequest(hitPoint, attackPoint, defensePoint);
  }
}
