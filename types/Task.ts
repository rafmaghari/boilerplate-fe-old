import {Model} from "./Model";

export interface ITask extends  Model{
    name: string
    description: string
    due_date: Date
    completed_at: Date
}