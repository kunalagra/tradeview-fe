'use client';

import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { DatePickerWithRange } from '@/components/date-range-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface ChartData {
	date: string;
	price: number;
}

const chartConfig = {
	indices: {
		label: 'Indices',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

export function LineGraph() {
	const [indices, setIndices] = useState<string[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<string>('');
	const [chartData, setChartData] = useState<ChartData[]>([]);
	const [dateRange, setDateRange] = useState<{
		from: Date | undefined;
		to: Date | undefined;
	}>({
		from: new Date(2018, 3, 1),
		to: new Date(2021, 11, 31),
	});
	const [error, setError] = useState<string | null>(null); // Error state
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const fetchIndices = async () => {
			try {
				const socket = new WebSocket(
					process.env.NEXT_PUBLIC_WEBSOCKET_URL || '',
				);

				socket.onopen = () => {
					socket.send(JSON.stringify({ type: 'getIndices' }));
				};

				socket.onmessage = (event) => {
					const data = JSON.parse(event.data);
					if (data.type === 'indices') {
						setIndices(data.data);
						if (data.data.length > 0) {
							setSelectedIndex(data.data[0]);
						}
					} else if (data.type === 'chartData') {
						setChartData(data.data);
						setError(null); // Clear error if data fetch is successful
					} else if (data.type === 'error') {
						setError(data.message);
					}
				};

				socket.onerror = (error) => {
					console.error('WebSocket error:', error);
				};

				socket.onclose = () => {
					console.warn('WebSocket connection closed.');
				};

				wsRef.current = socket;
			} catch (error) {
				setError('Failed to fetch indices.');
				console.error('Failed to fetch indices:', error);
			}
		};

		fetchIndices();

		return () => {
			if (wsRef.current) {
				wsRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (
			!selectedIndex ||
			!dateRange.from ||
			!dateRange.to ||
			!wsRef.current
		)
			return;

		const fromDate = format(dateRange.from, 'yyyy-MM-dd');
		const toDate = format(dateRange.to, 'yyyy-MM-dd');

		wsRef.current.send(
			JSON.stringify({
				type: 'getChartData',
				symbol: selectedIndex,
				from_date: fromDate,
				to_date: toDate,
			}),
		);
	}, [wsRef, selectedIndex, dateRange]);

	// // Axios Fetch available indices and select the first one by default
	// useEffect(() => {
	//   const fetchIndices = async () => {
	//     try {

	//       const response = await axiosClient.get("/market/unique-symbols");
	//       const fetchedIndices = response.data.data || [];
	//       setIndices(fetchedIndices);

	//       if (fetchedIndices.length > 0) {
	//         setSelectedIndex(fetchedIndices[0]); // Automatically select the first index
	//       }
	//     } catch (error) {
	//       setError("Failed to fetch indices."); // Set error message
	//       console.error("Failed to fetch indices:", error);
	//     }
	//   };
	//   fetchIndices();
	// }, []);

	// // Fetch chart data whenever selectedIndex or dateRange changes
	// useEffect(() => {
	//   if (!selectedIndex || !dateRange.from || !dateRange.to) return;

	//   const fetchChartData = async () => {
	//     try {
	//       const fromDate = dateRange?.from
	//         ? format(dateRange.from, "yyyy-MM-dd")
	//         : undefined;
	//       const toDate = dateRange?.to
	//         ? format(dateRange.to, "yyyy-MM-dd")
	//         : undefined;

	//       const response = await axiosClient.get("/market/historical-data", {
	//         params: {
	//           symbol: selectedIndex,
	//           from_date: fromDate,
	//           to_date: toDate,
	//         },
	//       });
	//       setChartData(response.data.data);
	//       setError(null); // Clear error if data fetch is successful
	//     } catch (error) {
	//       setError("Chart data not available for the given time range."); // Set error message
	//       console.error("Failed to fetch chart data:", error);
	//     }
	//   };

	//   fetchChartData();
	// }, [selectedIndex, dateRange]);

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Indices Data</CardTitle>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 items-center">
					{/* Dropdown for Indices */}
					<Select
						value={selectedIndex}
						onValueChange={setSelectedIndex}
					>
						<SelectTrigger
							className="rounded-lg"
							aria-label="Select an index"
						>
							<SelectValue placeholder="Select Index" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							{indices.map((index) => (
								<SelectItem
									key={index}
									value={index}
									className="rounded-lg"
								>
									{index}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{/* Date Picker */}
					<DatePickerWithRange
						className="mt-4 sm:mt-0"
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<div className="relative">
					{/* Overlay error message */}
					{error && (
						<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 text-white text-lg font-semibold p-4">
							<span>{error}</span>
						</div>
					)}

					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-[250px] w-full"
					>
						<LineChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
								top: 12,
								bottom: 12,
							}}
						>
							<CartesianGrid
								vertical={false}
								strokeDasharray="3 3"
							/>
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={(value) => {
									const date = new Date(value);
									return date.toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									});
								}}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								domain={['auto', 'auto']} // Automatically adjusts to the data range
								tickMargin={8}
							/>
							<ChartTooltip
								content={
									<ChartTooltipContent
										className="w-[150px]"
										nameKey="Data"
										labelFormatter={(value) => {
											return new Date(
												value,
											).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											});
										}}
									/>
								}
							/>
							{/* Conditionally render the Line only if there's no error */}
							{!error && (
								<Line
									dataKey="price"
									type="monotone"
									stroke={`var(--color-indices)`}
									strokeWidth={2}
									dot={false}
								/>
							)}
						</LineChart>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	);
}
