import React, {useEffect, useState} from "react";
import Button from "../../Form/Button";
import Input from "../../Form/Input";

type IProps = {
    showModal: boolean
    closeModal: () => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isError: boolean
    errors: string
    isEditing: boolean
    form: any
}

const TaskModal = ({showModal, closeModal, onSubmit, onChange, isError, errors, isEditing =false, form}: IProps) => {
    return (
        <>

            {showModal ? (
                <>
                    <div
                        className="justify-center top-24 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{minWidth:'600px'}}
                        >
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {isEditing ? 'Update': 'Create'} Task
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => closeModal()}
                                    >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={onSubmit}>
                                    <div className="relative p-6 flex-auto">
                                        <div className="m-2">
                                            <div className="my-2">
                                                <Input value={form.name} hasError={isError} errors={errors} type="text" name="name" onChange={onChange} label="Name"/>
                                            </div>
                                            <div className="my-2">
                                                <Input value={form.description} hasError={isError} errors={errors} type="text" name="description" onChange={onChange} label="Description"/>
                                            </div>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => closeModal()}
                                        >
                                            Close
                                        </button>
                                        <Button  variant="primary" buttonType="submit" size="medium">Save</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default TaskModal;