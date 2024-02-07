"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { JSONSerializableCustomer } from "../../entities/customer";

type VirtualizedCustomerListProps = {
  customers: JSONSerializableCustomer[];
};

export function VirtualizedCustomerList({
  customers,
}: VirtualizedCustomerListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: customers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div className="border rounded">
      <div ref={parentRef} className="overflow-auto h-[600px]">
        <ul
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          className="relative w-full divide-y"
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <li
              key={virtualItem.key}
              className="divide-x grid grid-cols-5 w-full h-full absolute top-0 left-0"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <p className="flex items-center p-1">
                {customers[virtualItem.index].name}
              </p>
              <p className="flex items-center p-1">
                {customers[virtualItem.index].email}
              </p>
              <p className="flex items-center p-1">
                {customers[virtualItem.index].phone}
              </p>
              <p className="flex items-center p-1">
                X = {customers[virtualItem.index].location.x}
              </p>
              <p className="flex items-center p-1">
                Y = {customers[virtualItem.index].location.y}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
