'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Holdings = {
	tradingsymbol: string;
	exchange: string;
	quantity: number;
	authorised_date: string;
	average_price: number;
	last_price: number;
	close_price: number;
	pnl: number;
	day_change: number;
	day_change_percentage: number;
};

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
	}).format(amount);
};

export const getColor = (value: number) => {
	return value >= 0 ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-5))';
};

const formatPercentage = (amount: number) => {
	return new Intl.NumberFormat('en-IN', {
		style: 'percent',
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
	}).format(amount / 100);
};

export const columns: ColumnDef<Holdings>[] = [
	{ header: 'Symbol', accessorKey: 'tradingsymbol' },
	{ header: 'Exchange', accessorKey: 'exchange' },
	{ header: 'Quantity', accessorKey: 'quantity' },
	{
		accessorKey: 'average_price',
		header: 'Buying Price',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('average_price'));
			return <div className="font-medium">{formatCurrency(amount)}</div>;
		},
	},
	{
		header: 'Last Price',
		accessorKey: 'last_price',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('last_price'));
			const color = getColor(
				amount - parseFloat(row.getValue('average_price')),
			);
			return (
				<div className="font-medium color" style={{ color }}>
					{formatCurrency(amount)}
				</div>
			);
		},
	},
	{
		header: 'Profit/Loss %',
		accessorKey: 'pnl',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('pnl'));
			const color = getColor(amount);
			return (
				<div className="font-medium" style={{ color }}>
					{formatPercentage(amount)}
				</div>
			);
		},
	},
	{
		header: 'Day Change %',
		accessorKey: 'day_change_percentage',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('day_change_percentage'));
			const color = getColor(amount);
			return (
				<div className="font-medium" style={{ color }}>
					{formatPercentage(amount)}
				</div>
			);
		},
	},
];
