import { vi } from "vitest";
import { CustomerRepository } from "./customer-repository";

export const customerRepositoryMock: CustomerRepository = {
  findByEmail: vi.fn(),
  save: vi.fn(),
  findAll: vi.fn(),
  findMany: vi.fn(),
  update: vi.fn(),
};
