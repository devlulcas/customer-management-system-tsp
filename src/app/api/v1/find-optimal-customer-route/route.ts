import { Customer } from "@/modules/customer/entities/customer";
import { FindOptimizedCustomerRouteUseCaseFactory } from "@/modules/customer/use-cases/find-optimized-customer-route-use-case";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  const optimizedCustomerRoute =
    await FindOptimizedCustomerRouteUseCaseFactory.create().execute();

  return NextResponse.json({
    customers: optimizedCustomerRoute.route.map(Customer.toJSONSerializable),
    distance: optimizedCustomerRoute.totalDistance,
  });
};
