declare module "@tanstack/react-table" {
  export type RowData = Record<string, any> | any[];
  export type ColumnFiltersState = Array<{ id: string; value: any }>;
  export type SortingState = Array<{ id: string; desc: boolean }>;
  export type StockFeatures = any;
  export type ColumnDef<TData = any, TValue = any> = any;

  export function tableFeatures(...args: any[]): any;
  export const rowSortingFeature: any;
  export const columnFilteringFeature: any;
  export const rowPaginationFeature: any;
  export function createFilteredRowModel(): any;
  export function createPaginatedRowModel(): any;
  export function createSortedRowModel(): any;
  export const filterFns: any;
  export const sortFns: any;
  export function flexRender(...args: any[]): any;
  export function useTable(...args: any[]): any;
}
