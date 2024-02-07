import { Email } from "../value-objects/email";
import { Location } from "./location";

export type DatabaseCustomer = {
  name: string;
  email: string;
  phone: string;
  location_x: number;
  location_y: number;
  search: string;
};

export type JSONSerializableCustomer = {
  name: string;
  email: string;
  phone: string;
  location: {
    x: number;
    y: number;
  };
};

export class Customer {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly location: Location
  ) {
    this.email = new Email(email).value;
  }

  static fromDatabase(customer: DatabaseCustomer): Customer {
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: new Location(customer.location_x, customer.location_y),
    };
  }

  static toJSONSerializable(customer: Customer): JSONSerializableCustomer {
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location.toJSONSerializable(),
    };
  }
}
