import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AuthLayout from "../../components/Layout/Auth";
import {getSession} from "next-auth/react";
import HttpServerService from "../../services/http-server.service";
import {usePagination, useTable} from 'react-table'
import Button from "../../components/Common/Form/Button";
import button from "../../components/Common/Form/Button";
import Spinning from "../../components/Common/Loading/Spinning";
import TaskModal from "../../components/Common/Modules/Modals/TaskModal";
import Input from "../../components/Common/Form/Input";
import HttpClientService from "../../services/http-client.service";
import {toast} from "react-toastify";

const Task = (): JSX.Element => {
    const [tasks, setTasks] = useState([]);
    const [pageLinks, setPageLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [form, setForm] = useState({
        name: '',
        description: ''
    })
    const [isError, setIsError] = useState(false)
    const [errors, setErrors] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const {name, description} = form

    const fetchTask = useCallback(async (page: number) => {
        setLoading(true)
        const session = await getSession() as any;
        const {data} = await HttpServerService.getServer(`tasks?per_page=10&page=${page}&sort=-id`, session.access_token)
        setTasks(data.data)
        setPageLinks(data.meta.links)
        setLoading(false)
    }, [])

    useEffect( () => {
        fetchTask(1).catch(e => console.log(e))
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form, 'form')

        clearForm()

        try {
            await HttpClientService.post('tasks', {name:name, description:description})
            await fetchTask(1)
            toast('Task Created', { type: 'success' })
            setForm({name: '', description: ''})
            setShowModal(false)
        } catch (e: any) {
            const {data} = e.response
            setErrors(data.errors)
            setIsError(true)
        }

    }

    const clearForm = () => {
       setErrors('')
       setIsError(false)
       setFormLoading(false)
    }

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
                            <Button label="Edit" size="px-5 py-2" variant="primary" onClick={() => alert('edit')} />
                            <Button label="Delete" size="px-5 py-2" variant="danger" onClick={() => alert('delete')} />
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
                <div className="flex space-x-1 my-5 justify-end">
                    {pageLinks && pageLinks.map((page: any, key) => {
                        return <button onClick={() => fetchTask(page.label)} className="bg-blue-500 text-blue-100 px-2 py-1 rounded" key={key}>
                            <>{page.label}</>
                        </button>
                    })}
                </div>
            </div>

        )
    }
    return (
        // TODO make component for table
        // TODO create task function
        // TODO improve table design
        <AuthLayout pageTitle="Tasks" >
            {loading ? <div className="flex justify-center content-center"><Spinning size="w-24 h-24 mt-32" /></div>
                : (
                    <>
                        <div className="my-1 flex justify-end">
                            <Button label="Create Task" variant="primary" onClick={() => setShowModal(true)}  />
                            <TaskModal
                                showModal={showModal}
                                closeModal={() => setShowModal(false)}
                                onSubmit={onSubmit}
                                onChange={onChange}
                                isError={isError}
                                errors={errors}
                            >
                            </TaskModal>
                        </div>
                        <Table columns={columns} data={tasks}/>
                    </>
                )
            }
        </AuthLayout>
    );
};

export default Task;