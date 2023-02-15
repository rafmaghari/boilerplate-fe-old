import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AuthLayout from "../../components/Layout/Auth";
import {getSession} from "next-auth/react";
import HttpServerService from "../../services/http-server.service";
import {usePagination, useTable} from 'react-table'
import Button from "../../components/Common/Form/Button";
import button from "../../components/Common/Form/Button";
import {h} from "preact";



const Task = (): JSX.Element => {
    const [tasks, setTasks] = useState([]);
    const [pageLinks, setPageLinks] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchTask = useCallback(async (page: number) => {
        setLoading(true)
        const session = await getSession() as any;
        const {data} = await HttpServerService.getServer(`tasks?per_page=5&page=${page}`, session.access_token)
        setTasks(data.data)
        setPageLinks(data.meta.links)
        setLoading(false)
    }, [])

    useEffect( () => {
        fetchTask(1).catch(e => console.log(e))
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Description',
                accessor: 'description'
            },
            {
                Header: 'Due Date',
                accessor: 'due_date'
            },
            {
                Header: 'Completed At',
                accessor: 'completed_at'
            },
            {
                Header: 'Action',
                accessor: "action",
                Cell: (tableInstance: any) => {
                    const { row: index } = tableInstance;
                    return (
                        <div className="flex space-x-1">
                            <Button label="Edit" size="px-5 py-2" variant="blue" onClick={() => alert('edit')} />
                            <Button label="Delete" size="px-5 py-2" variant="red" onClick={() => alert('delete')} />
                        </div>
                )
                }
            }
        ],
        []
    )
    const Table = ({columns, data}: any) => {

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
                <div className="flex space-x-1 my-5 justify-end mx-10">
                    {pageLinks && pageLinks.map((page: any, key) => {
                        return <button onClick={() => fetchTask(page.label)} className="bg-gray-500 text-gray-100 px-2 py-1 rounded" key={key}>
                           {page.label}
                        </button>
                    })}
                </div>
            </div>

        )
    }
    return (
        <AuthLayout pageTitle="Tasks" >
            {loading ? <h1> Loading.... </h1>
                : <Table columns={columns} data={tasks} />
            }
        </AuthLayout>
    );
};

export default Task;