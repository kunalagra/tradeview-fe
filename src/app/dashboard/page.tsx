import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Dashboard() {
	const cookieStore = await cookies();
	const session = !!cookieStore.get('token')?.value;

	if (!session) {
		return redirect('/');
	} else {
		redirect('/dashboard/overview');
	}
}
