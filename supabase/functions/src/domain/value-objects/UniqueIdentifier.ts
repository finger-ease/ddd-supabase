export class UniqueIdentifier {
  constructor(public readonly value: string) {
    if (!UniqueIdentifier.isValid(value)) {
      throw new Error("Invalid UniqueIdentifier");
    }
  }

  public static generate = (): UniqueIdentifier => {
    return new UniqueIdentifier(crypto.randomUUID());
  };

  public static isValid = (value: string): boolean => {
    const uuidRegex: RegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  };
}
