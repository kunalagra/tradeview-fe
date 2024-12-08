'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axiosClient from '@/lib/axiosClient';

// Define schema for form validation
const FormSchema = z.object({
	symbol: z.string().min(1, { message: 'Symbol is required.' }),
	quantity: z
		.number()
		.positive({ message: 'Quantity must be a positive number.' }),
	price: z.number().positive({ message: 'Price must be a positive number.' }),
});

export function OrderForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			symbol: '',
			quantity: 0,
			price: 0,
		},
	});
	const { toast } = useToast();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const response = await axiosClient.post('/order/place_order', data); // Replace with your API endpoint
			toast({
				title: 'Order Submitted',
				description: `Order for ${data.symbol} submitted successfully! Order ID: ${response.data.data.order_id}`,
			});
		} catch (error) {
			console.error('Error submitting order:', error);
			toast({
				title: 'Submission Failed',
				description:
					'There was an error submitting your order. Please try again.',
			});
		}
	}

	return (
		<Card className="flex flex-col ">
			<CardHeader className="items-center pb-4">
				<CardTitle className="text-xl font-bold">
					Place an Order
				</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 w-full max-w-sm mx-auto"
					>
						{/* Symbol Field */}
						<FormField
							control={form.control}
							name="symbol"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium ">
										Symbol
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter symbol"
											{...field}
											className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Quantity Field */}
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium ">
										Quantity
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter quantity"
											{...field}
											className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
											onChange={(e) =>
												field.onChange(
													parseFloat(e.target.value),
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Price Field */}
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-medium">
										Price
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter price"
											{...field}
											className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
											onChange={(e) =>
												field.onChange(
													parseFloat(e.target.value),
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-center">
							<Button
								type="submit"
								className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
							>
								Submit Order
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
