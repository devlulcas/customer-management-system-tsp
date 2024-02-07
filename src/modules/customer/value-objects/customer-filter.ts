import { InvalidInputException } from "../../shared/exceptions/invalid-input";

export class CustomerFilter {
  public readonly type: "name" | "email" | "phone" | "all" = "all";

  constructor(queryType: string, public readonly query: string) {
    if (!this.isValidType(queryType)) {
      throw new InvalidInputException("Tipo de filtro inválido", "type");
    }

    this.type = queryType;
  }

  private isValidType(
    type: string
  ): type is "name" | "email" | "phone" | "all" {
    return ["name", "email", "phone", "all"].includes(type);
  }
}
