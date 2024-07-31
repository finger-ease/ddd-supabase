import { httpErrors } from "@oak/oak";

export class PostPlayerRequest {
  constructor(
    public readonly hitPoint: number,
    public readonly attackPoint: number,
    public readonly defensePoint: number,
  ) {}

  public static validate(request: any): PostPlayerRequest {
    const { hitPoint, attackPoint, defensePoint } = request;

    if (hitPoint == null || attackPoint == null || defensePoint == null) {
      throw new httpErrors.BadRequest("Missing required parameters");
    }

    if (
      typeof hitPoint !== "number" ||
      typeof attackPoint !== "number" ||
      typeof defensePoint !== "number"
    ) {
      throw new httpErrors.BadRequest("Invalid parameters");
    }

    return new PostPlayerRequest(hitPoint, attackPoint, defensePoint);
  }
}
