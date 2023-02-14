import React, {useMemo} from 'react';
import AuthLayout from "../../components/Layout/Auth";
import {getSession} from "next-auth/react";
import HttpServerService from "../../services/http-server.service";
import {ITask} from "../../types/Task";
import { useTable } from 'react-table'
import Button from "../../components/Common/Form/Button";

export const getServerSideProps = async ({req}: any) => {
    const session = await getSession({req}) as any;
    const {data} = await HttpServerService.getServer('tasks', session.access_token)
    const tasks = data.data;
    return {
        props: { tasks },
    }
}

interface IProps {
    tasks: ITask[]
}


// React Table



const Task = ({tasks}: IProps): JSX.Element => {

    const columns = React.useMemo(
        () => [
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
                Cell: (tableInstance) => {
                    const { row: index } = tableInstance;
                    return (
                        <div className="flex space-x-1">
                            <Button label="Edit" size="px-5 py-2" variant="info" />
                            <Button label="Delete" size="px-5 py-2" variant="warning" />
                        </div>
                )
                }
            }
        ],
        []
    )
    const Table = ({columns, data}) => {
        const { getTableProps, getTableBodyProps, headerGroups,rows, prepareRow } = useTable({columns, data,})

        return (
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
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={row.id} className="border-b">
                            {row.cells.map((cell, key) => {
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
        )
    }
    return (
        <AuthLayout pageTitle="Tasks" >
            <Table columns={columns} data={tasks} />
        </AuthLayout>
    );
};

export default Task;