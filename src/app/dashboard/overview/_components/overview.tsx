import { LineGraph } from './line-graph';
import { OrderForm } from './place-order';
import PageContainer from '@/components/layout/page-container';
import { RecentOrders } from './recent-orders';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoldingsTable } from './holdings-table';

export default function OverViewPage() {
	return (
		<PageContainer scrollable>
			<div className="space-y-2">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">
						Hi, Welcome back 👋
					</h2>
					<div className="hidden items-center space-x-2 md:flex"></div>
				</div>
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Market</TabsTrigger>
						<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid grid-cols-1 gap-4">
							<LineGraph />
						</div>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-4">
								<CardHeader>
									<CardTitle>Recent Order</CardTitle>
								</CardHeader>
								<CardContent>
									<RecentOrders />
								</CardContent>
							</Card>
							<div className="col-span-4 md:col-span-3">
								<OrderForm />
							</div>
						</div>
					</TabsContent>
					<TabsContent value="portfolio" className="space-y-4">
						<HoldingsTable />
					</TabsContent>
				</Tabs>
			</div>
		</PageContainer>
	);
}
