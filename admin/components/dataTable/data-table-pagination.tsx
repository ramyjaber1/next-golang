import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  meta: any
  setLimit: any
  setPage: any
  page: number
}

export function DataTablePagination<TData>({
  table,
  meta = null,
  setLimit,
  page,
  setPage,
}: DataTablePaginationProps<TData>) {
  const limits = [10, 20, 30, 40, 50]
  const goNext = () => {
    setPage((prev: number) => prev + 1)
  }
  const goPrevious = () => {
    setPage((prev: number) => prev - 1)
  }
  const getCanNextPage = () => {
    if (meta?.current_page === meta?.last_page) return false
    return true
  }
  const getCanPreviousPage = () => {
    if (meta?.current_page === 1) return false
    return true
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2 ">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${meta?.limit ? meta.limit : limits[0]}`}
            defaultValue="10"
            onValueChange={(value) => {
              setLimit(Number(value))
            }}
          >
            <SelectTrigger className="h-8 bg-white text-black w-[70px]">
              <SelectValue placeholder={page} />
            </SelectTrigger>
            <SelectContent side="top">
              {limits.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {meta?.current_page ? meta.current_page : 1} of{" "}
          {meta?.last_page ? meta.last_page : 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goPrevious}
            disabled={!getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goNext}
            disabled={!getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div >
  )
}
