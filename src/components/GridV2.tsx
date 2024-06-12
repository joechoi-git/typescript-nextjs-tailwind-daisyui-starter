/* eslint-disable indent */
import React from "react";

import {
    // eslint-disable-next-line import/named
    ColumnDef,
    // eslint-disable-next-line import/named
    ColumnOrderState,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";

import { MakeData, Person } from "../utils/MakeData";

const defaultColumns: ColumnDef<Person>[] = [
    {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
            {
                accessorKey: "firstName",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id
            },
            {
                accessorFn: (row) => row.lastName,
                id: "lastName",
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id
            }
        ]
    },
    {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
            {
                accessorKey: "age",
                header: () => "Age",
                footer: (props) => props.column.id
            },
            {
                header: "More Info",
                columns: [
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
                ]
            }
        ]
    }
];

interface Props {
    [rest: string]: any;
}

export default function GridV2({ ...rest }: Props): React.JSX.Element {
    const [data, setData] = React.useState(() => MakeData(20));
    const [columns] = React.useState(() => [...defaultColumns]);

    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

    const rerender = () => setData(() => MakeData(20));

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            columnOrder
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true
    });

    const randomizeColumns = () => {
        table.setColumnOrder(table.getAllLeafColumns().map((d) => d.id)); // faker.helpers.shuffle
    };

    return (
        <div className="p-2" {...rest}>
            <div className="inline-block border border-black shadow rounded">
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
            <div className="h-4" />
            <div className="flex flex-wrap gap-2">
                <button onClick={() => rerender()} className="border p-1">
                    Regenerate
                </button>
                <button onClick={() => randomizeColumns()} className="border p-1">
                    Shuffle Columns
                </button>
            </div>
            <div className="h-4" />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
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
            <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
        </div>
    );
}
