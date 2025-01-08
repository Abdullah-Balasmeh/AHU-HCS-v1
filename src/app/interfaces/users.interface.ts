export interface Role {
    roleId: string;
    roleName: string;
}

export interface User {
    userId: string;
    userName: string;
    password: string;
    createDate?: Date;
    signName?: string;
    signType?: string;
    signData?: string;
    roles?: Role[]; // Represents the roles associated with the user
}
