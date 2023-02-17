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
                <thead className="border-b bg-white text-gray-900">
                {headerGroups.map((headerGroup, key) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                        {headerGroup.headers.map((column, key) => (
                            <th
                                {...column.getHeaderProps()} key={key} className="text-sm font-medium px-6 py-6"
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
                        <tr {...row.getRowProps()} key={row.id} className="border-b hover:bg-gray-100">
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
                    page.label = page.label.includes('Previous') ? 'Previous' : page.label
                    page.label = page.label.includes('Next') ? 'Next' : page.label
                    const pageNumber = page.url !== null ? page.url.charAt(page.url.length -1) : null
                    return <button onClick={() => fetchData(pageNumber)}
                                   className={`
                                        text-gray-900 px-2 py-1 rounded text-sm 
                                         ${page.active && 'bg-blue-600 text-blue-100 font-semibold'}
                                         ${page.url !== null && 'hover:bg-blue-600 hover:text-blue-100 font-semibold'}
                                         ${page.url === null && 'bg-gray-100 border-gray-300 text-gray-500'}
                                   `}
                                   key={key}
                                   disabled={page.url === null}
                           >
                        <>{page.label}</>
                    </button>
                })}
            </div>
        </div>

    )
}

export default Datatable