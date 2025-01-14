export interface User {
    userId: string;
    userName: string;
    password: string;
    createDate?: Date;
    signName?: string;
    signType?: string;
    signData?: string;
    roles?: string[]; 
}  