'use client';

import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient'; // Import your axios client for API requests
import { loginUser } from '@/lib/authLib'; // Import login utility
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

// Define Zod schema for form validation
const createAccountSchema = z.object({
	userName: z.string().min(1, 'Name is required.'),
	email: z
		.string()
		.email('Please enter a valid email address.')
		.min(1, 'Email is required.'),
	password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export function CreateAccount() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateAccountFormData>({
		resolver: zodResolver(createAccountSchema), // Zod validation resolver
	});
	const [error, setError] = useState<string>('');

	const onSubmit = async (data: CreateAccountFormData) => {
		setError(''); // Clear any previous error messages

		try {
			const response = await axiosClient.post('user/register', {
				user_name: data.userName,
				email: data.email,
				password: data.password,
				user_type: 'individual',
				broker: 'ZERODHA',
			});

			if (response.status === 200) {
				await loginUser(data.email, data.password); // Automatically login after registration
				router.push('/dashboard');
				toast({
					title: 'Registration Successful',
					description: 'You have successfully logged in!',
				});
			}
		} catch (err: any) {
			toast({
				title: 'Registration Failed',
				description: 'Failed to create an account',
			});
			setError('Failed to create an account');
		}
	};

	return (
		<Card>
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Create an account</CardTitle>
				<CardDescription>
					Enter your details below to create your account
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent className="grid gap-4">
					{/* User Name Field */}
					<div className="grid gap-2">
						<Label htmlFor="userName">Name</Label>
						<Input
							id="userName"
							type="text"
							placeholder="John Doe"
							{...register('userName')}
						/>
						{/* Display validation error for userName */}
						{errors.userName && (
							<p className="text-red-500">
								{errors.userName.message}
							</p>
						)}
					</div>

					{/* Email Field */}
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							{...register('email')}
						/>
						{/* Display validation error for email */}
						{errors.email && (
							<p className="text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password Field */}
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							{...register('password')}
						/>
						{/* Display validation error for password */}
						{errors.password && (
							<p className="text-red-500">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Display any form submission error */}
					{error && <p className="text-red-500">{error}</p>}
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						Create account
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
