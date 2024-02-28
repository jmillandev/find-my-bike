export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: number,
  ) {
    super(message);
    this.code = code;
  }
}
