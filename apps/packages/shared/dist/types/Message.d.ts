export interface Message {
    _id?: string;
    name: string;
    email: string;
    subject: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
