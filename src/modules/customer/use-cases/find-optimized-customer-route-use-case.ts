import { COMPANY_AS_CUSTOMER } from "@/modules/company/constants/location";
import { Customer } from "../entities/customer";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerRepositoryPg } from "../repositories/customer-repository-pg";

type OptimizedCustomerRoute = { route: Customer[]; totalDistance: number };

export class FindOptimizedCustomerRouteUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<OptimizedCustomerRoute> {
    const customers = await this.customerRepository.findAll();

    if (customers.length === 0) {
      return {
        route: [COMPANY_AS_CUSTOMER, COMPANY_AS_CUSTOMER],
        totalDistance: 0,
      };
    }

    customers.unshift(COMPANY_AS_CUSTOMER); // Adiciona a empresa como primeiro cliente a ser visitado

    return this.nearestNeighborTSP(customers);
  }

  /**
   * Implementa o algoritmo do vizinho mais próximo para resolver o problema do caixeiro viajante (TSP)
   * @param customers A lista de clientes a serem visitados em ordem
   * @returns Um objeto contendo a rota otimizada e a distância total percorrida
   */
  private nearestNeighborTSP(customers: Customer[]): OptimizedCustomerRoute {
    const n = customers.length;
    let totalDistance = 0;
    const route: Customer[] = new Array(n + 1); // A rota é circular, então o último ponto é o mesmo que o primeiro, por isso n + 1
    const visited: Boolean[] = new Array(n).fill(false); // Obs: Talvez seja melhor usar uma máscara de bits para otimizar a memória

    let currentCustomer = customers[0]; // Na primeira iteração, o "cliente" na verdade é a empresa
    route[0] = currentCustomer;
    visited[0] = true;

    for (let i = 1; i < n; i++) {
      let minDistance = Number.MAX_VALUE;
      let nearestCustomerIndex = -1;

      for (let j = 0; j < n; j++) {
        if (!visited[j]) {
          const distance = currentCustomer.location.distanceTo(
            customers[j].location
          );

          if (distance < minDistance) {
            minDistance = distance;
            nearestCustomerIndex = j;
          }
        }
      }

      visited[nearestCustomerIndex] = true;
      currentCustomer = customers[nearestCustomerIndex];
      route[i] = currentCustomer;

      totalDistance += minDistance;
    }

    // Finaliza o ciclo voltando para o ponto inicial (empresa)
    totalDistance += route[n - 1].location.distanceTo(route[0].location);
    route[n] = route[0];

    return { route, totalDistance };
  }
}

export class FindOptimizedCustomerRouteUseCaseFactory {
  static create() {
    return new FindOptimizedCustomerRouteUseCase(new CustomerRepositoryPg());
  }
}
