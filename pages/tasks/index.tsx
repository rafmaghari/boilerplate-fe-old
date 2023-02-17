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
    return (
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