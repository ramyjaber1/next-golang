"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { capitalize } from "./utils";
import Link from "next/link";
import { SearchXIcon } from "lucide-react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type IProps = {
  data: any;
  searchText: string;
  tableName: string;
  setSelectedStatus?: React.Dispatch<React.SetStateAction<string>>;
  setData: any;
  debouncedSearch: any;
  HandleAdd: string | React.FC;
  meta: Meta;
  emptyText?: string;
  fetchData: any;
  setMeta: any;
  columnsCell: any;
  columnsHeader: ColumnHeader[];
  status?: any;
};
export default function NewTableDesign(
  {
    data,
    HandleAdd,
    searchText,
    tableName,
    columnsCell,
    columnsHeader,
    setSelectedStatus,
    meta,
    emptyText = "No users found",
    setMeta,
    setData,
    debouncedSearch,
    fetchData,
    status,
  }: IProps,
) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["all"]),
  );
  const [statusKeys, setStatusKeys] = React.useState<Selection>(
    new Set(["all"]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>("all");
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(meta?.limit || 10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>();

  const handleSort = async (value: any) => {
    setSortDescriptor(value);
    const [status] = statusKeys;
    let newStatus: string;
    if (status === "all") newStatus = null;
    else newStatus = status;
    let orderBy: string;
    if (value.direction === "descending") orderBy = "desc";
    else orderBy = "asc";
    const { data: fetchedData, meta: fetchedMeta } = await fetchData({
      sortBy: value.column,
      orderBy,
      limit: meta.limit,
      status: newStatus,
    });
    setData(fetchedData);
    setMeta(fetchedMeta);
    if(setSelectedStatus) setSelectedStatus(newStatus)
  };

  const [page, setPage] = useState(meta?.current_page);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsHeader;

    return columnsHeader.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((data) =>
        data.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredData;
  }, [data, filterValue, statusFilter]);

  const pages = Math.ceil(meta?.total_count / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = async (e) => {
    const [status] = statusKeys;
    let newStatus: string;
    if (status === "all") newStatus = null;
    else newStatus = status;
    const { data, meta } = await fetchData({
      limit: Number(e.target.value),
      page: page - 1,
      status: newStatus,
    });
    setData(data);
    setMeta(meta);
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const handleDataChange = async (newPage: number) => {
    const [status] = statusKeys;
    let newStatus: string;
    if (status === "all") newStatus = null;
    else newStatus = status;
    setPage(newPage);
    const { data: fetchedData, meta: metaData } = await fetchData({
      limit: rowsPerPage,
      page: newPage,
      status: newStatus,
    });
    setData(fetchedData); 
    if(setSelectedStatus) setSelectedStatus(newStatus)
    setMeta(metaData);
  };

  const handleStatusChange = async (value: any) => {
    const [status] = value;
    let newStatus: string;
    if (status === "all") newStatus = null;
    else newStatus = status;

    const { data: fetchedData, meta: fetchedMeta } = await fetchData({
      limit: meta.limit,
      page: 1,
      status: newStatus,
    });
    setPage(1);
    setData(fetchedData);
    setMeta(fetchedMeta);
    setStatusKeys(value);
    if(setSelectedStatus) setSelectedStatus(newStatus)
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={searchText}
            startContent={<SearchIcon />}
            onClear={() => onClear()}
            onValueChange={debouncedSearch}
          />
          <div className="flex gap-3">
            {status
              ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="capitalize"
                    >
                      {statusKeys}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Multiple selection example"
                    variant="flat"
                    closeOnSelect={true}
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={statusKeys}
                    onSelectionChange={(status) => handleStatusChange(status)}
                  >
                    <DropdownItem key="all">All</DropdownItem>
                    {status.map((s: { label: string; value: string }) => (
                      <DropdownItem key={s.value}>{s.label}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )
              : null}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsHeader.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {typeof (HandleAdd) == "string"
              ? (
                <Link href={`${HandleAdd}`} prefetch={false}>
                  <Button color="primary" endContent={<PlusIcon />}>
                    Add New
                  </Button>
                </Link>
              )
              : <HandleAdd />}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {meta?.total_count} {tableName}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    data.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={meta.last_page}
          onChange={(page) => handleDataChange(page)}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={handleSort}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={emptyText} items={data}>
        {(item) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{columnsCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
