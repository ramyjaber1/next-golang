"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  shops: Shop[];
  className?: any;
}

export default function TeamSwitcher({ className, shops }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const shopId = Cookies.get("s_id");
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  if (!shopId) Cookies.set("s_id", String(shops[0]!.id));
  const [selectedShop, setSelectedShop] = React.useState<Shop | undefined>();

  const handleSelectedShop = (shop: Shop) => {
    setSelectedShop(shop);
    Cookies.set("s_id", String(shop.id));
    setOpen(false);
    window.location.reload();
  };

  React.useEffect(() => {
    if (shopId) {
      const sShop = shops.find((shop) => shop.id == Number(shopId));
      setSelectedShop(sShop);
    } else {
      setSelectedShop(shops[0]);
    }
  }, [shopId]);
  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedShop ?
              (
                <>
                  <Avatar className="mr-2 h-6 w-6 shadow-sm border">
                    <AvatarImage
                      src={selectedShop?.image}
                      alt={selectedShop?.name}
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>

                  {selectedShop?.name}
                </>
              )
              :
              <p className="text-sm">Loading ....</p>
            }
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading={"Shops"}>
                {shops.map((shop) => (
                  <CommandItem
                    key={shop.id}
                    onSelect={() => {
                      handleSelectedShop(shop);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={shop.image}
                        alt={shop.name}
                        className="grayscale"
                      />
                      <AvatarFallback>
                        {shop.name.slice(0, 1)}
                        {shop.name.slice(1, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {shop.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedShop?.name === shop.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Shop
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
