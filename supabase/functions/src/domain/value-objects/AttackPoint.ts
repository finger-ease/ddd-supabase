export class AttackPoint {
  public readonly value: number;
  private readonly _min = 1;
  private readonly _max = 999;

  constructor(value: number) {
    this.value = Math.min(Math.max(value, this._min), this._max);
  }
}
