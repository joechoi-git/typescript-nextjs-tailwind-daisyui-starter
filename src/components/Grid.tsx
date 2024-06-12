/* eslint-disable indent */
import React from "react";

import {
    // eslint-disable-next-line import/named
    Column,
    // eslint-disable-next-line import/named
    ColumnDef,
    // eslint-disable-next-line import/named
    PaginationState,
    // eslint-disable-next-line import/named
    ColumnOrderState,
    // eslint-disable-next-line import/named
    Table,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

import { MakeData, Person } from "../utils/MakeData";
import { shuffleArray } from "../utils/Helper";

const defaultColumns: ColumnDef<Person>[] = [
    {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
        footer: (props) => props.column.id
    },
    {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id
    },
    {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id
    },
    {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id
    },
    {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id
    },
    {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id
    }
];

interface Props {
    [rest: string]: any;
}

export default function GridV3({ ...rest }: Props): React.JSX.Element {
    const [data, setData] = React.useState(() => MakeData(1000));
    const [columns] = React.useState(() => [...defaultColumns]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const rerender = () => setData(() => MakeData(1000));

    const randomizeColumns = () => {
        table.setColumnOrder(shuffleArray(table.getAllLeafColumns().map((d) => d.id)));
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            columnOrder,
            pagination
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true
    });

    return (
        <div {...rest}>
            <table className="border-separate border-spacing-2 border border-slate-400">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="border border-slate-300 p-2"
                                    >
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
                                                onClick: header.column.getToggleSortingHandler()
                                            }}
                                            aria-hidden="true"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: " 🔼",
                                                desc: " 🔽"
                                            }[header.column.getIsSorted() as string] ?? null}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border border-slate-300 p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>

            <div className="flex space-between gap-4 items-start mt-8">
                <div className="inline-block p-2 border border-black shadow rounded">
                    <div className="px-1 border-b border-black">
                        <label>
                            <input
                                {...{
                                    type: "checkbox",
                                    checked: table.getIsAllColumnsVisible(),
                                    onChange: table.getToggleAllColumnsVisibilityHandler()
                                }}
                            />{" "}
                            Toggle All
                        </label>
                    </div>
                    {table.getAllLeafColumns().map((column) => {
                        return (
                            <div key={column.id} className="px-1">
                                <label>
                                    <input
                                        {...{
                                            type: "checkbox",
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler()
                                        }}
                                    />{" "}
                                    {column.id}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => rerender()} className="border rounded p-1">
                        Regenerate
                    </button>
                    <button onClick={() => randomizeColumns()} className="border rounded p-1">
                        Shuffle Columns
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount().toLocaleString()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
                    {table.getRowCount().toLocaleString()} Rows
                </div>
            </div>
        </div>
    );
}

function Filter({ column, table }: { column: Column<any, any>; table: Table<any> }) {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    return typeof firstValue === "number" ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
                }
                placeholder={"Min"}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
                }
                placeholder={"Max"}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <input
            className="w-36 border shadow rounded"
            onChange={(e) => column.setFilterValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder={"Search..."}
            type="text"
            value={(columnFilterValue ?? "") as string}
        />
    );
}
