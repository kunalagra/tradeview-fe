import * as React from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

// Define props for DatePickerWithRange
interface DatePickerWithRangeProps
	extends React.HTMLAttributes<HTMLDivElement> {
	dateRange: { from: Date | undefined; to: Date | undefined };
	setDateRange: React.Dispatch<
		React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>
	>;
}

export function DatePickerWithRange({
	className,
	dateRange,
	setDateRange,
}: DatePickerWithRangeProps) {
	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'justify-start text-left font-normal',
							!dateRange.from && 'text-muted-foreground',
						)}
					>
						<CalendarIcon />
						{dateRange.from ? (
							dateRange.to ? (
								<>
									{format(dateRange.from, 'LLL dd, y')} -{' '}
									{format(dateRange.to, 'LLL dd, y')}
								</>
							) : (
								format(dateRange.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={dateRange.from}
						selected={dateRange}
						onSelect={(range) =>
							setDateRange({
								from: range?.from ?? undefined,
								to: range?.to ?? undefined,
							})
						}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
