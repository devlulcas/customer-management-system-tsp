import { InvalidInputException } from "../exceptions/invalid-input";

export class Pagination {
  constructor(public readonly page: number, public readonly pageSize: number) {
    if (page < 1) {
      throw new InvalidInputException(
        "A página deve ser maior que zero",
        "pagination.page"
      );
    }

    if (pageSize < 1) {
      throw new InvalidInputException(
        "O tamanho da página deve ser maior que zero",
        "pagination.pageSize"
      );
    }
  }

  get offset() {
    return (this.page - 1) * this.pageSize;
  }
}
