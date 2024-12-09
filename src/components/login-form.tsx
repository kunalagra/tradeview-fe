'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { loginUser } from '@/lib/authLib'; // Import the login utility function
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define the Zod schema for form validation
const loginSchema = z.object({
	email: z
		.string()
		.email('Please enter a valid email address.')
		.min(1, 'Email is required.'),
	password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema), // Hook up Zod schema with react-hook-form
	});
	const [error, setError] = useState<string>('');

	const onSubmit = async (data: LoginFormData) => {
		setError(''); // Clear any previous error messages
		try {
			await loginUser(data.email, data.password);
			toast({
				title: 'Login Successful',
				description: 'You have successfully logged in!',
			});
			router.push('/dashboard');
		} catch (err) {
			console.error(err);
			toast({
				title: 'Login Failed',
				description: 'Invalid Credentials',
			});
			setError('Invalid Credentials');
		}
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								{...register('email')} // Register the input with react-hook-form
							/>
							{/* Display validation error for email */}
							{errors.email && (
								<p className="text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									href="#"
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								{...register('password')} // Register the input with react-hook-form
							/>
							{/* Display validation error for password */}
							{errors.password && (
								<p className="text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
						{error && <p className="text-red-500">{error}</p>}
						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link href="/register" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
