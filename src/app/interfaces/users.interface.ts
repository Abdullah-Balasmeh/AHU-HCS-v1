export interface User {
    id: string;
    name: string;
    password:string;
    roleID: string[] | string;
}
export interface Role {
    roleID: string;
    roleName: string;
}
