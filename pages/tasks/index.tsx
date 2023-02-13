import React from 'react';
import AuthLayout from "../../components/Layout/Auth";
import {getSession} from "next-auth/react";
import HttpServerService from "../../services/http-server.service";
import {ITask} from "../../types/Task";
import {ISession} from "../../types/Session";

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
    return (
        <AuthLayout pageTitle="Tasks" >
            <p>
            {tasks.map(function(task){
                return task.name
            })}
            </p>
        </AuthLayout>
    );
};

export default Task;