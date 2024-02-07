import { describe, test } from 'vitest';
import { InvalidInputException } from '../../shared/exceptions/invalid-input';
import { Email } from './email';

describe('email value object', () => {
  const invalidEmails = [
    {
      email: 'a',
      errorMessage: 'E-mail muito curto',
    },
    {
      email: 'aaa',
      errorMessage: 'E-mail sem @',
    },
    {
      email: '@a.a',
      errorMessage: 'E-mail não pode começar com @',
    },
    {
      email: '.a@a',
      errorMessage: 'E-mail não pode começar com .',
    },
    {
      email: 'a.@a',
      errorMessage: 'E-mail não pode ter . antes de @',
    },
    {
      email: 'a.a@',
      errorMessage: 'E-mail sem domínio',
    },
    {
      email: 'x x@x',
      errorMessage: 'E-mail não pode ter espaço',
    },
    {
      email: 'x..x@x',
      errorMessage: 'E-mail não pode ter ..',
    },
  ];

  invalidEmails.forEach(({ email, errorMessage }) => {
    test(
      'should throw an invalid input exception given an invalid email ' + email,
      ({ expect }) => {
        expect(() => new Email(email)).toThrow(
          new InvalidInputException(errorMessage, 'email')
        );
      }
    );
  });
});
