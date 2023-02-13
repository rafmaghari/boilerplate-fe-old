import {IUser} from "./User";

export interface ISession {
    access_token: string
    user: IUser
    token_type: string

}
