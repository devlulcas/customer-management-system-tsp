import { InvalidInputException } from '../../shared/exceptions/invalid-input';

export class Email {
  constructor(public readonly value: string) {
    this.validate(value);
  }

  private validate(email: string): boolean {
    if (email.length < 3) {
      throw new InvalidInputException('E-mail muito curto', 'email');
    }

    if (!email.includes('@')) {
      throw new InvalidInputException('E-mail sem @', 'email');
    }

    if (email.startsWith('@')) {
      throw new InvalidInputException('E-mail não pode começar com @', 'email');
    }

    if (email.startsWith('.')) {
      throw new InvalidInputException('E-mail não pode começar com .', 'email');
    }

    if (email.endsWith('.')) {
      throw new InvalidInputException(
        'E-mail não pode terminar com .',
        'email'
      );
    }

    if (email.includes('..')) {
      throw new InvalidInputException('E-mail não pode ter ..', 'email');
    }

    const [local, domain] = email.split('@');

    if (local.includes(' ')) {
      throw new InvalidInputException('E-mail não pode ter espaço', 'email');
    }

    if (local.endsWith('.')) {
      throw new InvalidInputException(
        'E-mail não pode ter . antes de @',
        'email'
      );
    }

    if (!domain) {
      throw new InvalidInputException('E-mail sem domínio', 'email');
    }

    return true;
  }
}
