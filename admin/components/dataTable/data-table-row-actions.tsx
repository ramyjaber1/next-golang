"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  handleOnEditClick?: any;
  handleAddImage?: any;
  status?: any;
  onStatusChange?: any;
  handleOnDeleteClick?: any;
  handleOnViewClick?: any;
  handleStatsClick?: any;
}

export function DataTableRowActions<TData>({
  row,
  handleOnEditClick,
  handleOnViewClick,
  handleStatsClick = false,
  handleOnDeleteClick = false,
  handleAddImage,
  status,
  onStatusChange,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {handleOnViewClick && (
          <DropdownMenuItem onClick={() => handleOnViewClick(row)}>
            View
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => handleOnEditClick(row)}>
          Edit
        </DropdownMenuItem>
        {handleAddImage && (
          <DropdownMenuItem onClick={() => handleAddImage(row)}>
            Upload Image
          </DropdownMenuItem>
        )}
        {handleStatsClick && (
          <DropdownMenuItem onClick={() => handleStatsClick(row)}>
            Statistics
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        {status && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={row.getValue("status")}
                onValueChange={(value: string) => onStatusChange(row, value)}
              >
                {status.map((s: any) => (
                  <DropdownMenuRadioItem key={s.value} value={s.value}>
                    <div className="flex items-center justify-between w-full">
                      <p className="">
                        {s.label}
                      </p>
                      {s?.color && (
                        <div
                          style={{
                            backgroundColor: s.color,
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        <DropdownMenuSeparator />
        {handleOnDeleteClick && (
          <DropdownMenuItem onClick={() => handleOnDeleteClick(row)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
