export class HitPoint {
  public readonly value: number;
  private readonly _min = 0;
  private readonly _max = 999;

  constructor(value: number) {
    this.value = Math.min(Math.max(value, this._min), this._max);
  }

  public reduce = (damage: number): HitPoint => {
    return new HitPoint(this.value - damage);
  };
}
