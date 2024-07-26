import { Player } from "../../domain/entities/Player.ts";

export class PlayerData {
  public readonly id: string;
  public readonly hitPoint: number;
  public readonly attackPoint: number;
  public readonly defensePoint: number;

  constructor(player: Player) {
    this.id = player.id.value;
    this.hitPoint = player.hitPoint.value;
    this.attackPoint = player.attackPoint.value;
    this.defensePoint = player.defensePoint.value;
  }
}
