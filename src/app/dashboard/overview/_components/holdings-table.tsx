'use client';

import * as React from 'react';
import { DataTable } from '@/components/data-table';
import { Holdings, columns, getColor } from './holdings';
import axiosClient from '@/lib/axiosClient';
import { useEffect, useState } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export function HoldingsTable() {
	const [holdingData, setHoldingData] = useState<Holdings[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch data when component mounts
		axiosClient
			.get('/portfolio/holdings') // Replace with your actual endpoint
			.then((response) => {
				if (response.data.status === 'success') {
					setHoldingData(response.data.data);
				}
			})
			.catch((error) => {
				console.error('Error fetching holding data', error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const calculateTotalValue = () => {
		return holdingData.reduce(
			(total, holding) => total + holding.quantity * holding.last_price,
			0,
		);
	};

	const calculateDayChange = () => {
		return holdingData.reduce(
			(total, holding) => total + holding.day_change * holding.quantity,
			0,
		);
	};

	const calculateTotalPnl = () => {
		return holdingData.reduce((total, holding) => total + holding.pnl, 0);
	};

	const calculatePercentageChange = () => {
		const initialValue = holdingData.reduce(
			(total, holding) =>
				total + holding.average_price * holding.quantity,
			0,
		);
		const currentValue = calculateTotalValue();
		return ((currentValue - initialValue) / initialValue) * 100;
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="space-y-4">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{/* Total Value Card */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Value
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className="text-2xl font-bold"
							style={{ color: getColor(calculateTotalValue()) }}
						>
							₹{calculateTotalValue().toFixed(2)}
						</div>
						<p className="text-xs text-muted-foreground">
							Portfolio up by{' '}
							{calculatePercentageChange().toFixed(2)}%
						</p>
					</CardContent>
				</Card>

				{/* Day's Change Card */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Day's Change
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className="text-2xl font-bold"
							style={{ color: getColor(calculateDayChange()) }}
						>
							₹{calculateDayChange().toFixed(2)}
						</div>
						<p className="text-xs text-muted-foreground">
							Change in the last 24 hours
						</p>
					</CardContent>
				</Card>

				{/* Total PnL Card */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Net PnL
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className="text-2xl font-bold"
							style={{ color: getColor(calculateTotalPnl()) }}
						>
							₹{calculateTotalPnl().toFixed(2)}
						</div>
						<p className="text-xs text-muted-foreground">
							Profit/Loss from initial purchase
						</p>
					</CardContent>
				</Card>

				{/* Holdings Count Card */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Holdings Count
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{holdingData.length}
						</div>
						<p className="text-xs text-muted-foreground">
							Total number of holdings
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-4">
				<Card className="col-span-4 md:col-span-3">
					<CardHeader>
						<CardTitle>Your Holdings</CardTitle>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div>Loading...</div>
						) : (
							<DataTable columns={columns} data={holdingData} />
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
