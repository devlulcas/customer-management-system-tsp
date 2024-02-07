import { Customer } from "@/modules/customer/entities/customer";
import { Location } from "@/modules/customer/entities/location";

export const COMPANY_LOCATION = {
  x: 0,
  y: 0,
};

export const COMPANY_EMAIL = "COMPANY@MAIL.COM";

export const COMPANY_PHONE = "11999999999";

export const COMPANY_NAME = "COMPANY";

export const COMPANY_AS_CUSTOMER = new Customer(
  COMPANY_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  new Location(COMPANY_LOCATION.x, COMPANY_LOCATION.y)
);
