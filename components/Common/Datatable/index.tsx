import React from 'react';
import {usePagination, useTable} from "react-table";
import button from "../Form/Button";

type IProps = {
    columns: any
    data: any
    pageLinks: any
    fetchData: (page: number) => void
}

const Datatable = ({columns, data, pageLinks, fetchData}: IProps) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // @ts-ignore
        page,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        canNextPage,
        // @ts-ignore
        canPreviousPage,
        // @ts-ignore
        pageOptions,
        state,
        prepareRow
    } = useTable({columns, data}, usePagination)

    // @ts-ignore
    const { pageIndex } = state

    return (
        <div>
            <table className="min-w-full text-center " {...getTableProps()}>
                <thead className="border-b bg-gray-800">
                {headerGroups.map((headerGroup, key) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                        {headerGroup.headers.map((column, key) => (
                            <th
                                {...column.getHeaderProps()} key={key} className="text-sm font-medium text-white px-6 py-4"
                            >
                                {column.render('Header')}
                            </th>
                        ))}

                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row: any, i: number) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={row.id} className="border-b">
                            {row.cells.map((cell: any, key: number) => {
                                return <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                           {...cell.getCellProps()} key={key}
                                >
                                    {cell.render('Cell')}
                                </td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="flex space-x-1 my-5 justify-end">
                {pageLinks && pageLinks.map((page: any, key: number) => {
                    return <button onClick={() => fetchData(page.label)} className="bg-blue-500 text-blue-100 px-2 py-1 rounded" key={key}>
                        <>{page.label}</>
                    </button>
                })}
            </div>
        </div>

    )
}

export default Datatable