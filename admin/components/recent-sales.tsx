import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({ sales }: Order[]) {
  const getInitials = (name:string) => {
    const words = name.split(' ');
  
    let firstInitial = '';
    let secondInitial = '';
  
    if (words.length > 0) {
      firstInitial = words[0][0]; // First letter of the first word
  
      if (words.length > 1) {
        secondInitial = words[1][0]; // First letter of the second word
      }
    }
  
    return `${firstInitial}${secondInitial}`.toUpperCase();
  }
  return (
    <div className="space-y-8">
      {sales.map((sale: Order) => (
        <div className="flex items-center hover:bg-gray-300">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{getInitials(sale.customer.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer.name}</p>
            <p className="text-sm text-muted-foreground">
              {sale.customer.phone}
            </p>
          </div>
          <div className="ml-auto font-medium">+${sale.total}</div>
        </div>
      ))}
      
    </div>
  );
}
