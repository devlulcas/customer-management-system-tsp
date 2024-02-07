export class CustomerAlreadyExistsException extends Error {
  constructor() {
    super('Usuário já cadastrado com este e-mail');
  }
}
