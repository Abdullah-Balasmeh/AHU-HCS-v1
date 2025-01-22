export interface User {
    userId: string;
    userName: string;
    password: string;
    salt?:string;
    createDate?: Date | string;
    signName?: string;
    signType?: string;
    signData?: string;
    roles?: string[]; 
}  