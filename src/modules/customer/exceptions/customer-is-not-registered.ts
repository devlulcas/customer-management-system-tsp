export class CustomerIsNotRegisteredException extends Error {
  constructor(userEmail: string) {
    super('Usuário não cadastrado com o e-mail ' + userEmail);
  }
}
