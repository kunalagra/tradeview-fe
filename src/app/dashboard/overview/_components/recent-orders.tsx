import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentOrders() {
	return (
		<div className="space-y-8">
			<div className="flex items-center">
				<Avatar className="h-9 w-9">
					<AvatarImage src="/stocks/01.png" alt="Avatar" />
					<AvatarFallback>ID</AvatarFallback>
				</Avatar>
				<div className="ml-4 space-y-1">
					<p className="text-sm font-medium leading-none">IDEA</p>
					<p className="text-sm text-muted-foreground">Qty: 5</p>
				</div>
				<div className="ml-auto font-medium">₹10.00</div>
			</div>
			<div className="flex items-center">
				<Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
					<AvatarImage src="/stocks/02.png" alt="Avatar" />
					<AvatarFallback>GB</AvatarFallback>
				</Avatar>
				<div className="ml-4 space-y-1">
					<p className="text-sm font-medium leading-none">GOLDBEES</p>
					<p className="text-sm text-muted-foreground">Qty: 2</p>
				</div>
				<div className="ml-auto font-medium">₹40.67</div>
			</div>
		</div>
	);
}
