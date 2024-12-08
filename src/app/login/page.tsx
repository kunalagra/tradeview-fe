import { LoginForm } from '@/components/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login | TradeDesk',
	description: 'Login to your account',
};

export default function Page() {
	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<LoginForm />
		</div>
	);
}
