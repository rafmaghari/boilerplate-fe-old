import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AuthLayout from "../../components/Layout/Auth";
import {getSession} from "next-auth/react";
import {toast} from "react-toastify";

import HttpServerService from "../../services/http-server.service";
import HttpClientService from "../../services/http-client.service";
import Button from "../../components/Common/Form/Button";
import Spinning from "../../components/Common/Loading/Spinning";
import TaskModal from "../../components/Common/Modules/Modals/TaskModal";
import Datatable from "../../components/Common/Datatable";

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
    const {name, description} = form

    const fetchTask = useCallback(async (page: number =1) => {
        setLoading(true)
        const session = await getSession() as any;
        const {data} = await HttpServerService.getServer(`tasks?per_page=10&page=${page}&sort=-id`, session.access_token)
        setTasks(data.data)
        setPageLinks(data.meta.links)
        setLoading(false)
    }, [])

    useEffect( () => {
        fetchTask().catch(e => console.log(e))
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        clearForm()
        try {
            await HttpClientService.post('tasks', {name:name, description:description})
            await fetchTask()
            toast('Task Created', { type: 'success' })
            setForm({name: '', description: ''})
            setShowModal(false)
        } catch (e: any) {
            const {data} = e.response
            setErrors(data.errors)
            setIsError(true)
        }
    }

    const onDelete = async ({row}: any) => {

        if (window.confirm('Are you sure, you want to delete this task?')) {
            const id = row.original.id
            try {
                await HttpClientService.delete(`tasks/${id}`)
                await fetchTask()
            } catch (e:any) {
                const {statusText} = e.response
                toast(statusText, { type: 'success' })
            }
        }
    }

    const clearForm = () => {
       setErrors('')
       setIsError(false)
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
                    const { cell } = tableInstance;
                    return (
                        <div className="flex space-x-1">
                            <Button size="small" variant="secondary" onClick={() => alert('edit')} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                                </svg>

                            </Button>
                            <Button size="small" variant="secondary" onClick={() => onDelete(cell)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>

                            </Button>
                        </div>
                )
                }
            }
        ],
        []
    )
    return (
        <AuthLayout pageTitle="Tasks" >
            {loading ? <div className="flex justify-center content-center"><Spinning size="w-24 h-24 mt-32" /></div>
                : (
                    <>
                        <div className="my-1 flex justify-end">
                            <Button variant="primary" onClick={() => setShowModal(true)}>Add Task </Button>
                            <TaskModal
                                showModal={showModal}
                                closeModal={() => setShowModal(false)}
                                onSubmit={onSubmit}
                                onChange={onChange}
                                isError={isError}
                                errors={errors}
                            />
                        </div>
                        <Datatable columns={columns} data={tasks} pageLinks={pageLinks} fetchData={fetchTask}/>
                    </>
                )
            }
        </AuthLayout>
    );
};

export default Task;