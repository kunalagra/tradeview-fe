'use client';

import * as React from 'react';
import {
	ChartCandlestick,
	GalleryVerticalEnd,

} from 'lucide-react';
import axiosClient from '@/lib/axiosClient';
import { setCookie, getCookie } from 'cookies-next';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
	teams: [
		{
			name: 'Zerodha',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
	],
	navMain: [
		{
			title: 'Overview',
			url: '/dashboard/overview',
			icon: ChartCandlestick,
			isActive: false,
			items: [],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [user, setUser] = React.useState<{
		name: string;
		email: string;
		avatar: string;
	} | null>(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchUserProfile() {
			const cachedUser = await getCookie('userProfile');
			if (cachedUser) {
				setUser(JSON.parse(cachedUser));
				setLoading(false);
			} else {
				try {
					const response = await axiosClient.get('/user/profile'); // Replace with your endpoint
					const apiData = response.data?.data; // Extract data from the API response

					if (apiData) {
						const formattedUser = {
							name: apiData.user_name, // Mapping user_name to name
							email: apiData.email,
							avatar: '/avatars/shadcn.jpg', // Static avatar URL
						};
						setCookie(
							'userProfile',
							JSON.stringify(formattedUser),
							{ maxAge: 60 * 60 * 24 * 7 },
						); // Set cookie for 7 days
						setUser(formattedUser);
					}
				} catch (error) {
					console.error('Error fetching profile:', error);
					setUser(null); // Fallback user data can be set here if needed
				} finally {
					setLoading(false);
				}
			}
		}

		fetchUserProfile();
	}, []);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
