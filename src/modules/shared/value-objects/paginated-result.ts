import { Pagination } from "./pagination";

export type JSONSerializablePagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
};

export class PaginatedResult<T> {
  constructor(
    public readonly data: T[],
    private readonly paginationInput: Pagination,
    private readonly meta: {
      totalItems: number;
    }
  ) {}

  private get totalPages() {
    return Math.ceil(this.meta.totalItems / this.paginationInput.pageSize);
  }

  private get nextPage() {
    if (this.paginationInput.page >= this.totalPages) return null;
    return this.paginationInput.page + 1;
  }

  private get previousPage() {
    if (this.paginationInput.page <= 1) return null;
    return this.paginationInput.page - 1;
  }

  get pagination(): JSONSerializablePagination {
    return {
      page: this.paginationInput.page,
      pageSize: this.paginationInput.pageSize,
      totalItems: this.meta.totalItems,
      totalPages: this.totalPages,
      nextPage: this.nextPage,
      previousPage: this.previousPage,
    };
  }
}
