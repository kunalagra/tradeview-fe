import { CreateAccount } from '@/components/create-account';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Register | TradeDesk',
	description: 'Create a new account',
};

export default function Page() {
	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<CreateAccount />
		</div>
	);
}
