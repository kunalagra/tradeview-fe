"use client";

import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	tableFeatures,
	rowSortingFeature,
	columnFilteringFeature,
	rowPaginationFeature,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFns,
	sortFns,
	flexRender,
	useTable,
} from "@tanstack/react-table";
import * as React from "react";

type DataTableColumnDef<TData, TValue> = any;
type ColumnFiltersState = Array<{ id: string; value: unknown }>;
type SortingState = Array<{ id: string; desc: boolean }>;

const features = tableFeatures({
	columnFilteringFeature,
	rowSortingFeature,
	rowPaginationFeature,
	filteredRowModel: createFilteredRowModel(),
	sortedRowModel: createSortedRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	filterFns,
	sortFns,
});

interface DataTableProps<TData, TValue> {
	columns: DataTableColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	const table = useTable({
		features,
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter holdings..."
					value={
						(table.getColumn("tradingsymbol")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("tradingsymbol")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
					{table.getHeaderGroups().map((headerGroup: any) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header: any) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row: any) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
										{row.getVisibleCells().map((cell: any) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
