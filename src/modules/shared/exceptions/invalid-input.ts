export class InvalidInputException extends Error {
  constructor(message: string, public input: string) {
    super(message);
    this.name = 'InvalidInputException';
  }
}
