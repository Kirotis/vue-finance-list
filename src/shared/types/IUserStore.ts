import { RemovableRef } from "@vueuse/core";

export interface IUser {
    readonly id?: string;
    readonly login: string;
    readonly dateCreated: number;
    readonly description: string;
    readonly avatarImage?: string;
}
export interface IUserStore {
    user?: IUser;
    token?: string | RemovableRef<string>;
    routerNavigate: string;
}
